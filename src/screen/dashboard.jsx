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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

/* ---------- Mock Data ---------- */
const promotions = [
  { id: "p1", title: "Diskon 20% Obat Bebas", desc: "Periode terbatas", color: "#FFF2E6" },
  { id: "p2", title: "Buy 1 Get 1 Vitamin", desc: "Hanya minggu ini", color: "#EFFFF6" },
  { id: "p3", title: "Gratis Ongkir 0-5km", desc: "Min. belanja Rp50.000", color: "#F0F7FF" },
];

const recentOrders = [
  { id: "o1", name: "Paracetamol 500mg", date: "20 Nov 2025", status: "Dikirim", price: "Rp 12.000" },
  { id: "o2", name: "Vitamin C 1000mg", date: "10 Nov 2025", status: "Selesai", price: "Rp 45.000" },
  { id: "o3", name: "Masker Medis x50", date: "25 Okt 2025", status: "Dikemas", price: "Rp 80.000" },
];

const vouchers = [
  { id: "v1", code: "WELCOME10", title: "Diskon 10%", min: "Min. Rp 50.000" },
  { id: "v2", code: "ONGKIR0", title: "Gratis Ongkir", min: "Min. Rp 0" },
];

/* ---------- Small components ---------- */
const StatCard = ({ label, value, icon, color }) => (
  <View style={styles.statCard}>
    <View style={[styles.iconBox, { backgroundColor: color }]}>
      <Ionicons name={icon} size={18} color="#fff" />
    </View>
    <View style={{ marginLeft: 12 }}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

const QuickAction = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress}>
    <View style={styles.quickIconWrap}>
      <Ionicons name={icon} size={22} color="#001cab" />
    </View>
    <Text style={styles.quickLabel}>{label}</Text>
  </TouchableOpacity>
);

const PromoCard = ({ item }) => (
  <TouchableOpacity activeOpacity={0.85} style={[styles.promoCard, { backgroundColor: item.color }]}>
    <Text style={styles.promoTitle}>{item.title}</Text>
    <Text numberOfLines={2} style={styles.promoDesc}>{item.desc}</Text>
    <Ionicons name="chevron-forward" size={18} color="#001cab" style={{ marginTop: 8 }} />
  </TouchableOpacity>
);

const OrderItem = ({ item, onPress }) => {
  const statusColor = item.status === "Selesai" ? "#4CAF50" : item.status === "Dikirim" ? "#2196F3" : "#FF9800";
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.orderRow} onPress={() => onPress?.(item)}>
      <View style={styles.thumbPlaceholder}>
        <Ionicons name="cube-outline" size={26} color="#fff" />
      </View>
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={styles.orderName}>{item.name}</Text>
        <Text style={styles.orderMeta}>{item.date} • {item.price}</Text>
      </View>
      <View style={[styles.orderStatus, { backgroundColor: statusColor + "22" }]}>
        <Text style={[styles.orderStatusText, { color: statusColor }]}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

/* ---------- Header component used as ListHeaderComponent ---------- */
function DashboardHeader({ query, setQuery, balance, coins, onQuickActionPress }) {
  return (
    <View>
      <LinearGradient colors={["#001cab", "#0bb3e1"]} style={styles.header}>
        <View style={styles.headerInner}>
          <View>
            <Text style={styles.headerHello}>Halo, Julia</Text>
            <Text style={styles.headerSubtitle}>Selamat datang kembali</Text>
          </View>

          <TouchableOpacity style={styles.profileWrap}>
            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={20} color="#001cab" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.balanceRow}>
          <View style={styles.balanceBox}>
            <Text style={styles.balanceLabel}>Saldo</Text>
            <Text style={styles.balanceValue}>{balance}</Text>
          </View>
          <View style={styles.coinBox}>
            <Text style={styles.balanceLabel}>Koin</Text>
            <Text style={styles.balanceValue}>{coins}</Text>
          </View>
        </View>

        <View style={styles.searchWrap}>
          <Ionicons name="search" size={18} color="#999" style={{ marginLeft: 12 }} />
          <TextInput
            placeholder="Cari obat, vitamin, alat medis..."
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")} style={{ paddingHorizontal: 8 }}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <View style={styles.pageContent}>
        {/* Quick actions (spasi lebih longgar) */}
        <View style={[styles.section, styles.spaciousSection]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Aksi Cepat</Text>
            <TouchableOpacity><Text style={styles.seeAll}>Kelola</Text></TouchableOpacity>
          </View>

          <View style={styles.quickRow}>
            <QuickAction icon="cart-outline" label="Belanja" onPress={() => onQuickActionPress?.("shop")} />
            <QuickAction icon="wallet-outline" label="TopUp" onPress={() => onQuickActionPress?.("topup")} />
            <QuickAction icon="receipt-outline" label="Pesanan" onPress={() => onQuickActionPress?.("orders")} />
            <QuickAction icon="chatbubbles-outline" label="Bantuan" onPress={() => onQuickActionPress?.("help")} />
          </View>
        </View>

        {/* Statistik: beri ruang antar kartu */}
        <View style={[styles.section, styles.spaciousSection]}>
          <Text style={styles.sectionTitle}>Ringkasan</Text>
          <View style={styles.statsGrid}>
            <StatCard label="Transaksi" value="120" icon="swap-horizontal-outline" color="#FF9800" />
            <StatCard label="Terjual" value="1.350" icon="bag-check-outline" color="#4CAF50" />
            <StatCard label="Rating" value="4.8" icon="star-outline" color="#FFC107" />
          </View>

          <View style={{ marginTop: 14 }}>
            <Text style={styles.smallMuted}>Target Bulan Ini</Text>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: "64%" }]} />
            </View>
            <Text style={[styles.smallMuted, { marginTop: 8 }]}>64% tercapai</Text>
          </View>
        </View>

        {/* Promo horizontal (lebih besar card + margin) */}
        <View style={[styles.section, styles.spaciousSection]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Promo untukmu</Text>
            <TouchableOpacity><Text style={styles.seeAll}>Lihat Semua</Text></TouchableOpacity>
          </View>

          <FlatList
            data={promotions}
            keyExtractor={(i) => i.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            renderItem={({ item }) => <PromoCard item={item} />}
          />
        </View>

        {/* Voucher (single row, lebih lapang) */}
        <View style={[styles.section, styles.spaciousSection]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Voucher</Text>
            <TouchableOpacity><Text style={styles.seeAll}>Gunakan</Text></TouchableOpacity>
          </View>
          <View style={{ marginTop: 12 }}>
            {vouchers.map((v) => (
              <View key={v.id} style={styles.voucherRow}>
                <View style={styles.voucherLeft}>
                  <Text style={styles.voucherCode}>{v.code}</Text>
                  <Text style={styles.voucherTitle}>{v.title}</Text>
                </View>
                <Text style={styles.voucherMin}>{v.min}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

/* ---------- Main Dashboard (FlatList root) ---------- */
export default function Dashboard() {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [balance] = useState("Rp 150.000");
  const [coins] = useState("2.500");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // fetch data -> simulate
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const onQuickActionPress = (action) => {
    if (action === "orders") navigation.navigate?.("Orders");
    if (action === "shop") navigation.navigate?.("Products");
  };

  const renderOrder = ({ item }) => (
    <OrderItem item={item} onPress={(it) => navigation.navigate?.("DetailProduk", { id: it.id })} />
  );

  const keyExtractor = (item) => item.id;

  const listEmptyComponent = useMemo(() => (
    <View style={styles.emptyWrap}>
      <Ionicons name="clipboard-outline" size={42} color="#999" />
      <Text style={styles.emptyText}>Belum ada pesanan</Text>
      <Text style={styles.emptySub}>Mulai belanja untuk melihat pesananmu di sini.</Text>
      <TouchableOpacity style={styles.ctaBtn} onPress={() => navigation.navigate?.("Products")}>
        <Text style={styles.ctaText}>Mulai Belanja</Text>
      </TouchableOpacity>
    </View>
  ), [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recentOrders}
        keyExtractor={keyExtractor}
        renderItem={renderOrder}
        ListHeaderComponent={<DashboardHeader query={query} setQuery={setQuery} balance={balance} coins={coins} onQuickActionPress={onQuickActionPress} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 28 }}
        ListEmptyComponent={listEmptyComponent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </SafeAreaView>
  );
}

/* ---------- Styles (lebih longgar & rapi) ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f8fb" },

  /* Header */
  header: { paddingBottom: 18, borderBottomLeftRadius: 18, borderBottomRightRadius: 18 },
  headerInner: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 18, paddingTop: 12 },
  headerHello: { color: "#fff", fontSize: 18, fontWeight: "700" },
  headerSubtitle: { color: "#e6eef8", fontSize: 13, marginTop: 2 },
  profileWrap: { flexDirection: "row", alignItems: "center" },
  profileAvatar: { width: 44, height: 44, borderRadius: 12, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },

  /* Balance */
  balanceRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 18, marginTop: 12 },
  balanceBox: { flex: 1, backgroundColor: "#fff", padding: 14, marginRight: 10, borderRadius: 12, elevation: 1 },
  coinBox: { width: 130, backgroundColor: "#fff", padding: 14, borderRadius: 12, alignItems: "center", justifyContent: "center", elevation: 1 },
  balanceLabel: { color: "#666", fontSize: 12 },
  balanceValue: { color: "#333", fontWeight: "800", marginTop: 6 },

  /* Search */
  searchWrap: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginHorizontal: 18, marginTop: 14, borderRadius: 14, paddingVertical: 10 },
  searchInput: { flex: 1, paddingHorizontal: 10, fontSize: 14, color: "#333" },

  pageContent: { paddingHorizontal: 16, marginTop: -8 },

  /* Section */
  section: { marginTop: 12, backgroundColor: "#fff", borderRadius: 12, padding: 12, elevation: 1 },
  spaciousSection: { padding: 14 }, // ekstra padding untuk ruang
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#222" },
  sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  seeAll: { color: "#001cab", fontWeight: "700" },

  /* Quick actions */
  quickRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  quickAction: { alignItems: "center", width: (width - 80) / 4, paddingVertical: 6 },
  quickIconWrap: { width: 50, height: 50, borderRadius: 12, backgroundColor: "#f3f8ff", alignItems: "center", justifyContent: "center" },
  quickLabel: { marginTop: 8, fontSize: 12, color: "#333", textAlign: "center" },

  /* Stats */
  statsGrid: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  statCard: { flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: 12, marginRight: 8, flexDirection: "row", alignItems: "center", elevation: 0 },
  iconBox: { width: 44, height: 44, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  statValue: { fontSize: 15, fontWeight: "800", color: "#333" },
  statLabel: { fontSize: 12, color: "#666" },

  progressBg: { backgroundColor: "#eef5ff", height: 8, borderRadius: 8, overflow: "hidden", marginTop: 10 },
  progressFill: { backgroundColor: "#001cab", height: 8, borderRadius: 8 },

  /* Promo */
  promoCard: { width: width * 0.74, borderRadius: 12, padding: 16, justifyContent: "space-between", elevation: 0 },
  promoTitle: { color: "#001cab", fontWeight: "800", fontSize: 15 },
  promoDesc: { color: "#333", fontSize: 13, marginTop: 6 },

  /* Voucher */
  voucherRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#f4f6f9" },
  voucherLeft: { flexDirection: "column" },
  voucherCode: { fontWeight: "800", color: "#001cab", fontSize: 14 },
  voucherTitle: { marginTop: 6, color: "#333" },
  voucherMin: { fontSize: 12, color: "#777" },

  /* Orders */
  orderRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 10, backgroundColor: "#fff", marginHorizontal: 6, borderRadius: 12 },
  thumbPlaceholder: { width: 60, height: 60, borderRadius: 12, backgroundColor: "#001cab", alignItems: "center", justifyContent: "center" },
  orderName: { fontWeight: "700", color: "#222" },
  orderMeta: { fontSize: 12, color: "#777", marginTop: 6 },
  orderStatus: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 14 },
  orderStatusText: { fontWeight: "700", fontSize: 12 },

  /* Empty */
  emptyWrap: { alignItems: "center", padding: 36 },
  emptyText: { marginTop: 12, fontSize: 16, fontWeight: "700", color: "#333" },
  emptySub: { marginTop: 6, color: "#777", textAlign: "center" },
  ctaBtn: { marginTop: 14, backgroundColor: "#001cab", paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10 },
  ctaText: { color: "#fff", fontWeight: "700" },

  smallMuted: { color: "#6f7786", fontSize: 12 }
});
