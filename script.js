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

// 11. Container With Most Water

function maxArea(height) {
  let i = 0;
  let j = height.length - 1;
  let max = 0;
  debugger;
  while (i < j) {
    let area = Math.min(height[i], height[j]) * (j - i);
    if (area > max) max = area;
    if (height[i] < height[j]) {
      i++;
    } else j--;
  }
  return max;
}

// 933. Number of Recent Calls

var RecentCounter = function () {
  this.q = [];
};

RecentCounter.prototype.ping = function (t) {
  this.q.push(t);
  while (this.q[0] < t - 3000) {
    this.q.shift();
  }

  return this.q.length;
};

// 2390. Removing Stars From a String

function removeStars(s) {
  let res = [];
  debugger;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== "*") res.push(s[i]);
    else res.pop();
  }
  return res.join("");
}

// 198. House Robber

function rob(nums) {
  if (nums.length <= 2) return Math.max(...nums);
  let [maxOne, maxTwo] = [Math.max(nums[0], nums[1]), nums[0]];
  for (let i = 2; i < nums.length; i++) {
    let curr = Math.max(nums[i] + maxTwo, maxOne);
    maxTwo = maxOne;
    maxOne = curr;
  }
  return maxOne;
}

// 1679. Max Number of K-Sum Pairs

function maxOperations(nums, k) {
  let res = 0;
  let freq = {};
  for (let num of nums) {
    if (num < k) freq[num] = freq[num] + 1 || 1;
  }
  if (k % 2 === 0 && freq[k / 2]) {
    res += Math.floor(freq[k / 2] / 2);
    delete freq[k / 2];
  }
  for (let val in freq) {
    if (freq[k - val]) {
      res += Math.min(freq[val], freq[k - val]);
      delete freq[val];
    }
  }
  return res;
}

// 1004. Max Consecutive Ones III

function longestOnes(nums, k) {
  let j = 0;
  for (let num of nums) {
    if (!num) k--;
    if (k < 0) {
      if (!nums[j]) k++;
      j++;
    }
  }
  return nums.length - j;
}

// 643. Maximum Average Subarray I

function findMaxAverage(nums, k) {
  let res = -Infinity;
  let j = k;
  let curr = 0;
  for (let i = 0; i < nums.length; i++) {
    if (k) {
      k--;
      curr += nums[i];
    } else {
      if (curr > res) res = curr;
      curr += nums[i];
      curr -= nums[i - j];
    }
  }
  if (curr > res) res = curr;
  return res / k;
}

// 1493. Longest Subarray of 1's After Deleting One Element

function longestSubarray(nums) {
  let j = 0;
  let k = 1;
  for (let num of nums) {
    if (!num) k--;
    if (k < 0) {
      if (!nums[j]) k++;
      j++;
    }
  }
  return nums.length - (j + 1);
}

// 338. Counting Bits

function countBits(n) {
  if (!n) return [0];
  let res = [0, 1];
  for (let i = 2; i <= n; i++) {
    let binary = i.toString(2);
    binary = binary.replaceAll("0", "");
    res.push(binary.length ? binary.length : 0);
  }
  return res;
}

// 136. Single Number

function singleNumber(nums) {
  if (nums.length === 1) return nums[0];
  let obj = {};
  for (let num of nums) {
    if (obj[num]) delete obj[num];
    else obj[num] = 1;
  }
  let res = Object.keys(obj)[0];
  return parseInt(res);
}

// 104. Maximum Depth of Binary Tree

function maxDepth(root) {
  if (!root) return 0;
  function recursion(node) {
    if (!node.right && !node.left) return 1;
    if (!node.right) return recursion(node.left) + 1;
    if (!node.left) return recursion(node.right) + 1;
    return Math.max(recursion(node.right), recursion(node.left)) + 1;
  }
  return recursion(root);
}

// 328. Odd Even Linked List

function oddEvenList(head) {
  if (!head || !head.next) return head;
  let o = head;
  let e = o.next;
  let fe = e;
  while (e && e.next) {
    o.next = e.next;
    o = o.next;
    e.next = o.next;
    e = e.next;
  }
  o.next = fe;
  return head;
}

// 1456. Maximum Number of Vowels in a Substring of Given Length

function maxVowels(s, k) {
  let v = new Set(["a", "e", "i", "o", "u"]);
  let res = 0;
  let i = 0;
  let j = 0;
  let m = new Map();
  while (k > 0) {
    if (v.has(s[j])) m.set(j, s[j]);
    j++;
    k--;
  }
  while (j < s.length) {
    res = Math.max(res, m.size);
    if (v.has(s[j])) m.set(j, s[j]);
    m.delete(i);
    i++;
    j++;
  }
  return m;
}

//

// function gcdOfStrings(str1, str2){
//   let res = ""
//   if (str1[0] !== str2[0]) return res

// }

// console.log(gcdOfStrings("ABCABC", "ABC"))

// 443. String Compression

function compress(chars) {
  if (!chars.length) return 0;
  let j = 0;
  let curr = chars[0];
  let count = 1;
  for (let i = 1; i <= chars.length; i++) {
    if (chars[i] === curr) count++;
    else {
      chars[j] = curr;
      if (count > 1) {
        const s = count.toString();
        for (let k = 0; k < s.length; k++) {
          chars[++j] = s[k];
        }
      }
      j++;
      curr = chars[i];
      count = 1;
    }
  }
  return j;
}

// 1657. Determine if Two Strings Are Close

function closeStrings(word1, word2) {
  if (word1.length !== word2.length) return false;
  let [vals1, keys1] = freqCounter(word1);
  let [vals2, keys2] = freqCounter(word2);
  let valsEq = vals1 === vals2;
  let keysEq = keys1 === keys2;
  return valsEq && keysEq;
}

function freqCounter(str) {
  let freq = {};
  for (let char of str) {
    freq[char] = freq[char] + 1 || 1;
  }
  let vals = Object.values(freq).sort().join("");
  let keys = Object.keys(freq).sort().join("");
  return [vals, keys];
}
