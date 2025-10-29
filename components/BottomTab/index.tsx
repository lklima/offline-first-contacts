import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// styles
import { theme } from "@/constants/theme";
import { styles } from "./styles";

type Tab = "phone" | "chats" | "contacts";

export const BottomTab = () => {
  // hooks
  const { bottom } = useSafeAreaInsets();

  // state
  const [activeTab, setActiveTab] = useState<Tab>("chats");

  // functions
  const handleTabPress = (tab: Tab) => {
    setActiveTab(tab);
  };

  const getIconColor = (active: boolean) =>
    active ? theme.colors.white : theme.colors.textSecondary;

  return (
    <View style={[styles.container, { bottom: bottom + theme.spacing.sm }]}>
      <Pressable style={styles.button} onPress={() => handleTabPress("phone")}>
        <Feather name="phone" size={24} color={getIconColor(activeTab === "phone")} />
      </Pressable>
      <Pressable style={styles.button} onPress={() => handleTabPress("chats")}>
        <Feather
          name="message-square"
          size={24}
          color={getIconColor(activeTab === "chats")}
        />
      </Pressable>
      <Pressable style={styles.button} onPress={() => handleTabPress("contacts")}>
        <Feather name="users" size={24} color={getIconColor(activeTab === "contacts")} />
      </Pressable>
    </View>
  );
};
