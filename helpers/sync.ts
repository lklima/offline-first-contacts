import { appSchema, Database, Model, tableSchema } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import { field } from "@nozbe/watermelondb/decorators";
import { synchronize } from "@nozbe/watermelondb/sync";
import { keys, map, omit } from "lodash";

export interface DocumentSnapshot {
  id: string;
  data(): any;
}

export interface QuerySnapshot {
  docs: DocumentSnapshot[];
}

export interface DocumentRef {
  get: () => Promise<DocumentSnapshot>;
  set: (data: { [key: string]: any }) => Promise<void>;
  update: (data: { [key: string]: any }) => Promise<void>;
}

export interface Query {
  where: (field: string, operator: WhereFilterOp, value: any) => Query;
  get: () => Promise<QuerySnapshot>;
}

export interface CollectionRef extends Query {
  add: (data: { [key: string]: any }) => Promise<DocumentRef>;
  doc: (documentName: string) => DocumentRef;
}

export type WhereFilterOp = "<" | "<=" | "==" | ">=" | ">" | "array-contains";

export interface Item {
  id: string;
}

export interface SyncCollectionOptions {
  excludedFields?: string[];
  customQuery?: Query;
}

export interface SyncObj {
  [collectionName: string]: SyncCollectionOptions;
}

export interface SyncTimestamp {
  syncTime: {
    toDate(): Date;
  };
}

export interface Transaction {
  delete(documentRef: any): Transaction;
  get(documentRef: any): Promise<DocumentSnapshot>;
  set(documentRef: any, data: { [key: string]: any }): Transaction;
  update(documentRef: any, data: { [key: string]: any }): Transaction;
}

const DOCUMENT_WAS_MODIFIED_ERROR =
  "DOCUMENT WAS MODIFIED DURING PULL AND PUSH OPERATIONS";
const DOCUMENT_WAS_DELETED_ERROR = "DOCUMENT WAS DELETED DURING PULL AND PUSH OPERATIONS";

export interface FirestoreModule {
  collection: (collectionPath: string) => CollectionRef;
  runTransaction(
    updateFunction: (transaction: Transaction) => Promise<any>
  ): Promise<any>;
}

export const schema = appSchema({
  tables: [
    tableSchema({
      columns: [
        { name: "text", type: "string", isIndexed: true },
        { name: "color", type: "string", isIndexed: true },
      ],
      name: "todos",
    }),
    tableSchema({
      columns: [{ name: "name", type: "string", isIndexed: true }],
      name: "users",
    }),
  ],
  version: 1,
});

export class Todo extends Model {
  static table = "todos";

  @((field as any)("text"))
  text!: string;

  @((field as any)("color"))
  color!: string;
}
export class User extends Model {
  static table = "users";

  @((field as any)("name"))
  name!: string;
}

export default function newDatabase() {
  const adapter = new LokiJSAdapter({
    schema,
  });
  const database = new Database({
    adapter,
    modelClasses: [Todo, User],
  });

  return database;
}

/* const ex: SyncObj = {
    todos: {
        excludedFields: [],
        customQuery: firestore.collection('todos').where('color', '==', 'red'),
    },
} */

const defaultExcluded = ["_status", "_changed"];

export async function syncFireMelon(
  database: Database,
  syncObj: SyncObj,
  db: FirestoreModule,
  sessionId: string,
  getTimestamp: () => any = () => new Date()
) {
  await synchronize({
    database,

    pullChanges: async ({ lastPulledAt }) => {
      const syncTimestamp = new Date();
      const lastPulledAtTime = new Date(lastPulledAt || 0);
      let changes = {};

      const collections = keys(syncObj);

      await Promise.all(
        map(collections, async (collectionName) => {
          const collectionOptions = syncObj[collectionName];
          const query = collectionOptions.customQuery || db.collection(collectionName);

          const [createdSN, deletedSN, updatedSN] = await Promise.all([
            query
              .where("createdAt", ">=", lastPulledAtTime)
              .where("createdAt", "<=", syncTimestamp)
              .get(),
            query
              .where("deletedAt", ">=", lastPulledAtTime)
              .where("deletedAt", "<=", syncTimestamp)
              .get(),
            query
              .where("updatedAt", ">=", lastPulledAtTime)
              .where("updatedAt", "<=", syncTimestamp)
              .get(),
          ]);

          const created = createdSN.docs
            .filter((t) => t.data().sessionId !== sessionId)
            .map((createdDoc) => {
              const data = createdDoc.data();

              const ommited = [
                ...defaultExcluded,
                ...(collectionOptions.excludedFields || []),
              ];
              const createdItem = omit(data, ommited);

              return createdItem;
            });

          const updated = updatedSN.docs
            .filter(
              (t) =>
                t.data().sessionId !== sessionId &&
                !createdSN.docs.find((doc) => doc.id === t.id)
            )
            .map((updatedDoc) => {
              const data = updatedDoc.data();

              const ommited = [
                ...defaultExcluded,
                ...(collectionOptions.excludedFields || []),
              ];
              const updatedItem = omit(data, ommited);

              return updatedItem;
            });

          const deleted = deletedSN.docs
            .filter((t) => t.data().sessionId !== sessionId)
            .map((deletedDoc) => {
              return deletedDoc.id;
            });

          changes = {
            ...changes,
            [collectionName]: { created, deleted, updated },
          };
        })
      );

      return { changes, timestamp: +syncTimestamp };
    },

    pushChanges: async ({ changes, lastPulledAt }) => {
      await db.runTransaction(async (transaction) => {
        await Promise.all(
          map(changes, async (row, collectionName) => {
            const collectionRef = db.collection(collectionName);
            const collectionOptions = syncObj[collectionName];

            await Promise.all(
              map(row, async (arrayOfChanged, changeName) => {
                const isDelete = changeName === "deleted";

                await Promise.all(
                  map(arrayOfChanged, async (doc) => {
                    const itemValue = isDelete ? null : (doc.valueOf() as Item);
                    const docRef = isDelete
                      ? collectionRef.doc(doc.toString())
                      : collectionRef.doc(itemValue!.id);

                    const ommited = [
                      ...defaultExcluded,
                      ...(collectionOptions.excludedFields || []),
                    ];
                    const data = isDelete ? null : omit(itemValue, ommited);

                    switch (changeName) {
                      case "created": {
                        transaction.set(docRef, {
                          ...data,
                          createdAt: getTimestamp(),
                          updatedAt: getTimestamp(),
                          sessionId,
                        });

                        break;
                      }

                      case "updated": {
                        const docFromServer = await transaction.get(docRef);
                        const { deletedAt, updatedAt } = docFromServer.data();

                        if (updatedAt.toDate() > lastPulledAt) {
                          throw new Error(DOCUMENT_WAS_MODIFIED_ERROR);
                        }

                        if (deletedAt?.toDate() > lastPulledAt) {
                          throw new Error(DOCUMENT_WAS_DELETED_ERROR);
                        }

                        transaction.update(docRef, {
                          ...data,
                          sessionId,
                          updatedAt: getTimestamp(),
                        });

                        break;
                      }

                      case "deleted": {
                        const docFromServer = await transaction.get(docRef);
                        const { deletedAt, updatedAt } = docFromServer.data();

                        if (updatedAt.toDate() > lastPulledAt) {
                          throw new Error(DOCUMENT_WAS_MODIFIED_ERROR);
                        }

                        if (deletedAt?.toDate() > lastPulledAt) {
                          throw new Error(DOCUMENT_WAS_DELETED_ERROR);
                        }

                        transaction.update(docRef, {
                          deletedAt: getTimestamp(),
                          isDeleted: true,
                          sessionId,
                        });

                        break;
                      }
                    }
                  })
                );
              })
            );
          })
        );
      });
    },
  });
}
