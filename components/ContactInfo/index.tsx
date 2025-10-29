import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { withObservables } from "@nozbe/watermelondb/react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// components
import { BaseButton } from "../BaseButton";
// models
import { database } from "@/app/_layout";
import { Contact } from "@/model/Contact";
// styles
import { theme } from "@/constants/theme";
import { styles } from "./styles";

const enhance = withObservables(
  ["contactId"],
  ({ contactId }: { contactId: string }) => ({
    contact: database.collections.get<Contact>("contacts").findAndObserve(contactId),
  })
);

interface Props {
  contact: Contact;
}

const ContactInfoComponent = ({ contact }: Props) => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top + theme.spacing.md }]}>
      <View style={styles.header}>
        <BaseButton style={styles.backButton} onPress={router.back}>
          <Entypo name="chevron-left" size={24} color="black" />
        </BaseButton>
        <Image source={{ uri: contact.image }} style={styles.userImage} />
      </View>
      <Text style={styles.userName}>{contact.name}</Text>
      <Text style={styles.desc}>Home</Text>
      <View style={styles.rowButtons}>
        <BaseButton style={styles.actionButton}>
          <Entypo name="phone" size={24} color="black" />
        </BaseButton>
        <BaseButton style={styles.actionButton}>
          <Entypo name="message" size={24} color="black" />
        </BaseButton>
        <BaseButton style={styles.actionButton}>
          <Entypo name="video-camera" size={24} color="black" />
        </BaseButton>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Info</Text>
        <View style={styles.cardRow}>
          <FontAwesome name="phone" size={24} color="black" />
          <View style={styles.textView}>
            <Text style={styles.cardRowTitle}>{contact.phone}</Text>
            <Text style={styles.cardRowValue}>phone number</Text>
          </View>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </View>
        <View style={styles.cardRow}>
          <Entypo name="email" size={24} color="black" />
          <View style={styles.textView}>
            <Text style={styles.cardRowTitle}>{contact.email}</Text>
            <Text style={styles.cardRowValue}>email address</Text>
          </View>
          <Ionicons name="information-circle-outline" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

export const ContactDetails = enhance(ContactInfoComponent);
