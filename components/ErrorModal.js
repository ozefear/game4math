import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  Animated, 
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ErrorModal = ({ visible, onClose, correctAnswer }) => {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const heartAnims = useRef([...Array(4)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (visible) {
      // Modal açılma animasyonu
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();

      // Sallama animasyonu
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // Kalp animasyonları
      heartAnims.forEach((anim, index) => {
        Animated.loop(
          Animated.sequence([
            Animated.delay(index * 300),
            Animated.timing(anim, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    } else {
      // Reset animasyonları
      scaleAnim.setValue(0);
      shakeAnim.setValue(0);
      heartAnims.forEach(anim => anim.setValue(0));
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.container,
            {
              transform: [
                { scale: scaleAnim },
                { translateX: shakeAnim }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            style={styles.modalContent}
          >

            {/* Ana İçerik */}
            <Text style={styles.emoji}>😊</Text>
            <Text style={styles.title}>Sorun Değil!</Text>
            <Text style={styles.subtitle}>Tekrar Deneyelim</Text>
            
            {correctAnswer && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerLabel}>Doğru cevap:</Text>
                <Text style={styles.answerValue}>{correctAnswer}</Text>
              </View>
            )}
            
            <Text style={styles.message}>
              Üzülme! Hata yapmak öğrenmenin bir parçası. Tekrar deneyelim! 🌈
            </Text>

            <TouchableOpacity 
              style={styles.button}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4ECDC4', '#45B7D1']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Tekrar Dene! 💪</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.85,
    maxWidth: 350,
  },
  modalContent: {
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  heart: {
    position: 'absolute',
    fontSize: 18,
    zIndex: 1,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  answerContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  answerLabel: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
    opacity: 0.9,
  },
  answerValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  message: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
    opacity: 0.95,
  },
  button: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonGradient: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default ErrorModal; 