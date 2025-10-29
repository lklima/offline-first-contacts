import { Image } from "expo-image";
import { Text, View } from "react-native";

// styles
import { styles } from "./styles";
// components
import { BaseButton } from "../BaseButton";
// models
// helpers
import { formatTime } from "@/helpers";
import { Contact } from "@/model/Contact";

interface Props {
  contact: Contact;
  onPress: () => void;
  onLongPress: () => void;
}

export const ContactItem = ({ contact, onPress, onLongPress }: Props) => {
  return (
    <BaseButton style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.leftContent}>
        <Image source={{ uri: contact.image }} style={styles.image} />
        <View>
          <Text style={styles.userName}>{contact.name}</Text>
          <Text style={styles.lastMessage}>{contact.phone || "No phone yet"}</Text>
        </View>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.lastMessageTime}>
          {formatTime(contact.createdAt || contact.updatedAt)}
        </Text>
      </View>
    </BaseButton>
  );
};
