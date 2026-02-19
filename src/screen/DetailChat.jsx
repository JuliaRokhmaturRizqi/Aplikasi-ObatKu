// src/screen/DetailChat.jsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetailChat({ route }) {
  // 1. Mengambil data nama dari halaman sebelumnya (jika ada)
  const { userName } = route.params || { userName: 'Pengguna' };

  // 2. Data Dummy Percakapan
  const [messages, setMessages] = useState([
    { id: '1', text: 'Halo, barang ini ready stok gan?', sender: 'me', time: '10:00' },
    { id: '2', text: 'Halo kak, ready siap kirim.', sender: 'other', time: '10:01' },
    { id: '3', text: 'Oke, saya pesan 2 kotak ya.', sender: 'me', time: '10:05' },
    { id: '4', text: 'Siap kak, ditunggu pembayarannya.', sender: 'other', time: '10:06' },
  ]);

  const [inputText, setInputText] = useState('');

  // 3. Fungsi Kirim Pesan
  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'me', // Pesan baru selalu dari 'me'
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]); // Tambah pesan ke list
      setInputText(''); // Kosongkan input
    }
  };

  // 4. Render Item (Gelembung Chat)
  const renderItem = ({ item }) => {
    const isMe = item.sender === 'me';
    return (
      <View style={[
        styles.messageContainer, 
        isMe ? styles.myMessageContainer : styles.otherMessageContainer
      ]}>
        <View style={[
          styles.bubble, 
          isMe ? styles.myBubble : styles.otherBubble
        ]}>
          <Text style={[styles.messageText, isMe ? styles.myText : styles.otherText]}>
            {item.text}
          </Text>
          <Text style={[styles.timeText, isMe ? styles.myTime : styles.otherTime]}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    // KeyboardAvoidingView agar keyboard tidak menutupi input
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : undefined} 
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Bagian Input Bawah */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ketik pesan..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Warna background chat agak abu
  },
  listContent: {
    padding: 15,
    paddingBottom: 20,
  },
  messageContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
  },
  myBubble: {
    backgroundColor: '#001cab', // Warna Utama Aplikasi Anda
    borderBottomRightRadius: 2, // Efek gelembung
  },
  otherBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 2, // Efek gelembung
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 15,
  },
  myText: {
    color: '#fff',
  },
  otherText: {
    color: '#333',
  },
  timeText: {
    fontSize: 10,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  myTime: {
    color: '#ddd',
  },
  otherTime: {
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 15,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#001cab',
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});