// src/screen/Chat.jsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';

// 1. Ini adalah Data Dummy (Palsu)
const dummyChats = [
  {
    id: '1',
    name: 'Apotek Sehat Jaya',
    message: 'Halo kak, apakah stok Paracetamol 500mg masih ada?',
    time: '09:45',
    avatar: 'https://ui-avatars.com/api/?name=Apotek+Sehat&background=0D8ABC&color=fff',
    unread: 2,
  },
  {
    id: '2',
    name: 'Dr. Budi Santoso',
    message: 'Resep sudah saya konfirmasi ya, silakan di checkout.',
    time: '08:30',
    avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random',
    unread: 0,
  },
  {
    id: '3',
    name: 'Pelanggan: Siti Aminah',
    message: 'Terima kasih, obatnya sudah sampai dengan selamat.',
    time: 'Kemarin',
    avatar: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=random',
    unread: 0,
  },
  {
    id: '4',
    name: 'Admin ObatKU',
    message: 'Selamat datang di ObatKU! Ada yang bisa kami bantu?',
    time: 'Senin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+Obatku&background=001cab&color=fff',
    unread: 1,
  },
];

export default function Chat({ navigation }) {

  // 2. Fungsi untuk merender setiap baris chat
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem} 
      onPress={() => navigation.navigate('DetailChat', { userName: item.name })}
    >
      {/* Gambar Profile */}
      <Image source={{ uri: item.avatar }} style={styles.avatar} />

      {/* Bagian Teks (Nama & Pesan) */}
      <View style={styles.textContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text style={styles.message} numberOfLines={1}>
            {item.message}
          </Text>
          {/* Badge pesan belum dibaca (jika ada) */}
          {item.unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Sederhana */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Pesan</Text>
      </View>

      <FlatList
        data={dummyChats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingTop: 50, // Sesuaikan dengan notch HP
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: '#eee',
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    color: '#666',
    flex: 1, // Agar teks terpotong jika terlalu panjang
    marginRight: 10,
  },
  badge: {
    backgroundColor: '#001cab', // Warna utama aplikasi kamu
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});