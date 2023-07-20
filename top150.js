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
