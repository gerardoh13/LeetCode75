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

// 1431. Kids With the Greatest Number of Candies

function kidsWithCandies(candies, extraCandies) {
  let max = Math.max(...candies);
  let res = [];
  for (let i = 0; i < candies.length; i++) {
    res.push(candies[i] + extraCandies >= max);
  }
  return res;
}

// 345. Reverse Vowels of a String

function reverseVowels(s) {
  s = s.split("");
  let i = 0;
  let j = s.length - 1;
  debugger;
  while (i <= j) {
    while (i < j && !vowelTest(s[i])) i++;
    while (i < j && !vowelTest(s[j])) j--;
    [s[i], s[j]] = [s[j], s[i]];
    i++;
    j--;
  }
  return s.join("");
}

function vowelTest(s) {
  return /^[aeiou]$/i.test(s);
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

// 374. Guess Number Higher or Lower

function guessNumber(n) {
  let start = 1;
  let end = n;
  if (n === start) return n;
  while (true) {
    let mid = Math.floor((start + end) / 2);
    let currGuess = guess(mid);
    if (!currGuess) return mid;
    else if (currGuess === -1) end = mid - 1;
    else if (currGuess === 1) start = mid + 1;
  }
}

// 724. Find Pivot Index

function pivotIndex(arr) {
  let leftSum = 0;
  let rightSum = 0;
  for (let i = arr.length - 1; i > 0; i--) {
    rightSum += arr[i];
  }
  for (let j = 0; j < arr.length; j++) {
    if (leftSum === rightSum) return j;
    leftSum += arr[j];
    if (arr[j + 2] === undefined) rightSum = 0;
    else rightSum -= arr[j + 1];
  }
  return -1;
}

// 605. Can Place Flowers

function canPlaceFlowers(flowerbed, n) {
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i - 1] != 1 && flowerbed[i] === 0 && flowerbed[i + 1] != 1) {
      flowerbed[i] = 1;
      n--;
      if (n <= 0) return true;
    }
  }
  return n <= 0;
}

// 746. Min Cost Climbing Stairs

function minCostClimbingStairs(cost) {
  for (let i = cost.length - 3; i >= 0; i--) {
    cost[i] += Math.min(cost[i + 1], cost[i + 2]);
  }
  console.log(cost);
  return Math.min(cost[0], cost[1]);
}

// 1137. N-th Tribonacci Number

function tribonacci(n) {
  let t = [1, 1, 2];
  if (n < 4) return t[n - 1];
  n = n - 3;
  while (n > 0) {
    const sum = t.reduce((prev, curr) => prev + curr, 0);
    t.shift();
    t.push(sum);
    n--;
  }
  return t[2];
}

// 151. Reverse Words in a String

function reverseWords(s) {
  s = s.replace(/\s+/g, " ").trim();
  return s.split(" ").reverse().join(" ");
}

// 238. Product of Array Except Self

function productExceptSelf(nums) {
  let res = new Array(nums.length).fill(1);
  let product = 1;
  for (let i = 0; i < nums.length; i++) {
    res[i] *= product;
    product *= nums[i];
  }
  product = 1;
  for (let j = nums.length - 1; j >= 0; j--) {
    res[j] *= product;
    product *= nums[j];
  }
  return res;
}

// 283. Move Zeroes

function moveZeroes(nums) {
  let i = 0;
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== 0) {
      nums[i] = nums[j];
      i++;
    }
  }
  while (i < nums.length) {
    nums[i] = 0;
    i++;
  }
}
