const LETTER_POOL = {
  'A': 9,
  'B': 2,
  'C': 2,
  'D': 4,
  'E': 12,
  'F': 2,
  'G': 3,
  'H': 2,
  'I': 9,
  'J': 1,
  'K': 1,
  'L': 4,
  'M': 2,
  'N': 6,
  'O': 8,
  'P': 2,
  'Q': 1,
  'R': 6,
  'S': 4,
  'T': 6,
  'U': 4,
  'V': 2,
  'W': 2,
  'X': 1,
  'Y': 2,
  'Z': 1
};

const HAND_SIZE = 10;

const makeDrawPile = () => {
  const drawPile = [];

  for (const [letter, count] of Object.entries(LETTER_POOL)) {
    const lettersToAdd = Array(count).fill(letter);
    drawPile.push(...lettersToAdd);
  }
  return drawPile;
};

export const drawLetters = () => {
  const newPile = makeDrawPile();
  const hand = [];

  for (let i = 0; i < HAND_SIZE; i++) {
    hand.push(...newPile.splice(Math.floor(Math.random() * newPile.length), 1));
  }
  return hand;
};

const countLetter = (input, letter) => {
  let count = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === letter) {
      count++;
    }
  }
  return count;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  if (input === '') {
    return false;
  }

  const upperCaseWord = input.toUpperCase();
  for (const letter of upperCaseWord) {
    if (countLetter(upperCaseWord, letter) > countLetter(lettersInHand, letter)) {
      return false;
    }
  }
  return true;
};

export const scoreWord = (word) => {
  const SCORE_CHART = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4,
    'I': 1, 'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3,
    'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8,
    'Y': 4, 'Z': 10
  };

  const BONUS_MIN_LENGTH = 7;
  const BONUS_POINTS = 8;

  let totalScore = 0;
  const upperCaseWord = word.toUpperCase();

  for (const letter of upperCaseWord) {
    if (letter in SCORE_CHART) {
      totalScore += SCORE_CHART[letter];
    }
  }

  if (word.length >= BONUS_MIN_LENGTH) {
    totalScore += BONUS_POINTS;
  }

  return totalScore;
};

export const highestScoreFrom = (words) => {
  const scoreList = [];

  for (const word of words) {
    const score = scoreWord(word);
    scoreList.push(score);
  }

  let winningScore = scoreList[0];
  for (const score of scoreList) {
    if (score > scoreList[0]) {
      winningScore = score;
    }
  }

  let i = 0;
  const highScoreWords = [];

  for (const score of scoreList) {
    if (score === winningScore) {
      highScoreWords.push(words[i]);
    }
    i++;
  }

  let fewestLetterWord = highScoreWords[0];
  for (const word of highScoreWords) {
    if (word.length < fewestLetterWord.length) {
      fewestLetterWord = word;
    }
  }

  const fewestLetterWords = [];
  for (const word of highScoreWords) {
    if (word.length === fewestLetterWord.length) {
      fewestLetterWords.push(word);
    }
  }

  const lengthTenWords = [];
  for (const word of highScoreWords) {
    if (word.length === 10) {
      lengthTenWords.push(word);
    }
  }

  let winningWord = '';
  if (lengthTenWords.length > 0) {
    winningWord = lengthTenWords[0];
  } else {
    winningWord = fewestLetterWords[0];
  }

  return {
    'word': winningWord,
    'score': winningScore
  };
};