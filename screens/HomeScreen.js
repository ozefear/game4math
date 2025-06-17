import React, { useCallback, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions, 
  SafeAreaView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  
  // Animasyon referansları
  const titleBounce = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0)).current;
  const characterBounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Başlık animasyonu
    Animated.spring(titleBounce, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Buton animasyonu
    Animated.spring(buttonScale, {
      toValue: 1,
      tension: 40,
      friction: 6,
      delay: 300,
      useNativeDriver: true,
    }).start();

    // Karakter zıplama animasyonu
    Animated.loop(
      Animated.sequence([
        Animated.timing(characterBounce, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(characterBounce, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleGameStart = useCallback(() => {
    navigation.navigate('Game');
  }, [navigation]);

  const handleInfoPress = useCallback(() => {
    navigation.navigate('Info');
  }, [navigation]);

  const handleLearningPress = useCallback(() => {
    navigation.navigate('Learning');
  }, [navigation]);

  const titleScale = titleBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const characterTranslate = characterBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Ana Karakter */}
          <Animated.View
            style={[
              styles.characterContainer,
              {
                transform: [
                  { translateY: characterTranslate },
                  { scale: titleBounce }
                ]
              }
            ]}
          >
            <Text style={styles.mainCharacter}>🤖</Text>
            <View style={styles.speechBubble}>
              <Text style={styles.speechText}>Hadi matematik öğrenelim!</Text>
            </View>
          </Animated.View>

          {/* Başlık */}
          <Animated.View
            style={[
              styles.titleContainer,
              {
                transform: [{ scale: titleScale }]
              }
            ]}
          >
            <Text style={styles.title}>🎯 Matematik Çarkı</Text>
            <Text style={styles.subtitle}>Eğlenceli Öğrenme Macerası</Text>
          </Animated.View>

          {/* Alt Karakterler */}
          <View style={styles.bottomCharacters}>
            <Text style={styles.sideCharacter}>🦄</Text>
            <Text style={styles.sideCharacter}>🐻</Text>
            <Text style={styles.sideCharacter}>🐨</Text>
          </View>

          {/* Butonlar */}
          <Animated.View
            style={[
              styles.buttonsContainer,
              {
                transform: [{ scale: buttonScale }]
              }
            ]}
          >
            <TouchableOpacity
              style={styles.gameButton}
              onPress={handleGameStart}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FFD166', '#FF6B6B']}
                style={styles.buttonGradient}
              >
                <Text style={styles.gameButtonText}>🎮 Oyuna Başla!</Text>
                <Text style={styles.buttonSubtext}>Çarkı çevir, matematik öğren!</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoButton}
              onPress={handleInfoPress}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4ECDC4', '#45B7D1']}
                style={styles.buttonGradient}
              >
                <Text style={styles.infoButtonText}>ℹ️ Nasıl Oynanır?</Text>
                <Text style={styles.buttonSubtext}>Oyun kurallarını öğren</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.learningButton}
              onPress={handleLearningPress}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#9C27B0', '#E91E63']}
                style={styles.buttonGradient}
              >
                <Text style={styles.learningButtonText}>📚 İşlem Bilgini Gözden Geçir</Text>
                <Text style={styles.buttonSubtext}>Dört işlemi eğlenceli öğren!</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  safeArea: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  characterContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  mainCharacter: {
    fontSize: 80,
    marginBottom: 15,
  },
  speechBubble: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    borderWidth: 3,
    borderColor: '#FFD166',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  speechText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4
  },
  bottomCharacters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
    marginBottom: 40,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4
  },
  sideCharacter: {
    fontSize: 40,
  },
  buttonsContainer: {
    width: '75%',
    alignItems: 'center',
  },
  gameButton: {
    width: '50%',
    maxWidth: Math.min(Dimensions.get('window').width * 0.4, 580),
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  infoButton: {
    width: '50%',
    maxWidth: Math.min(Dimensions.get('window').width * 0.4, 580),
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  learningButton: {
    width: '50%',
    maxWidth: Math.min(Dimensions.get('window').width * 0.4, 580),
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  gameButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  infoButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  learningButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
  },
  buttonSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  decorativeElements: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  decorativeEmoji: {
    fontSize: 30,
    opacity: 0.7,
  },
});
