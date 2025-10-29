import { Entypo, Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// styles
import { styles } from "./styles";
// components
import { BaseButton } from "../BaseButton";
// models
import { database } from "@/app/_layout";
import { Contact } from "@/model/Contact";
// helpers
import { generateRandomImage, isIOS } from "@/helpers";
// providers
import { useSync } from "@/providers/SyncProvider";

export const AddConctModal = () => {
  const { sync } = useSync();

  // state
  const [isLoading, setIsLoading] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // hooks
  const { top } = useSafeAreaInsets();

  const handleAddContact = async () => {
    try {
      setIsLoading(true);
      await database.write(async () => {
        const contactImage = generateRandomImage();
        await database.collections.get<Contact>("contacts").create((contact) => {
          contact.name = contactName;
          contact.phone = contactPhone;
          contact.email = contactEmail;
          contact.image = contactImage;
        });
        sync();
        router.back();
      });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      Alert.alert("Error", "Failed to add contact");
    }
  };

  const isDisabled =
    contactName.length === 0 || contactPhone.length === 0 || contactEmail.length === 0;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: isIOS ? 0 : top }]}>
        <Text style={styles.headerTitle}>Add Contact</Text>
        <BaseButton style={styles.closeButton} onPress={() => router.back()}>
          <Fontisto name="close-a" size={18} color="black" />
        </BaseButton>
      </View>
      <Image source={require("@/assets/images/picture.png")} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Name"
        autoCapitalize="words"
        autoCorrect={false}
        value={contactName}
        onChangeText={setContactName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="numeric"
        value={contactPhone}
        onChangeText={setContactPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={contactEmail}
        onChangeText={setContactEmail}
      />
      <BaseButton
        style={[styles.addButton, { opacity: isDisabled ? 0.3 : 1 }]}
        disabled={isDisabled}
        onPress={handleAddContact}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <>
            <Entypo name="plus" size={24} color="white" />
            <Text style={styles.addButtonText}>Add Contact</Text>
          </>
        )}
      </BaseButton>
    </View>
  );
};
