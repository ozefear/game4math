import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const operations = [
  {
    id: 1,
    symbol: '+',
    name: 'Toplama',
    emoji: '🧮',
    color: ['#4ECDC4', '#44A08D'],
    description: 'Sayıları bir araya getirme işlemi',
    example: '3 + 2 = 5',
    story: 'Ahmet\'in 3 elması var, annesi 2 elma daha veriyor. Toplam kaç elması olur?',
    tip: 'Toplama yaparken parmaklarını kullanabilirsin! 👆',
    character: '🐰'
  },
  {
    id: 2,
    symbol: '−',
    name: 'Çıkarma',
    emoji: '🎯',
    color: ['#FF6B6B', '#FF8E8E'],
    description: 'Sayıları azaltma işlemi',
    example: '5 − 2 = 3',
    story: 'Ayşe\'nin 5 balonu var, 2 tanesi uçtu. Kaç balonu kaldı?',
    tip: 'Çıkarma yaparken büyük sayıdan küçük sayıyı çıkarırız! 📉',
    character: '🐻'
  },
  {
    id: 3,
    symbol: '×',
    name: 'Çarpma',
    emoji: '⭐',
    color: ['#FFD166', '#FFB347'],
    description: 'Aynı sayıyı tekrar tekrar toplama',
    example: '3 × 2 = 6',
    story: '3 kutu var, her kutuda 2 şeker. Toplam kaç şeker?',
    tip: 'Çarpma tablo ezberlemek işini kolaylaştırır! 📋',
    character: '🦄'
  },
  {
    id: 4,
    symbol: '÷',
    name: 'Bölme',
    emoji: '🍰',
    color: ['#45B7D1', '#4FC3F7'],
    description: 'Eşit parçalara ayırma işlemi',
    example: '6 ÷ 2 = 3',
    story: '6 kurabiyeyi 2 arkadaş eşit paylaşıyor. Her birine kaç kurabiye düşer?',
    tip: 'Bölme çarpmanın tersidir! 🔄',
    character: '🐨'
  }
];

export default function LearningScreen({ navigation }) {
  const [selectedOperation, setSelectedOperation] = useState(null);
  const scaleAnims = useRef(operations.map(() => new Animated.Value(1))).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sayfa açılış animasyonu
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleOperationPress = (operation, index) => {
    // Buton animasyonu
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedOperation(selectedOperation?.id === operation.id ? null : operation);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>📚 İşlem Öğrenme</Text>
            
            <View style={styles.placeholder} />
          </View>

          <Animated.View style={[styles.mainContent, { opacity: fadeAnim }]}>
            {/* Ana Başlık */}
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>🎓 Dört İşlem Dünyası</Text>
              <Text style={styles.subtitle}>Her işlemi sevimli karakterlerle öğren!</Text>
            </View>

            <ScrollView 
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[styles.scrollContent, { alignItems: 'center' }]}
            >
              {/* İşlem Kartları */}
              {operations.map((operation, index) => (
                <Animated.View
                  key={operation.id}
                  style={[
                    styles.operationCard,
                    { transform: [{ scale: scaleAnims[index] }] }
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => handleOperationPress(operation, index)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={operation.color}
                      style={styles.cardGradient}
                    >
                      <View style={styles.cardHeader}>
                        <Text style={styles.operationEmoji}>{operation.emoji}</Text>
                        <View style={styles.operationInfo}>
                          <Text style={styles.operationSymbol}>{operation.symbol}</Text>
                          <Text style={styles.operationName}>{operation.name}</Text>
                        </View>
                        <Text style={styles.characterEmoji}>{operation.character}</Text>
                      </View>

                      <Text style={styles.description}>{operation.description}</Text>
                      <Text style={styles.example}>{operation.example}</Text>

                      {/* Detay Bölümü */}
                      {selectedOperation?.id === operation.id && (
                        <Animated.View style={styles.detailSection}>
                          <View style={styles.storyContainer}>
                            <Text style={styles.storyTitle}>📖 Hikaye:</Text>
                            <Text style={styles.storyText}>{operation.story}</Text>
                          </View>

                          <View style={styles.tipContainer}>
                            <Text style={styles.tipTitle}>💡 İpucu:</Text>
                            <Text style={styles.tipText}>{operation.tip}</Text>
                          </View>

                          <View style={styles.practiceContainer}>
                            <Text style={styles.practiceTitle}>🎮 Pratik Yap:</Text>
                            <TouchableOpacity 
                              style={styles.practiceButton}
                              onPress={() => navigation.navigate('Game')}
                            >
                              <Text style={styles.practiceButtonText}>Oyunda Dene!</Text>
                            </TouchableOpacity>
                          </View>
                        </Animated.View>
                      )}

                      <View style={styles.tapHint}>
                        <Text style={styles.tapHintText}>
                          {selectedOperation?.id === operation.id ? '👆 Detayları gizle' : '👆 Detayları gör'}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              ))}

              {/* Alt Mesaj */}
              <View style={styles.bottomMessage}>
                <Text style={styles.bottomMessageText}>
                  🌟 Her işlemi öğrendikten sonra oyunda dene! 
                </Text>
                <Text style={styles.bottomMessageSubtext}>
                  Matematik öğrenmek bu kadar eğlenceli! 🎉
                </Text>
              </View>
            </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  placeholder: {
    width: 44,
  },
  mainContent: {
    flex: 1,
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  operationCard: {
    width: '75%',
    maxWidth: Math.min(Dimensions.get('window').width * 0.4, 580),
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    alignSelf: 'center',
  },
  cardGradient: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  operationEmoji: {
    fontSize: 40,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  operationInfo: {
    flex: 1,
    alignItems: 'center',
  },
  operationSymbol: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  operationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  characterEmoji: {
    fontSize: 40,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    opacity: 0.95,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  example: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  detailSection: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  storyContainer: {
    marginBottom: 15,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  storyText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    opacity: 0.95,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tipContainer: {
    marginBottom: 15,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tipText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    opacity: 0.95,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  practiceContainer: {
    alignItems: 'center',
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  practiceButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  practiceButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tapHint: {
    alignItems: 'center',
  },
  tapHintText: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bottomMessage: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },
  bottomMessageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bottomMessageSubtext: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
}); 