import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "contacts",
      columns: [
        { name: "name", type: "string" },
        { name: "phone", type: "string" },
        { name: "email", type: "string" },
        { name: "image", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
