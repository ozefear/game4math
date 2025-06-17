// Renk Paleti - Merkezi renk yönetimi
export const COLORS = {
  // Ana renkler
  PRIMARY: '#667eea',
  SECONDARY: '#764ba2',
  ACCENT: '#f093fb',
  
  // İşlem renkleri
  OPERATIONS: {
    ADDITION: '#4ECDC4',
    SUBTRACTION: '#FF6B6B', 
    MULTIPLICATION: '#FFD166',
    DIVISION: '#45B7D1',
  },
  
  // Gradient kombinasyonları
  GRADIENTS: {
    PRIMARY: ['#667eea', '#764ba2'],
    BACKGROUND: ['#667eea', '#764ba2', '#f093fb'],
    SUCCESS: ['#FFD166', '#FF6B6B'],
    ERROR: ['#FF6B6B', '#FF8E8E'],
    INFO: ['#4ECDC4', '#45B7D1'],
    LEARNING: ['#9C27B0', '#E91E63'],
    
    // İşlem gradientleri
    ADDITION: ['#4ECDC4', '#44A08D'],
    SUBTRACTION: ['#FF6B6B', '#FF8E8E'],
    MULTIPLICATION: ['#FFD166', '#FFB347'],
    DIVISION: ['#45B7D1', '#4FC3F7'],
  },
  
  // Metin renkleri
  TEXT: {
    PRIMARY: '#333333',
    SECONDARY: '#666666',
    LIGHT: '#FFFFFF',
    DISABLED: '#CCCCCC',
  },
  
  // Background renkleri
  BACKGROUND: {
    PRIMARY: '#FFFFFF',
    SECONDARY: '#F5F5F5',
    OVERLAY: 'rgba(0,0,0,0.5)',
    TRANSPARENT: 'transparent',
  },
  
  // Shadow renkleri
  SHADOW: {
    DEFAULT: '#000000',
    LIGHT: 'rgba(0,0,0,0.1)',
    MEDIUM: 'rgba(0,0,0,0.2)',
    DARK: 'rgba(0,0,0,0.3)',
  }
};

// Renk yardımcı fonksiyonları
export const getOperationColor = (operation) => {
  const colorMap = {
    '+': COLORS.OPERATIONS.ADDITION,
    '−': COLORS.OPERATIONS.SUBTRACTION,
    '*': COLORS.OPERATIONS.MULTIPLICATION,
    '÷': COLORS.OPERATIONS.DIVISION,
  };
  return colorMap[operation] || COLORS.OPERATIONS.ADDITION;
};

export const getOperationGradient = (operation) => {
  const gradientMap = {
    '+': COLORS.GRADIENTS.ADDITION,
    '−': COLORS.GRADIENTS.SUBTRACTION,
    '*': COLORS.GRADIENTS.MULTIPLICATION,
    '÷': COLORS.GRADIENTS.DIVISION,
  };
  return gradientMap[operation] || COLORS.GRADIENTS.ADDITION;
}; 