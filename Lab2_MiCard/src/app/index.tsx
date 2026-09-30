import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");

  const renderInput = (label, icon, placeholder, value, onChangeText, keyboardType = "default") => (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name={icon} size={16} color="#999" />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={require("../../assets/images/bot_cat.jpg")}
        />
        <Text style={styles.name}>Ho Gia Bao</Text>
        <Text style={styles.job}>Cross-Platform</Text>
      </View>

      <View style={styles.formSection}>
        {renderInput("Your Email", "envelope", "hogiabao7725@gmail.com", email, setEmail, "email-address")}
        {renderInput("Phone Number", "phone", "+84 666 999 775", phone, setPhone, "phone-pad")}
        {renderInput("Your Username", "user", "Bot_7725", username, setUsername)}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  profileContainer: { alignItems: "center", marginTop: 40 },
  profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: "#1E90FF" },
  name: { marginTop: 10, fontSize: 22, fontWeight: "bold", color: "#333" },
  job: { fontSize: 16, color: "#666", marginTop: 4 },
  formSection: { marginTop: 20, paddingHorizontal: 20 },
  label: { fontSize: 14, color: "#333", marginTop: 15, fontWeight: "600" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 6,
    backgroundColor: "#F9F9F9",
  },
  input: { flex: 1, height: 44, marginLeft: 10, fontSize: 14, color: "#333" },
});

export default ProfileScreen;