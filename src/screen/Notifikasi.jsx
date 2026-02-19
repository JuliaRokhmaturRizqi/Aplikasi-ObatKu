import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* ---------- Dummy data notifikasi ---------- */
const NOTIFICATIONS = [
  {
    id: "1",
    title: "Pesanan Berhasil",
    message: "Paracetamol 500mg berhasil ditambahkan ke keranjang.",
    time: "Baru saja",
    icon: "cart-outline",
  },
  {
    id: "2",
    title: "Promo Spesial 🎉",
    message: "Diskon hingga 50% untuk produk kesehatan hari ini.",
    time: "10 menit lalu",
    icon: "pricetag-outline",
  },
  {
    id: "3",
    title: "Info Sistem",
    message: "Aplikasi berhasil diperbarui ke versi terbaru.",
    time: "Kemarin",
    icon: "information-circle-outline",
  },
];

export default function Notifikasi({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name={item.icon} size={22} color="#001cab" />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#001cab" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifikasi</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* List */}
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#001cab",
  },

  card: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    marginBottom: 12,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#eaf0ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "800",
    color: "#071233",
  },
  message: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
  time: {
    fontSize: 11,
    color: "#999",
    marginTop: 6,
  },
});
