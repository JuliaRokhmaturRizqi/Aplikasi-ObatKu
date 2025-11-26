// src/components/SearchBar.jsx
import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function SearchBar({
  placeholder = "Cari obat...",
  value,
  onChangeText,
  onScanPress,
  style,
}) {
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.left}>
        <Ionicons name="search" size={18} color="#666" style={{ marginRight: 8 }} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          style={styles.input}
          returnKeyType="search"
          underlineColorAndroid="transparent"
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onScanPress}
        style={styles.scanButton}
        accessible
        accessibilityLabel="Scan QR / barcode"
      >
        <MaterialCommunityIcons name="qrcode-scan" size={20} color="#001cab" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "android" ? 8 : 10,
    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    // elevation for Android
    elevation: 3,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // input takes remaining space
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0, // keeps height consistent across platforms
    color: "#222",
  },
  scanButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
