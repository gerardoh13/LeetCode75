// 3110. Score of a String

function scoreOfString(s) {
  let res = 0;
  for (let i = 1; i < s.length; i++) {
    res += Math.abs(s.charCodeAt(i) - s.charCodeAt(i - 1));
  }
  return res;
}
