import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './navigation/BottomTabs';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        {/* Only BottomTabs is rendered, so no duplicate screen */}
        <BottomTabs />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
