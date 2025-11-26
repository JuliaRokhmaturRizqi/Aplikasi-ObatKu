// src/screen/home.jsx
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StatusBar,
  Alert,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

/* ---------- Dummy data ---------- */
const PRODUCT_DATA = [
  { id: "1", name: "Paracetamol 500mg", desc: "Obat pereda demam dan nyeri kepala.", price: "Rp 12.000", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=60", rating: 4.8 },
  { id: "2", name: "Vitamin C 1000mg", desc: "Menjaga daya tahan tubuh harian.", price: "Rp 45.000", image: "https://images.unsplash.com/photo-1550572017-4fcdbb56c739?auto=format&fit=crop&w=500&q=60", rating: 4.9 },
  { id: "3", name: "Masker Medis 3 Ply", desc: "Masker sekali pakai, filtrasi tinggi.", price: "Rp 25.000", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=500&q=60", rating: 4.5 },
  { id: "4", name: "Termometer Digital", desc: "Akurat & mudah dibaca.", price: "Rp 85.000", image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=500&q=60", rating: 4.7 },
  { id: "5", name: "Hand Sanitizer", desc: "Antiseptik 70% alkohol.", price: "Rp 30.000", image: "https://images.unsplash.com/photo-1584483766114-2cea6fac2564?auto=format&fit=crop&w=500&q=60", rating: 4.6 },
  { id: "6", name: "Minyak Kayu Putih", desc: "Menghangatkan tubuh & meredakan gatal.", price: "Rp 22.000", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=60", rating: 4.9 },
];

const CATEGORY_DATA = [
  { id: "c1", label: "Obat Bebas", icon: "medkit-outline" },
  { id: "c2", label: "Resep", icon: "document-text-outline" },
  { id: "c3", label: "Vitamin", icon: "nutrition-outline" },
  { id: "c4", label: "Ibu & Anak", icon: "happy-outline" },
  { id: "c5", label: "Alat Medis", icon: "thermometer-outline" },
];

/* ---------- Small reusable ScalePressable (tap feedback) ---------- */
function ScalePressable({ children, onPress, style }) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn = () => Animated.timing(scale, { toValue: 0.97, duration: 100, useNativeDriver: true }).start();
  const pressOut = () => Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }).start();

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity activeOpacity={1} onPressIn={pressIn} onPressOut={pressOut} onPress={onPress} style={{ borderRadius: 14 }}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

/* ---------- Product Card: layout like your screenshot ---------- */
const ProductCard = ({ item, index, navigation }) => {
  // entrance animation for each card
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 400, delay: index * 60, useNativeDriver: true }).start();
  }, [anim, index]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });
  const opacity = anim;

  const onBuy = () => navigation.navigate?.("Detail", { product: item });
  const onAddCart = () => Alert.alert("Keranjang", `${item.name} ditambahkan ke keranjang.`);

  return (
    <Animated.View style={[styles.cardWrap, { opacity, transform: [{ translateY }] }]}>
      <View style={styles.card}>
        {/* Image (rounded top corners) */}
        <View style={styles.imageWrap}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="#FFD166" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        {/* Body */}
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.cardDesc} numberOfLines={2}>{item.desc}</Text>

          {/* Price + controls */}
          <View style={styles.bottomArea}>
            <Text style={styles.cardPrice}>{item.price}</Text>

            <View style={styles.controlsRow}>
              {/* Buy button (pill, wide) */}
              <TouchableOpacity activeOpacity={0.9} onPress={onBuy} style={styles.buyTouch}>
                <LinearGradient colors={["#001cab", "#0bb3e1"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.buyPill}>
                  <Text style={styles.buyText}>Beli</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Cart small button on right */}
              <TouchableOpacity activeOpacity={0.8} onPress={onAddCart} style={styles.cartSmall}>
                <Ionicons name="cart-outline" size={18} color="#001cab" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

/* ---------- Header + hero (keperluan ListHeader) ---------- */
function HomeHeader({ search, setSearch, navigation }) {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.helloSmall}>Selamat Pagi</Text>
            <Text style={styles.helloBig}>Julia Rokhmatur 👋</Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconWrap}>
              <FontAwesomeIcon icon={faBell} size={16} color="#001cab" />
              <View style={styles.dot} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconWrap, { marginLeft: 10 }]}>
              <FontAwesomeIcon icon={faCartShopping} size={16} color="#001cab" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchRow}>
          <Ionicons name="search" size={18} color="#9aa4b2" style={{ marginRight: 10 }} />
          <TextInput value={search} onChangeText={setSearch} placeholder="Cari: obat, vitamin, alat medis..." placeholderTextColor="#9aa4b2" style={styles.searchInput} />
          <TouchableOpacity style={styles.filter}><Ionicons name="options-outline" size={18} color="#001cab" /></TouchableOpacity>
        </View>
      </View>

      <View style={styles.heroWrap}>
        <LinearGradient colors={["#001cab", "#0bb3e1"]} style={styles.hero}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroTitle}>Ampuh & Terpercaya</Text>
            <Text style={styles.heroSub}>Diskon sampai 50% untuk produk & layanan kesehatan.</Text>
            <TouchableOpacity style={styles.heroCta}><Text style={styles.heroCtaText}>Lihat Promo</Text></TouchableOpacity>
          </View>
          <Image source={{ uri: "sandbox:/mnt/data/9f11a42b-6791-41ae-8434-46ba3a8f8f66.jpg" }} style={styles.heroImage} resizeMode="cover" />
        </LinearGradient>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Rekomendasi Sehat</Text>
        <TouchableOpacity><Text style={styles.sectionLink}>Lihat Semua</Text></TouchableOpacity>
      </View>
    </>
  );
}

/* ---------- Main component (FlatList + header) ---------- */
export default function Home({ navigation }) {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={PRODUCT_DATA}
        keyExtractor={(i) => i.id}
        numColumns={2}
        columnWrapperStyle={styles.columns}
        renderItem={({ item, index }) => <ProductCard item={item} index={index} navigation={navigation} />}
        ListHeaderComponent={<HomeHeader search={search} setSearch={setSearch} navigation={navigation} />}
        contentContainerStyle={{ paddingBottom: 36 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },

  /* header */
  header: {
    paddingTop: Platform.OS === "android" ? 44 : 18,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  helloSmall: { color: "#7b8794", fontSize: 13 },
  helloBig: { color: "#071233", fontSize: 20, fontWeight: "800", marginTop: 4 },

  headerIcons: { flexDirection: "row", alignItems: "center" },
  iconWrap: { width: 44, height: 44, backgroundColor: "#fff", borderRadius: 12, alignItems: "center", justifyContent: "center", elevation: 3 },
  dot: { position: "absolute", top: 8, right: 10, width: 8, height: 8, borderRadius: 6, backgroundColor: "#ff6b6b" },

  searchRow: { marginTop: 12, flexDirection: "row", alignItems: "center", backgroundColor: "#fff", paddingHorizontal: 12, paddingVertical: Platform.OS === "android" ? 8 : 10, borderRadius: 12, borderWidth: 1, borderColor: "#eef2f7" },
  searchInput: { flex: 1, fontSize: 14, color: "#0f172a" },
  filter: { marginLeft: 8 },

  /* hero */
  heroWrap: { paddingHorizontal: 16, marginTop: 14 },
  hero: { flexDirection: "row", alignItems: "center", borderRadius: 14, padding: 14, minHeight: 120, elevation: 4 },
  heroLeft: { flex: 1, paddingRight: 8 },
  heroTitle: { color: "#fff", fontSize: 18, fontWeight: "900" },
  heroSub: { color: "rgba(255,255,255,0.9)", marginTop: 8, fontSize: 13 },
  heroCta: { marginTop: 12, backgroundColor: "rgba(255,255,255,0.95)", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12, alignSelf: "flex-start" },
  heroCtaText: { color: "#001cab", fontWeight: "800" },
  heroImage: { width: 96, height: 96, borderRadius: 12, backgroundColor: "#fff" },

  sectionHeader: { marginTop: 12, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#071233" },
  sectionLink: { color: "#0b66ff", fontWeight: "700" },

  columns: { justifyContent: "space-between", paddingHorizontal: 12, marginTop: 12 },

  /* card */
  cardWrap: { width: (width - 44) / 2, marginBottom: 18 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f0f3f8",
    shadowColor: "#001122",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },

  imageWrap: { width: "100%", backgroundColor: "#f8fbff" },
  cardImage: { width: "100%", height: 120 },

  ratingBadge: { position: "absolute", left: 10, top: 94, backgroundColor: "#fff", paddingHorizontal: 8, paddingVertical: 5, borderRadius: 12, flexDirection: "row", alignItems: "center", elevation: 3 },
  ratingText: { marginLeft: 6, fontWeight: "700", color: "#333", fontSize: 12 },

  cardBody: { padding: 12, paddingTop: 8 },
  cardTitle: { fontSize: 14, fontWeight: "800", color: "#071233" },
  cardDesc: { fontSize: 12, color: "#6b7280", marginTop: 6 },

  bottomArea: { marginTop: 12 },
  cardPrice: { color: "#001cab", fontWeight: "900", fontSize: 14, marginBottom: 8 },

  controlsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },

  buyTouch: { flex: 1, marginRight: 8 },
  buyPill: { height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  buyText: { color: "#fff", fontWeight: "800", fontSize: 14 },

  cartSmall: {
    width: 44,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dfefff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
