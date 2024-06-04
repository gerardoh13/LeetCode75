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
