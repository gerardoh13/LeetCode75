// 80. Remove Duplicates from Sorted Array II

function removeDuplicates2(nums) {
  for (let i = 0; i < nums.length; i++) {
    let j = i;
    while (nums[i] === nums[j]) j++;
    if (j - i >= 3) nums.splice(i, j - i - 2);
  }
  return nums.length;
}

// 26. Remove Duplicates from Sorted Array

function removeDuplicates(nums) {
  let i = 0;
  let j = 1;
  while (j < nums.length) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    } else j++;
  }
  return i + 1;
}

// 125. Valid Palindrome

function isPalindrome(s) {
  s = s.replace(/[^a-z0-9]/gi, "").toLowerCase();
  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    if (s[i] !== s[j]) return false;
    i++;
    j--;
  }
  return true;
}

// 27. Remove Element

function removeElement(nums, val) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
}

// 88. Merge Sorted Array

function merge(nums1, m, nums2, n) {
  c = 0;
  for (let i = 0; i < m; i++) {
    nums1[i] = nums1[i];
    c++;
  }
  for (let j = 0; j < n; j++) {
    nums1[c] = nums2[j];
    c++;
  }
  nums1 = nums1.sort((a, b) => a - b);
}

// 54. Spiral Matrix

function spiralOrder(matrix) {
  if (matrix[0].length === 1) return matrix.flat();
  let maxLength = matrix.length * matrix[0].length;
  let res = [];
  while (matrix.length) {
    res = [...res, ...matrix.shift()];
    if (!matrix.length || res.length > maxLength) break;
    res = [...res, ...matrix.map((row) => row.pop())];
    if (!matrix.length || res.length > maxLength) break;
    res = [...res, ...matrix.pop().reverse()];
    if (!matrix.length || res.length > maxLength) break;
    res = [...res, ...matrix.map((row) => row.shift()).reverse()];
    if (!matrix.length || res.length > maxLength) break;
  }
  return res.slice(0, maxLength);
}

// explanation

// original matrix
// let a = [[1,  2,  3,  4],
//          [12, 13, 14, 5],
//          [11, 16, 15, 6],
//          [10, 9,  8,  7]];

// shift() removes the first array of matrix
// let b = [[12, 13, 14, 5],
//          [11, 16, 15, 6],
//          [10, 9,  8,  7]];

// use map() and pop() to remove the last number of each array
// let c = [[12, 13, 14],
//          [11, 16, 15],
//          [10, 9,  8]];

// use pop() and reverse() to remove the last array of matrix
// let d = [[12, 13, 14],
//          [11, 16, 15]];

// use map() and shift() to remove the first number of each array
// let e = [[13, 14],
//          [16, 15]];

// repeat process
// let f = [[16, 15]]

// let g = [[16]]

// res = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// 169. Majority Element

function majorityElement(nums) {
  let res = nums[0];
  let freq = { [res]: 1 };
  for (let i = 1; i < nums.length; i++) {
    freq[nums[i]] = freq[nums[i]] + 1 || 1;
    if (freq[nums[i]] > freq[res]) res = nums[i];
  }
  return res;
}

// 380. Insert Delete GetRandom O(1)

class RandomizedSet {
  constructor() {
    this.rs = new Set();
  }
  /**
   * @param {number} val
   * @return {boolean}
   */
  insert(val) {
    let size = this.rs.size;
    this.rs.add(val);
    return this.rs.size > size;
  }
  /**
   * @param {number} val
   * @return {boolean}
   */
  remove(val) {
    return this.rs.delete(val);
  }
  /**
   * @return {number}
   */
  getRandom(val) {
    let nums = Array.from(this.rs);
    return nums[Math.floor(Math.random() * nums.length)];
  }
}

// 383. Ransom Note

function canConstruct(ransomNote, magazine) {
  let freq1 = freqCounter(ransomNote);
  let freq2 = freqCounter(magazine);
  for (let key in freq1) {
    if (!freq2[key]) return false;
    if (freq1[key] > freq2[key]) return false;
  }
  return true;
}

function freqCounter(str) {
  let obj = {};
  for (let char of str) {
    obj[char] = obj[char] + 1 || 1;
  }
  return obj;
}

// 1. Two Sum

function twoSum(nums, target) {
  let obj = {};
  for (let i = 0; i < nums.length; i++) {
    let targetVal = target - nums[i];
    if (obj[targetVal] !== undefined) return [obj[targetVal], i];
    obj[nums[i]] = i;
  }
}

// 189. Rotate Array

function rotate(nums, k) {
  if (nums.length === 2) {
    if (k % 2 === 0) return nums;
    else return nums.reverse();
  }
  let left = nums.splice(nums.length - k, k);
  nums.splice(0, 0, ...left);
}

// 42. Valid Anagram

function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  let freq1 = freqCounter(s);
  let freq2 = freqCounter(t);
  for (let key in freq1) {
    if (!freq2[key]) return false;
    if (freq1[key] !== freq2[key]) return false;
  }
  return true;
}

function freqCounter(str) {
  let obj = {};
  for (let char of str) {
    obj[char] = obj[char] + 1 || 1;
  }
  return obj;
}
