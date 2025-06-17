import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PrimaryButton from '../components/PrimaryButton';

const InfoCard = ({ emoji, title, children, colors }) => (
  <View style={styles.card}>
    <LinearGradient
      colors={colors}
      style={styles.buttonGradient}
    >
      <Text style={styles.cardEmoji}>{emoji}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{children}</Text>
    </LinearGradient>
  </View>
);

const StepCard = ({ number, text, colors }) => (
  <View style={styles.stepCard}>
    <LinearGradient
      colors={colors}
      style={styles.buttonGradient}
    >
      <View style={styles.stepContent}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>{number}</Text>
        </View>
        <Text style={styles.stepText}>{text}</Text>
      </View>
    </LinearGradient>
  </View>
);

export default function InfoScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Geri</Text>
        </TouchableOpacity>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Nasıl Oynanır?</Text>
            <Text style={styles.subtitle}>Matematik Çarkı ile Eğlenceli Öğrenme</Text>
          </View>

          <InfoCard 
            emoji="🔍" 
            title="Nasıl Oynanır?"
            colors={['#FFD166', '#FF6B6B']}
          >
            Çarkı çevir, işlemini seç ve matematik sorularını çöz! Her doğru cevap sana puan kazandırır.
          </InfoCard>

          <View style={styles.stepsContainer}>
            <StepCard 
              number="1"
              text="Çarkı çevir ve bir işlem seç"
              colors={['#e3ffe7', '#d9e7ff']}
            />
            
            <StepCard 
              number="2"
              text="Gelen soruyu çözmeye çalış"
              colors={['#e3ffe7', '#d9e7ff']}
            />
            
            <StepCard 
              number="3"
              text="Doğru cevabı seç ve puan kazan"
              colors={['#e3ffe7', '#d9e7ff']}
            />
          </View>

          <InfoCard 
            emoji="🏆" 
            title="Puan Sistemi"
            colors={['#4ECDC4', '#45B7D1']}
          >
            • Her doğru cevap: ⭐ 1 puan 
            • Arka arkaya doğru yapınca bonus puan 
            • En yüksek puanı topla ve rekor kır!
          </InfoCard>

          <InfoCard 
            emoji="💡" 
            title="İpucu"
            colors={['#9C27B0', '#E91E63']}
          >
            Acele etme, dikkatli düşün! Zorlandığında parmaklarını kullanabilir veya kağıt kalemle işlem yapabilirsin.
          </InfoCard>

          <View style={styles.playButtonContainer}>
            <LinearGradient
              colors={['#FFD166', '#FF6B6B']}
              style={styles.playButton}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('Game')}
                style={styles.playButtonTouchable}
              >
                <Text style={styles.playButtonText}>🎮 Hemen Oyna</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>🧠 Matematik artık çok eğlenceli!</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
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
    textShadowRadius: 4,
  },
  card: {
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
    alignSelf: 'center',
  },
  buttonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  stepsContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  stepCard: {
    width: '50%',
    maxWidth: Math.min(Dimensions.get('window').width * 0.4, 580),
    marginBottom: 16,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  stepText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  playButtonContainer: {
    width: '50%',
    maxWidth: Math.min(Dimensions.get('window').width * 0.4, 580),
    marginTop: 16,
    marginBottom: 30,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    alignSelf: 'center',
  },
  playButton: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  playButtonTouchable: {
    width: '100%',
    alignItems: 'center',
  },
  playButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
