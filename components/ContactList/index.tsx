import { FontAwesome6 } from "@expo/vector-icons";
import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { router } from "expo-router";
import { Alert, FlatList, Text, View } from "react-native";

// components
import { ContactItem } from "../ContactItem";
// models
import { database } from "@/app/_layout";
import { Contact } from "@/model/Contact";
// styles
import { theme } from "@/constants/theme";
import { styles } from "./styles";
// providers
import { useSync } from "@/providers/SyncProvider";

const enhance = withObservables([], () => ({
  contacts: database.collections
    .get<Contact>("contacts")
    .query(Q.sortBy("created_at", Q.desc))
    .observe(),
}));

interface Props {
  contacts: Contact[];
}

const ContactListComponent = ({ contacts }: Props) => {
  const { sync } = useSync();

  const handlePress = (contact: Contact) => {
    router.navigate(`/${contact.id}`);
  };

  const handleDelete = async (contact: Contact) => {
    try {
      await database.write(async () => {
        await contact.markAsDeleted();
        sync();
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to delete contact");
    }
  };

  const handleLongPress = (contact: Contact) => {
    Alert.alert("Delete contact", "Are you sure you want to delete this contact?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => handleDelete(contact) },
    ]);
  };

  return (
    <FlatList
      data={contacts}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <FontAwesome6 name="user" size={30} color={theme.colors.textSecondary} />
          <Text style={styles.emptyText}>No contacts found, add a new contact</Text>
        </View>
      }
      renderItem={({ item }) => (
        <ContactItem
          contact={item}
          onPress={() => handlePress(item)}
          onLongPress={() => handleLongPress(item)}
        />
      )}
    />
  );
};

export const ContactList = enhance(ContactListComponent);
