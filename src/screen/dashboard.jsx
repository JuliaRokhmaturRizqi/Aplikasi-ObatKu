// src/screen/dashboard.jsx
import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  RefreshControl,
  Image,
  Platform,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// --- KONFIGURASI WARNA BARU ---
const COLORS = {
  primary: "#0D47A1",      // Biru Tua
  accent: "#229cffff",     // Biru Langit Cerah
  background: "#F8F9FD",   // Putih Kebiruan
  white: "#FFFFFF",
  textDark: "#1E293B",
  textGrey: "#64748B",
  danger: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B"
};

// URL Gambar yang sama dengan profile.jsx
const PROFILE_IMAGE_URL = "https://i.pravatar.cc/150?img=12";

/* ---------- Mock Data ---------- */
const promotions = [
  { id: "p1", title: "Diskon 20% Obat", desc: "Periode terbatas", color: ["#4facfe", "#00f2fe"], icon: "medkit" },
  { id: "p2", title: "Buy 1 Get 1", desc: "Vitamin C & D", color: ["#43e97b", "#38f9d7"], icon: "nutrition" },
  { id: "p3", title: "Gratis Ongkir", desc: "Min. Rp50.000", color: ["#fa709a", "#fee140"], icon: "bicycle" },
];

const recentOrders = [
  { id: "o1", name: "Paracetamol 500mg", date: "20 Nov 2025", status: "Dikirim", price: "Rp 12.000" },
  { id: "o2", name: "Vitamin C 1000mg", date: "10 Nov 2025", status: "Selesai", price: "Rp 45.000" },
  { id: "o3", name: "Masker Medis x50", date: "25 Okt 2025", status: "Dikemas", price: "Rp 80.000" },
  { id: "o4", name: "Betadine Antiseptik", date: "22 Okt 2025", status: "Batal", price: "Rp 35.000" },
];

const vouchers = [
  { id: "v1", code: "WELCOME10", title: "Diskon 10%", min: "Min. Rp 50.000" },
  { id: "v2", code: "ONGKIR0", title: "Gratis Ongkir", min: "Min. Rp 0" },
];

/* ---------- Components ---------- */

const QuickAction = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.quickIconWrap}>
      {/* Menggunakan warna Accent untuk icon agar kontras dengan background putih */}
      <Ionicons name={icon} size={24} color={COLORS.primary} />
    </View>
    <Text style={styles.quickLabel}>{label}</Text>
  </TouchableOpacity>
);

const PromoCard = ({ item }) => (
  <TouchableOpacity activeOpacity={0.9} style={styles.promoCardContainer}>
    <LinearGradient
      colors={item.color}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.promoGradient}
    >
      <View style={styles.promoIconBg}>
        <Ionicons name={item.icon} size={20} color={COLORS.white} />
      </View>
      <View>
        <Text style={styles.promoTitle}>{item.title}</Text>
        <Text style={styles.promoDesc}>{item.desc}</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const OrderItem = ({ item, onPress }) => {
  let statusColor = COLORS.warning; 
  let statusBg = "#FFF8E1";
  
  if (item.status === "Selesai") {
    statusColor = COLORS.success;
    statusBg = "#E8F5E9"; // Light Green
  } else if (item.status === "Dikirim") {
    statusColor = COLORS.accent;
    statusBg = "#E0F7FA"; // Light Cyan
  } else if (item.status === "Batal") {
    statusColor = COLORS.danger;
    statusBg = "#FFEBEE"; // Light Red
  }

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.orderRow} onPress={() => onPress?.(item)}>
      <View style={styles.orderIconBox}>
        <FontAwesome5 name="box-open" size={20} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={styles.orderName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.orderMeta}>{item.date} • {item.price}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
        <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

/* ---------- Header with Gradient & Logic ---------- */
function DashboardHeader({ query, setQuery, balance, coins, onQuickActionPress, navigation }) {
  
  const handleProfilePress = () => {
    // Navigasi ke halaman Profile
    navigation.navigate("Profile"); 
  };

  return (
    <View style={styles.headerWrapper}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* 1. Curved Background dengan GRADIENT WARNA BARU */}
      <View style={styles.curvedContainer}>
        <LinearGradient
            colors={[COLORS.primary, COLORS.accent]} // Gradasi dari Biru Tua ke Biru Langit
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.curvedBg}
        >
            {/* Top Bar */}
            <View style={styles.headerTop}>
            <View>
                <Text style={styles.greetingText}>Halo, Julia 👋</Text>
                <Text style={styles.subGreeting}>Sehat selalu bersama CampusNoteX!</Text>
            </View>
            
            {/* FOTO PROFIL */}
            <TouchableOpacity style={styles.profileAvatarContainer} onPress={handleProfilePress}>
                <Image 
                source={{ uri: PROFILE_IMAGE_URL }} 
                style={styles.profileImage}
                />
                <View style={styles.onlineDot} />
            </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#E2E8F0" style={{ marginRight: 10 }} />
            <TextInput
                placeholder="Cari obat, vitamin..."
                placeholderTextColor="#E2E8F0"
                value={query}
                onChangeText={setQuery}
                style={styles.searchInput}
            />
            </View>
        </LinearGradient>
      </View>

      {/* 2. Floating Info Cards */}
      <View style={styles.floatingCardsContainer}>
        {/* Kartu Saldo */}
        <View style={styles.infoCard}>
          <View style={styles.infoLabelRow}>
            <Ionicons name="wallet-outline" size={18} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Saldo Saya</Text>
          </View>
          <Text style={styles.infoValue}>{balance}</Text>
          <TouchableOpacity style={styles.miniBtn}>
             <Text style={styles.miniBtnText}>+ Top Up</Text>
          </TouchableOpacity>
        </View>

        {/* Kartu Koin */}
        <View style={styles.infoCard}>
          <View style={styles.infoLabelRow}>
            <FontAwesome5 name="coins" size={14} color={COLORS.warning} />
            <Text style={styles.infoLabel}>Koin</Text>
          </View>
          <Text style={styles.infoValue}>{coins}</Text>
          <TouchableOpacity style={styles.miniBtnOutline}>
             <Text style={styles.miniBtnTextOutline}>Tukar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bodyContent}>
        
        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Akses Cepat</Text>
          <View style={styles.quickGrid}>
            <QuickAction icon="cart" label="Belanja" onPress={() => onQuickActionPress?.("shop")} />
            <QuickAction icon="receipt" label="Pesanan" onPress={() => onQuickActionPress?.("orders")} />
            <QuickAction icon="medkit" label="Resep" onPress={() => {}} />
            <QuickAction icon="chatbubbles" label="Chat Dr." onPress={() => onQuickActionPress?.("help")} />
          </View>
        </View>

        {/* Promo Banner */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Promo Spesial</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={promotions}
            keyExtractor={(i) => i.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4 }}
            renderItem={({ item }) => <PromoCard item={item} />}
          />
        </View>

        {/* Vouchers */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Voucher Tersedia</Text>
          <View style={styles.voucherList}>
            {vouchers.map((v) => (
              <View key={v.id} style={styles.voucherItem}>
                <View style={styles.voucherLeft}>
                  <View style={styles.ticketIcon}>
                    <Ionicons name="ticket-outline" size={20} color={COLORS.white} />
                  </View>
                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.voucherCode}>{v.code}</Text>
                    <Text style={styles.voucherMin}>{v.min}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.useBtn}>
                  <Text style={styles.useBtnText}>Pakai</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        
        {/* Header for Orders List */}
        <View style={[styles.sectionHeader, { marginBottom: 10, paddingHorizontal: 20 }]}>
          <Text style={styles.sectionTitle}>Pesanan Terakhir</Text>
          <TouchableOpacity onPress={() => onQuickActionPress?.("orders")}>
              <Text style={styles.seeAllText}>Riwayat</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

/* ---------- Main Screen ---------- */
export default function Dashboard() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  
  // Data State
  const [balance] = useState("Rp 150.000");
  const [coins] = useState("2.500");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const onQuickActionPress = (action) => {
    if (action === "orders") navigation.navigate?.("Orders"); 
    if (action === "shop") navigation.navigate?.("Home");     
    if (action === "help") navigation.navigate?.("Bantuan");
  };

  // Empty State
  const listEmptyComponent = useMemo(() => (
    <View style={styles.emptyContainer}>
      <Ionicons name="documents-outline" size={48} color="#CBD5E1" />
      <Text style={styles.emptyTitle}>Belum ada pesanan</Text>
      <Text style={styles.emptyDesc}>Yuk mulai belanja kebutuhan kesehatanmu.</Text>
      <TouchableOpacity style={styles.emptyBtn} onPress={() => navigation.navigate?.("Home")}>
        <Text style={styles.emptyBtnText}>Mulai Belanja</Text>
      </TouchableOpacity>
    </View>
  ), [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recentOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
                <OrderItem item={item} onPress={(it) => navigation.navigate?.("DetailProduk", { id: it.id })} />
            </View>
        )}
        ListHeaderComponent={
          <DashboardHeader 
            query={query} 
            setQuery={setQuery} 
            balance={balance} 
            coins={coins} 
            onQuickActionPress={onQuickActionPress}
            navigation={navigation} 
          />
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={listEmptyComponent}
      />
    </SafeAreaView>
  );
}

/* ---------- Styles (Updated with New Colors) ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  /* --- HEADER STYLES --- */
  headerWrapper: { marginBottom: 10 },
  
  curvedContainer: {
    // Container untuk border radius bawah
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden', // Penting agar gradient mengikuti border radius
  },
  curvedBg: {
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingHorizontal: 20,
    paddingBottom: 60, // Ruang untuk floating card
  },
  
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  greetingText: { color: COLORS.white, fontSize: 20, fontWeight: "800" },
  subGreeting: { color: "#E0F2FE", fontSize: 13, marginTop: 4 }, // Light tint blue
  
  // Profile Image Style
  profileAvatarContainer: { 
    position: 'relative',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5 
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
  },

  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)", // Glassmorphism effect
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 45,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  searchInput: { flex: 1, color: COLORS.white, fontSize: 14, fontWeight: "500" },

  /* --- FLOATING INFO CARDS --- */
  floatingCardsContainer: {
    flexDirection: "row",
    marginTop: -45, // Tarik ke atas menimpa header
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 6,
    // Shadow Biru Lembut
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  infoLabelRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  infoLabel: { fontSize: 12, color: COLORS.textGrey, marginLeft: 6, fontWeight: "600" },
  infoValue: { fontSize: 18, fontWeight: "800", color: COLORS.textDark, marginBottom: 10 },
  
  // Mini Buttons on Card
  miniBtn: {
    backgroundColor: COLORS.accent + "20", // Transparan 20%
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  miniBtnText: { fontSize: 12, color: COLORS.primary, fontWeight: "700" },
  
  miniBtnOutline: {
    borderWidth: 1,
    borderColor: COLORS.warning,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  miniBtnTextOutline: { fontSize: 12, color: COLORS.warning, fontWeight: "700" },

  /* --- BODY CONTENT --- */
  bodyContent: { paddingHorizontal: 0 },
  
  sectionContainer: { marginBottom: 24, paddingHorizontal: 20 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: COLORS.textDark, marginBottom: 12 },
  seeAllText: { fontSize: 14, fontWeight: "700", color: COLORS.primary },

  /* Quick Action Grid */
  quickGrid: { flexDirection: "row", justifyContent: "space-between" },
  quickAction: { alignItems: "center", width: "22%" },
  quickIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    // Soft shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F5F9"
  },
  quickLabel: { fontSize: 12, color: COLORS.textGrey, fontWeight: "600" },

  /* Promo Cards */
  promoCardContainer: { marginRight: 14, width: 260, borderRadius: 20, overflow: "hidden" },
  promoGradient: { padding: 18, flexDirection: "row", alignItems: "center", height: 110 },
  promoIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  promoTitle: { color: COLORS.white, fontSize: 16, fontWeight: "800", marginBottom: 4 },
  promoDesc: { color: "rgba(255,255,255,0.95)", fontSize: 12, fontWeight: "500" },

  /* Voucher List */
  voucherList: { gap: 12 },
  voucherItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    // Shadow Tipis
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  voucherLeft: { flexDirection: "row", alignItems: "center" },
  ticketIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  voucherCode: { fontSize: 15, fontWeight: "800", color: COLORS.textDark },
  voucherMin: { fontSize: 12, color: COLORS.textGrey, marginTop: 2 },
  useBtn: { backgroundColor: "#EFF6FF", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  useBtnText: { color: COLORS.primary, fontWeight: "700", fontSize: 12 },

  /* Orders List Item */
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F5F9"
  },
  orderIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center"
  },
  orderName: { fontSize: 14, fontWeight: "700", color: COLORS.textDark, marginBottom: 4 },
  orderMeta: { fontSize: 12, color: COLORS.textGrey },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: "700" },

  /* Empty State */
  emptyContainer: { alignItems: "center", paddingVertical: 40, paddingHorizontal: 20 },
  emptyTitle: { marginTop: 16, fontSize: 18, fontWeight: "800", color: COLORS.textDark },
  emptyDesc: { marginTop: 4, color: COLORS.textGrey, textAlign: "center", marginBottom: 20 },
  emptyBtn: { backgroundColor: COLORS.primary, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  emptyBtnText: { color: COLORS.white, fontWeight: "700" },
});