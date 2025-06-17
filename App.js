import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import RootStack from './navigation/RootStack';

export default function App() {
  // Web için responsive container
  const AppContainer = ({ children }) => {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.webContainer}>
          {children}
        </View>
      );
    }
    return <View style={styles.mobileContainer}>{children}</View>;
  };

  return (
    <AppContainer>
      <RootStack />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mobileContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
