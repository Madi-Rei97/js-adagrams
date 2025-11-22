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
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
