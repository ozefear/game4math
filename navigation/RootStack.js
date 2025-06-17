import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import InfoScreen from '../screens/InfoScreen';
import LearningScreen from '../screens/LearningScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  useEffect(() => {
    // İlk yükleme sırasında belleği temizleyelim
    return () => {
      try {
        // Garbage collection için ipucu
        if (Platform.OS === 'ios') {
          console.log('Navigation container unmounted and cleaned up');
        }
      } catch (error) {
        console.warn('Cleanup error:', error);
      }
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === 'ios' ? 'fade' : 'slide_from_right', // iOS için daha hafif animasyon
          contentStyle: { backgroundColor: '#FDF6EC' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen 
          name="Game" 
          component={GameScreen}
          options={{
            gestureEnabled: false, // Geri tuşunu devre dışı bırak
          }}
        />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Learning" component={LearningScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
