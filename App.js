import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import UserProfile from './screens/UserProfile';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        keyboardShouldPersistTaps="handled"
      >
        <UserProfile />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1, // ช่วยให้ ScrollView เต็มพื้นที่
    paddingBottom: 20, // ป้องกันเนื้อหาติดขอบล่าง
  },
});

