// Matematik İşlemleri Yardımcı Fonksiyonları

/**
 * Belirtilen aralıkta rastgele sayı üretir
 * @param {number} min - Minimum değer
 * @param {number} max - Maksimum değer
 * @returns {number} Rastgele sayı
 */
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Verilen işleme göre matematik sorusu oluşturur
 * @param {string} operation - İşlem türü (+, -, *, ÷)
 * @returns {Object} Matematik sorusu objesi
 */
export const createMathQuestion = (operation) => {
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
    
    case '*':
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
    answer
  };
};

/**
 * Doğru cevaba yakın yanlış seçenekler üretir
 * @param {number} correctAnswer - Doğru cevap
 * @param {number} count - Üretilecek yanlış seçenek sayısı
 * @returns {Array} Yanlış seçenekler dizisi
 */
export const generateWrongOptions = (correctAnswer, count = 3) => {
  const wrongOptions = [];
  const usedNumbers = new Set([correctAnswer]);

  while (wrongOptions.length < count) {
    // Doğru cevaba yakın yanlış cevaplar üret
    const deviation = getRandomNumber(1, Math.max(5, Math.floor(correctAnswer * 0.3)));
    const isPositive = Math.random() > 0.5;
    
    const wrongAnswer = isPositive 
      ? correctAnswer + deviation 
      : Math.max(1, correctAnswer - deviation);

    if (!usedNumbers.has(wrongAnswer)) {
      wrongOptions.push(wrongAnswer);
      usedNumbers.add(wrongAnswer);
    }
  }

  return wrongOptions;
};

/**
 * Seçenekleri karıştırır (Fisher-Yates algoritması)
 * @param {Array} options - Karıştırılacak seçenekler
 * @returns {Array} Karıştırılmış seçenekler
 */
export const shuffleArray = (options) => {
  const shuffled = [...options];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

/**
 * Matematik sorusu için tüm seçenekleri oluşturur
 * @param {number} correctAnswer - Doğru cevap
 * @param {number} totalOptions - Toplam seçenek sayısı
 * @returns {Array} Karıştırılmış seçenekler
 */
export const createQuestionOptions = (correctAnswer, totalOptions = 4) => {
  const wrongCount = totalOptions - 1;
  const wrongOptions = generateWrongOptions(correctAnswer, wrongCount);
  const allOptions = [correctAnswer, ...wrongOptions];
  
  return shuffleArray(allOptions);
};

/**
 * İşlem sembolünü matematiksel sembole çevirir
 * @param {string} operation - İşlem sembolü
 * @returns {string} Matematiksel sembol
 */
export const getDisplaySymbol = (operation) => {
  const symbolMap = {
    '*': '×',
    '/': '÷',
    '÷': '÷',
    '−': '−',
    '+': '+',
  };
  
  return symbolMap[operation] || operation;
}; 