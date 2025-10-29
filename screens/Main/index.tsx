import { Entypo, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// styles
import { theme } from "@/constants/theme";
import { styles } from "./styles";
// components
import { BaseButton } from "@/components/BaseButton";
import { BottomTab } from "@/components/BottomTab";
import { ContactList } from "@/components/ContactList";

export const Main = () => {
  const { top, bottom } = useSafeAreaInsets();
  const isSyncing = useRef(false);

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(async (state) => {
  //     if (state.isConnected) {
  //       if (!isSyncing.current) {
  //         isSyncing.current = true;
  //         await syncFireMelon(database, { chats: {} }, firestore, "user_1");
  //         isSyncing.current = false;
  //       }
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={[styles.header, { paddingTop: top + theme.spacing.md }]}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <Octicons name="bell" size={24} color="black" />
      </View>
      <View style={styles.content}>
        <View style={styles.searchInputView}>
          <Octicons name="search" size={22} color={theme.colors.textSecondary} />
          <TextInput style={styles.searchInput} placeholder="Search contacts" />
        </View>
        <ContactList />
      </View>
      <BaseButton
        style={[styles.addChatButton, { bottom: bottom + 150 }]}
        onPress={() => router.navigate("/modal")}
      >
        <Entypo name="plus" size={30} color="white" />
      </BaseButton>
      <BottomTab />
    </View>
  );
};
