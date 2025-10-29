import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

// components
import { ContactDetails } from "@/components/ContactInfo";
// styles
import { styles } from "./styles";

export const ContactInfo = () => {
  // hooks
  const { contactId } = useLocalSearchParams<{ contactId: string }>();

  return (
    <View style={styles.container}>
      <ContactDetails contactId={contactId} />
    </View>
  );
};
