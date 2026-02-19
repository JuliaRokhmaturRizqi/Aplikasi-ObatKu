// src/screen/RiwayatPesanan.jsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

// Kita pakai data dummy yang lebih lengkap
const allOrders = [
  { id: "o1", name: "Paracetamol 500mg", date: "20 Nov 2025", status: "Dikirim", price: "Rp 12.000", items: 2 },
  { id: "o2", name: "Vitamin C 1000mg", date: "10 Nov 2025", status: "Selesai", price: "Rp 45.000", items: 1 },
  { id: "o3", name: "Masker Medis x50", date: "25 Okt 2025", status: "Dikemas", price: "Rp 80.000", items: 3 },
  { id: "o4", name: "Betadine Antiseptik", date: "22 Okt 2025", status: "Batal", price: "Rp 35.000", items: 1 },
  { id: "o5", name: "Minyak Kayu Putih", date: "15 Okt 2025", status: "Selesai", price: "Rp 22.000", items: 2 },
];

export default function RiwayatPesanan({ navigation }) {

  const renderItem = ({ item }) => {
    // Logic warna status
    let statusColor = "#F59E0B"; 
    let statusBg = "#FFF8E1";
    
    if (item.status === "Selesai") {
      statusColor = "#10B981"; statusBg = "#E8F5E9";
    } else if (item.status === "Dikirim") {
      statusColor = "#229cffff"; statusBg = "#E0F7FA";
    } else if (item.status === "Batal") {
      statusColor = "#EF4444"; statusBg = "#FFEBEE";
    }

    return (
      <TouchableOpacity style={styles.card} onPress={() => console.log("Detail pesanan")}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBox}>
             <FontAwesome5 name="box-open" size={20} color="#0D47A1" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.orderId}>ID: {item.id.toUpperCase()}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.cardBody}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.itemCount}>{item.items} Barang</Text>
        </View>

        <View style={styles.cardFooter}>
            <View>
                <Text style={styles.labelTotal}>Total Belanja</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.btnBeliLagi}>
                <Text style={styles.btnText}>Beli Lagi</Text>
            </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <FlatList 
        data={allOrders}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EFF6FF',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  iconBox: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center'
  },
  date: { fontSize: 12, color: '#64748B' },
  orderId: { fontSize: 14, fontWeight: 'bold', color: '#1E293B' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginBottom: 12 },
  cardBody: { marginBottom: 12 },
  productName: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  itemCount: { fontSize: 12, color: '#64748B', marginTop: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  labelTotal: { fontSize: 10, color: '#64748B' },
  price: { fontSize: 16, fontWeight: '800', color: '#0D47A1' },
  btnBeliLagi: { 
    paddingVertical: 8, paddingHorizontal: 16, 
    borderRadius: 8, borderWidth: 1, borderColor: '#0D47A1' 
  },
  btnText: { fontSize: 12, fontWeight: '700', color: '#0D47A1' }
});