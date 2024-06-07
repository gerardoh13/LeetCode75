// 3110. Score of a String

function scoreOfString(s) {
  let res = 0;
  for (let i = 1; i < s.length; i++) {
    res += Math.abs(s.charCodeAt(i) - s.charCodeAt(i - 1));
  }
  return res;
}

// 344. Reverse String

function reverseString(s) {
  if (!s) return s;
  let i = 0;
  let j = s.length - 1;
  while (i <= j) {
    [s[i], s[j]] = [s[j], s[i]];
    i++;
    j--;
  }
}

// 2486. Append Characters to String to Make Subsequence

function appendCharacters(s, t) {
  let i = 0,
    j = 0;
  while (i < s.length) {
    if (s[i] === t[j]) j++;
    i++;
  }
  return t.length - j;
}

// 409. Longest Palindrome

function longestPalindrome(s) {
  let ltrs = new Set();
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    if (ltrs.has(s[i])) {
      ltrs.delete(s[i]);
      res += 2;
    } else ltrs.add(s[i]);
  }
  if (ltrs.size) res++;
  return res;
}

// 1002. Find Common Characters

function commonChars(words) {
  let map = new Map();
  for (let char of words[0]) {
    map.set(char, map.get(char) + 1 || 1);
  }
  for (let i = 1; i < words.length; i++) {
    let freq = new Map();
    for (let char of words[i]) {
      if (map.has(char)) freq.set(char, freq.get(char) + 1 || 1);
    }
    map.forEach((count, char) => {
      if (freq.has(char)) map.set(char, Math.min(count, freq.get(char)));
      else map.delete(char);
    });
  }
  let res = [];
  map.forEach((count, char) => {
    for (let i = 0; i < count; i++) {
      res.push(char);
    }
  });
  return res;
}

// 846. Hand of Straights

function isNStraightHand(hand, groupSize) {
  if (hand.length % groupSize) return false;
  hand.sort((a, b) => b - a);
  while (hand.length) {
    let i = hand.length - 1;
    if (hand[i] === null) {
      hand.pop();
      continue;
    }
    let cur = hand.pop();
    let count = 1;
    i--;
    while (count < groupSize) {
      if (hand[i] === undefined) return false;
      if (hand[i] === cur + 1) {
        if (i === hand.length - 1) cur = hand.pop();
        else {
          cur = hand[i];
          hand[i] = null;
        }
        count++;
      }
      i--;
    }
  }
  return true;
}

// 648. Replace Words

function replaceWords(dictionary, sentence) {
  let map = new Map();
  let lenMap = new Map();
  sentence = sentence.split(" ");
  for (let word of dictionary) {
    if (map.has(word[0])) {
      map.get(word[0]).add(word);
      lenMap.set(word[0], Math.max(word.length, lenMap.get(word[0])));
    } else {
      map.set(word[0], new Set().add(word));
      lenMap.set(word[0], word.length);
    }
  }
  for (let i = 0; i < sentence.length; i++) {
    if (map.has(sentence[i][0])) {
      let maxLen = lenMap.get(sentence[i][0]);
      for (let j = 1; j <= maxLen; j++) {
        if (map.get(sentence[i][0]).has(sentence[i].substring(0, j))) {
          sentence[i] = sentence[i].substring(0, j);
          break;
        }
      }
    }
  }
  return sentence.join(" ");
}
