// Matematik İşlemleri Sabit Verileri
export const MATH_OPERATIONS = [
  {
    id: 1,
    symbol: '+',
    name: 'TOPLAMA',
    emoji: '🍎',
    description: 'İki sayıyı birleştiriyoruz!',
    example: '2 + 3 = 5',
    story: '🍎 2 elma + 🍎🍎🍎 3 elma = 🍎🍎🍎🍎🍎 5 elma!\nElmaları sayalım: 1, 2, 3, 4, 5!',
    tip: 'Parmaklarınla sayabilirsin!\n✋ Sol el: 2 parmak\n✋ Sağ el: 3 parmak\nToplam: 5 parmak!',
    character: '🐰'
  },
  {
    id: 2,
    symbol: '−',
    name: 'ÇIKARMA',
    emoji: '🎈',
    description: 'Bir şeyler alıp götürüyoruz!',
    example: '5 − 2 = 3',
    story: '🎈🎈🎈🎈🎈 5 balon vardı\n💨 2 tanesi uçtu!\n🎈🎈🎈 3 balon kaldı!',
    tip: 'Büyük sayıdan başla!\n5 den geriye say: 4, 3\nSonuç: 3!',
    character: '🐻'
  },
  {
    id: 3,
    symbol: '*',
    name: 'ÇARPMA',
    emoji: '🍪',
    description: 'Aynı grupları topluyoruz!',
    example: '3 × 2 = 6',
    story: '🍪🍪 + 🍪🍪 + 🍪🍪\n3 grup, her grupta 2 kurabiye\nToplam: 6 kurabiye!',
    tip: '3 × 2 = 3 + 3 = 6\nYani 3\'ü 2 defa topla!\n3 + 3 = 6',
    character: '🦄'
  },
  {
    id: 4,
    symbol: '÷',
    name: 'BÖLME',
    emoji: '🍕',
    description: 'Eşit paylaşıyoruz!',
    example: '6 ÷ 2 = 3',
    story: '🍕🍕🍕🍕🍕🍕 6 pizza dilimi\n👦👧 2 çocuk paylaşıyor\nHer çocuğa: 🍕🍕🍕 3 dilim!',
    tip: '6 dilimi 2 çocuğa eşit ver:\n👦 3 dilim\n👧 3 dilim\nSonuç: 3!',
    character: '🐨'
  }
];

// Çark segmentleri
export const WHEEL_SEGMENTS = [
  { symbol: '+', position: 'topRight' },
  { symbol: '*', position: 'bottomRight' },
  { symbol: '−', position: 'bottomLeft' },
  { symbol: '÷', position: 'topLeft' },
];

// İşlem fonksiyonları
export const getOperationById = (id) => {
  return MATH_OPERATIONS.find(op => op.id === id);
};

export const getOperationBySymbol = (symbol) => {
  return MATH_OPERATIONS.find(op => op.symbol === symbol);
};

export const getAllOperationSymbols = () => {
  return MATH_OPERATIONS.map(op => op.symbol);
}; 