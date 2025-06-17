import React, { useRef, useImperativeHandle, useCallback } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions, Text } from 'react-native';

// Çark segmentleri - saat yönünde düzenlenmiş
const OPERATIONS = [
  { symbol: '+', color: '#4ECDC4', name: 'toplama' },      // 0-90 derece (üst-sağ)
  { symbol: '×', color: '#FFD166', name: 'çarpma' },       // 90-180 derece (sağ-alt)
  { symbol: '−', color: '#FF6B6B', name: 'çıkarma' },      // 180-270 derece (alt-sol)
  { symbol: '÷', color: '#45B7D1', name: 'bölme' },        // 270-360 derece (sol-üst)
];

  const { width: SCREEN_WIDTH } = Dimensions.get('window');
const WHEEL_SIZE = Math.min(SCREEN_WIDTH * 0.75, 280);
const CENTER = WHEEL_SIZE / 2;

const MathWheel = React.forwardRef(({ onSpinComplete }, ref) => {
  const rotationValue = useRef(new Animated.Value(0)).current;
  const isSpinningRef = useRef(false);

  // Add reset function
  const reset = useCallback(() => {
    isSpinningRef.current = false;
    rotationValue.setValue(0);
  }, [rotationValue]);

  // Hangi segmentte olduğumuzu hesapla
  const getSegmentFromRotation = useCallback((rotation) => {
    // Rotasyonu 0-360 arasına normalize et
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    
    // Ok üstte ve aşağıya bakıyor
    // Çark saat yönünde döndüğü için açıyı ters çevir
    const adjustedAngle = (360 - normalizedRotation) % 360;
    
    // Hangi segmentte olduğumuzu belirle (her segment 90 derece)
    const segmentIndex = Math.floor(adjustedAngle / 90);
    
    return OPERATIONS[segmentIndex];
  }, []);
  
  // Çarkı döndür
  const spin = useCallback(() => {
    if (isSpinningRef.current) return;

    isSpinningRef.current = true;
    
    // Rastgele hedef segment seç
    const targetSegmentIndex = Math.floor(Math.random() * 4);
    
    // Segment merkezine gelecek açıyı hesapla
    const segmentCenterAngle = targetSegmentIndex * 90 + 45; // Segment ortası
    
    // Biraz rastgelelik ekle (±20 derece)
    const randomOffset = (Math.random() - 0.5) * 40;
      const targetAngle = segmentCenterAngle + randomOffset;
      
    // Ekstra tur sayısı (5-8 tam tur)
    const extraSpins = 5 + Math.floor(Math.random() * 4);
    const totalRotation = extraSpins * 360 + targetAngle;

    // Mevcut değeri sıfırla
    rotationValue.setValue(0);

    // Animasyonu başlat
    Animated.timing(rotationValue, {
        toValue: totalRotation,
      duration: 3000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
        isSpinningRef.current = false;
        const selectedSegment = getSegmentFromRotation(totalRotation);
          
          setTimeout(() => {
          onSpinComplete?.(selectedSegment.symbol);
        }, 300);
      }
    });
  }, [rotationValue, onSpinComplete, getSegmentFromRotation]);

  // Update useImperativeHandle to include reset
  useImperativeHandle(ref, () => ({
    spin,
    isSpinning: () => isSpinningRef.current,
    reset, // Add reset to exposed methods
  }), [spin, reset]);
  
  // Rotasyon interpolasyonu
  const rotation = rotationValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  // Add this new interpolated value for symbol rotation
  const symbolRotation = rotationValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '-360deg'], // Counter-rotate the symbols
  });

  return (
    <View style={styles.container}>
      {/* Sabit Ok - Üstte */}
      <View style={styles.arrow}>
        <View style={styles.arrowShadow} />
        <View style={styles.arrowTriangle} />
      </View>
      
      {/* Static Shadow Layer */}
      <View style={styles.wheelShadow} />
      
      {/* Dönen Çark */}
      <Animated.View 
        style={[
          styles.wheel, 
          { 
            transform: [{ rotate: rotation }],
          },
        ]}
      >
        {/* Segment 1: Toplama (+) - Üst-Sağ */}
        <View style={[styles.segment, styles.topRight, { backgroundColor: OPERATIONS[0].color }]}>
          <Animated.View style={[{ transform: [{ rotate: symbolRotation }] }, styles.symbolContainer]}>
            <Text style={styles.operationText}>{OPERATIONS[0].symbol}</Text>
          </Animated.View>
        </View>
        
        {/* Segment 2: Çarpma (×) - Sağ-Alt */}
        <View style={[styles.segment, styles.bottomRight, { backgroundColor: OPERATIONS[1].color }]}>
          <Animated.View style={[{ transform: [{ rotate: symbolRotation }] }, styles.symbolContainer]}>
            <View style={styles.rotatedPlus}>
              <Text style={styles.operationText}>+</Text>
            </View>
          </Animated.View>
        </View>
        
        {/* Segment 3: Çıkarma (-) - Alt-Sol */}
        <View style={[styles.segment, styles.bottomLeft, { backgroundColor: OPERATIONS[2].color }]}>
          <Animated.View style={[{ transform: [{ rotate: symbolRotation }] }, styles.symbolContainer]}>
            <Text style={styles.operationText}>{OPERATIONS[2].symbol}</Text>
          </Animated.View>
        </View>
        
        {/* Segment 4: Bölme (÷) - Sol-Üst */}
        <View style={[styles.segment, styles.topLeft, { backgroundColor: OPERATIONS[3].color }]}>
          <Animated.View style={[{ transform: [{ rotate: symbolRotation }] }, styles.symbolContainer]}>
            <Text style={styles.operationText}>{OPERATIONS[3].symbol}</Text>
          </Animated.View>
        </View>
        
        {/* Merkez Daire */}
        <View style={styles.center} />
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    position: 'relative',
    backgroundColor: '#fff',
  },
  segment: {
    position: 'absolute',
    width: CENTER,
    height: CENTER,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopRightRadius: WHEEL_SIZE / 2,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomRightRadius: WHEEL_SIZE / 2,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomLeftRadius: WHEEL_SIZE / 2,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopLeftRadius: WHEEL_SIZE / 2,
  },
  operationText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  center: {
    position: 'absolute',
    top: CENTER - 15,
    left: CENTER - 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#333',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  arrow: {
    position: 'absolute',
    top: -10,
    zIndex: 10,
    alignItems: 'center',
  },
  arrowTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 25,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#333',
    elevation: 6,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  arrowShadow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 25,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(0,0,0,0.3)',
    transform: [{ translateY: 2 }],
    blurRadius: 0.5
  },
  rotatedPlus: {
    transform: [{ rotate: '45deg' }],
  },
  symbolContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '25%',
    left: '25%',
    width: '50%',
    height: '50%',
  },
  wheelShadow: {
    position: 'absolute',
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    backgroundColor: 'transparent',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

// Update spinWheel helper function
export const spinWheel = (wheelRef) => {
  if (wheelRef.current && !wheelRef.current.isSpinning()) {
    wheelRef.current.spin();
  }
};

// Add resetWheel helper function
export const resetWheel = (wheelRef) => {
  if (wheelRef.current) {
    wheelRef.current.reset();
  }
};

export default MathWheel;
