import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import MathWheel, { spinWheel, resetWheel } from '../components/MathWheel';
import QuestionCard from '../components/QuestionCard';
import SuccessModal from '../components/SuccessModal';
import ErrorModal from '../components/ErrorModal';

// Renk paleti - çark segmentleriyle eşleşen
const COLOR_PALETTE = {
  '+': '#4ECDC4',  // Turkuaz
  '×': '#FFD166',  // Sarı
  '−': '#FF6B6B',  // Kırmızı
  '÷': '#45B7D1',  // Mavi
};

export default function GameScreen({ navigation }) {
  const wheelRef = useRef(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Add both fade and scale animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Rastgele sayı üretici
  const getRandomNumber = useCallback((min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  // Matematik sorusu oluşturucu
  const createMathQuestion = useCallback((operation) => {
    let num1, num2, answer;

    switch (operation) {
        case '+':
        num1 = getRandomNumber(1, 50);
        num2 = getRandomNumber(1, 50);
        answer = num1 + num2;
          break;
      
        case '−':
        num1 = getRandomNumber(10, 100);
        num2 = getRandomNumber(1, num1 - 1);
        answer = num1 - num2;
          break;
      
      case '×':
        num1 = getRandomNumber(2, 12);
        num2 = getRandomNumber(2, 12);
        answer = num1 * num2;
        break;
      
      case '÷':
        // Bölme için önce sonucu belirleyip geriye gidiyoruz
        answer = getRandomNumber(2, 20);
        num2 = getRandomNumber(2, 10);
        num1 = answer * num2;
        break;
      
      default:
        num1 = 1;
        num2 = 1;
        answer = 2;
        operation = '+';
    }

    return {
      num1,
      num2,
      operation,
      answer,
      color: COLOR_PALETTE[operation]
    };
  }, [getRandomNumber]);

  // Yanlış seçenekler oluşturucu
  const generateWrongOptions = useCallback((correctAnswer) => {
    const wrongOptions = [];
    const usedNumbers = new Set([correctAnswer]);

    while (wrongOptions.length < 3) {
      let wrongAnswer;
      
      // Doğru cevaba yakın yanlış cevaplar üret
      const deviation = getRandomNumber(1, Math.max(5, Math.floor(correctAnswer * 0.3)));
      const isPositive = Math.random() > 0.5;
      
      wrongAnswer = isPositive 
        ? correctAnswer + deviation 
        : Math.max(1, correctAnswer - deviation);

      if (!usedNumbers.has(wrongAnswer)) {
        wrongOptions.push(wrongAnswer);
        usedNumbers.add(wrongAnswer);
      }
    }

    return wrongOptions;
  }, [getRandomNumber]);

  // Seçenekleri karıştır
  const shuffleOptions = useCallback((correctAnswer, wrongOptions) => {
    const allOptions = [correctAnswer, ...wrongOptions];
    
    // Fisher-Yates shuffle algoritması
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }
    
    return allOptions;
  }, []);

  // Çark durduğunda çağrılacak fonksiyon
  const handleSpinComplete = useCallback((selectedOperation) => {
    const question = createMathQuestion(selectedOperation);
    const wrongOptions = generateWrongOptions(question.answer);
    const shuffledOptions = shuffleOptions(question.answer, wrongOptions);
    
    // Run animations first, then update state
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800, // Increased duration
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0, // Changed to 0 for complete disappearance
        duration: 800, // Increased duration
        useNativeDriver: true,
      })
    ]).start(() => {
      // Update states after animation completes
      setCurrentQuestion(question);
      setOptions(shuffledOptions);
      setIsSpinning(false);
      
      if (!gameStarted) {
        setGameStarted(true);
      }
    });
    
  }, [createMathQuestion, generateWrongOptions, shuffleOptions, gameStarted, fadeAnim, scaleAnim]);

  // Cevap seçimi
  const handleAnswerSelect = useCallback((selectedAnswer) => {
    if (!currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setShowSuccessModal(true);
    } else {
      setShowErrorModal(true);
    }
  }, [currentQuestion]);

  // Başarı modal'ı kapatma
  const handleSuccessModalClose = useCallback(() => {
    setShowSuccessModal(false);
    setCurrentQuestion(null);
    setOptions([]);
    setTimeout(() => handleSpinPress(), 500);
  }, []);

  // Hata modal'ı kapatma
  const handleErrorModalClose = useCallback(() => {
    setShowErrorModal(false);
    setCurrentQuestion(null);
    setOptions([]);
    setTimeout(() => handleSpinPress(), 500);
  }, []);

  // Çark döndür
  const handleSpinPress = useCallback(() => {
    if (isSpinning) return;
    
    // Reset animations
    fadeAnim.setValue(1);
    scaleAnim.setValue(1);
    
    setIsSpinning(true);
    setCurrentQuestion(null);
    setOptions([]);
    spinWheel(wheelRef);
  }, [isSpinning, fadeAnim, scaleAnim]);

  // Ana sayfa geçiş
  const handleGoHome = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

     // Oyunu sıfırla
   const handleResetGame = useCallback(() => {
     setScore(0);
     setCurrentQuestion(null);
     setOptions([]);
     setIsSpinning(false);
     setGameStarted(false);
     setShowSuccessModal(false);
     setShowErrorModal(false);
     resetWheel(wheelRef);
     // Reset both animations
     fadeAnim.setValue(1);
     scaleAnim.setValue(1);
   }, [fadeAnim, scaleAnim]);

  

  return (
      <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoHome} style={styles.homeButton}>
            <Ionicons name="home" size={24} color="#fff" />
          </TouchableOpacity>
          
        <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Skor: {score}</Text>
          </View>
          
          <TouchableOpacity onPress={handleResetGame} style={styles.resetButton}>
            <Ionicons name="refresh" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Content */}
        <View style={styles.content}>
          {/* Oyun Başlangıç Mesajı */}
          {!gameStarted && (
            <Animated.View 
              style={[
                styles.welcomeContainer,
                { 
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              <Text style={styles.welcomeTitle}>🎯 Matematik Çarkı</Text>
              <Text style={styles.welcomeText}>
                Çarkı çevir ve çıkan işlem türünde soruları çöz!
              </Text>
            </Animated.View>
          )}

          {/* Çark */}
        <View style={styles.wheelContainer}>
            <MathWheel ref={wheelRef} onSpinComplete={handleSpinComplete} />
        </View>

          {/* Çark Döndür Butonu */}
          {!currentQuestion && (
            <TouchableOpacity
              style={[styles.spinButton, isSpinning && styles.spinButtonDisabled]}
              onPress={handleSpinPress}
              disabled={isSpinning}
            >
              <Text style={styles.spinButtonText}>
                {isSpinning ? '🎯 Çark Dönüyor...' : '🎲 Çarkı Çevir'}
              </Text>
            </TouchableOpacity>
          )}

          {/* Soru Kartı */}
          {currentQuestion && options.length > 0 && (
            <QuestionCard
              question={currentQuestion}
              options={options}
              onSelect={handleAnswerSelect}
            />
          )}
          </View>

        {/* Modal'lar */}
        <SuccessModal
          visible={showSuccessModal}
          onClose={handleSuccessModalClose}
        />

        <ErrorModal
          visible={showErrorModal}
          onClose={handleErrorModalClose}
          correctAnswer={currentQuestion?.answer}
        />
    </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  homeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  scoreText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 15,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  wheelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  spinButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  spinButtonDisabled: {
    backgroundColor: '#ccc',
    elevation: 2,
  },
  spinButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
         color: '#667eea',
     textAlign: 'center',
  },
});
