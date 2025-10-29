import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Stack } from "expo-router";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { LogBox } from "react-native";
import "react-native-reanimated";

import { firebaseConfig } from "@/config/firebase";
import { isIOS } from "@/helpers";
import { Contact } from "@/model/Contact";
import migrations from "@/model/migrations";
import schema from "@/model/schema";
import { SyncProvider } from "@/providers/SyncProvider";

LogBox.ignoreAllLogs();

// reactotron config
if (__DEV__) {
  import("@/config/reactotronConfig").then();
}

const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true /* Platform.OS === 'ios' */,
  // (optional, but you should implement this method)
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or log out
    console.error(error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Contact],
});

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();

export default function RootLayout() {
  return (
    <SyncProvider database={database} firestore={firestore}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="modal"
          options={{ presentation: isIOS ? "modal" : "formSheet" }}
        />
      </Stack>
    </SyncProvider>
  );
}
