import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';

const QuestionCard = ({ question, options, onSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Component unmount olduğunda animasyonları temizle
  useEffect(() => {
    return () => {
      scaleAnim.stopAnimation();
      fadeAnim.stopAnimation();
      scaleAnim.setValue(1);
      fadeAnim.setValue(1);
    };
  }, [scaleAnim, fadeAnim]);

  // Cevap seçildiğinde çağrılacak fonksiyon
  const handleAnswerPress = (answer) => {
    if (selectedAnswer !== null) return; // Zaten bir cevap seçildi

    setSelectedAnswer(answer);
    
    // Basma animasyonu
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Animasyon tamamlandıktan sonra callback'i çağır
      setTimeout(() => {
        onSelect(answer);
        setSelectedAnswer(null); // Reset
      }, 200);
    });
  };

  // Seçili olmayan butonları soluklaştır
  useEffect(() => {
    if (selectedAnswer !== null) {
      Animated.timing(fadeAnim, {
        toValue: 0.6,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(1);
    }
  }, [selectedAnswer, fadeAnim]);

  if (!question || !options || options.length === 0) {
    return null;
  }

  // Renk paleti
  const optionColors = ['#4ECDC4', '#FFD166', '#FF6B6B', '#45B7D1'];

  return (
    <View style={styles.card}>
      {/* Soru */}
      <View style={styles.questionContainer}>
        <Text style={[styles.questionText, { color: question.color }]}>
          {`${question.num1} ${question.operation === '*' ? '×' : question.operation} ${question.num2} = ?`}
        </Text>
      </View>

      {/* Seçenekler */}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          return (
            <Animated.View 
              key={index} 
              style={[
                styles.optionWrapper,
                {
                  transform: [{ 
                    scale: isSelected ? scaleAnim : 1 
                  }],
                  opacity: selectedAnswer && !isSelected ? fadeAnim : 1,
                }
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.optionButton, 
                  { 
                    backgroundColor: optionColors[index % optionColors.length],
                  }
                ]}
                onPress={() => handleAnswerPress(option)}
                activeOpacity={0.8}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: 'center',
  },
  questionContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionWrapper: {
    width: '48%',
    marginBottom: 15,
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default React.memo(QuestionCard);
