// 1768. Merge Strings Alternately

function mergeAlternately(word1, word2) {
  let res = "";
  let i = 0;
  let j = 0;
  while (i < word1.length && j < word2.length) {
    res += word1[i];
    res += word2[j];
    i++;
    j++;
  }
  while (i < word1.length) {
    res += word1[i];
    i++;
  }
  while (j < word2.length) {
    res += word2[j];
    j++;
  }
  return res;
}
// 1732. Find the Highest Altitude

function largestAltitude(gain) {
  let g = 0;
  let res = 0;
  for (let i = 0; i < gain.length; i++) {
    g += gain[i];
    if (g > res) res = g;
  }
  return res;
}

// 2215. Find the Difference of Two Arrays

function findDifference(nums1, nums2) {
  let setOne = new Set(nums1);
  let setTwo = new Set(nums2);
  let res = [[]];
  setOne.forEach((n) => {
    if (setTwo.has(n)) setTwo.delete(n);
    else res[0].push(n);
  });
  res[1] = setTwo.size ? Array.from(setTwo) : [];
  return res;
}
