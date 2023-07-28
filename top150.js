// 80. Remove Duplicates from Sorted Array II

function removeDuplicates(nums) {
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
