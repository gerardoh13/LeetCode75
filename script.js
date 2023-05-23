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

// 334. Increasing Triplet Subsequence

function increasingTriplet(nums) {
  let i = Infinity;
  let j = Infinity;
  debugger;
  for (let idx = 0; idx < nums.length; idx++) {
    if (nums[idx] <= i) i = nums[idx];
    else if (nums[idx] <= j) j = nums[idx];
    else return true;
  }
  return false;
}

// 1207. Unique Number of Occurrences

function uniqueOccurrences(arr) {
  let freq = {};
  for (let num of arr) {
    freq[num] = freq[num] + 1 || 1;
  }
  let countArr = Object.values(freq);
  let countSet = new Set(countArr);
  return countArr.length === countSet.size;
}

// 206. Reverse Linked List

function reverseList(head) {
  if (!head) return head;
  let vals = [];
  let curr = head;
  while (curr.next) {
    vals.push(curr.val);
    curr = curr.next;
  }
  vals.push(curr.val);
  curr = head;
  while (curr.next) {
    curr.val = vals.pop();
    curr = curr.next;
  }
  curr.val = vals.pop();
  return head;
}

// 700. Search in a Binary Search Tree

function searchBST(root, val) {
  let curr = root;
  while (curr) {
    if (curr.val === val) return curr;
    else curr = curr.val < val ? curr.right : curr.left;
  }
  return null;
}
