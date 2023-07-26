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
