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

// 1002. Find Common Characters

function commonChars(words) {
  let map = new Map();
  for (let char of words[0]) {
    map.set(char, map.get(char) + 1 || 1);
  }
  for (let i = 1; i < words.length; i++) {
    let freq = new Map();
    for (let char of words[i]) {
      if (map.has(char)) freq.set(char, freq.get(char) + 1 || 1);
    }
    map.forEach((count, char) => {
      if (freq.has(char)) map.set(char, Math.min(count, freq.get(char)));
      else map.delete(char);
    });
  }
  let res = [];
  map.forEach((count, char) => {
    for (let i = 0; i < count; i++) {
      res.push(char);
    }
  });
  return res;
}

// 846. Hand of Straights

function isNStraightHand(hand, groupSize) {
  if (hand.length % groupSize) return false;
  hand.sort((a, b) => b - a);
  while (hand.length) {
    let i = hand.length - 1;
    if (hand[i] === null) {
      hand.pop();
      continue;
    }
    let cur = hand.pop();
    let count = 1;
    i--;
    while (count < groupSize) {
      if (hand[i] === undefined) return false;
      if (hand[i] === cur + 1) {
        if (i === hand.length - 1) cur = hand.pop();
        else {
          cur = hand[i];
          hand[i] = null;
        }
        count++;
      }
      i--;
    }
  }
  return true;
}

// 648. Replace Words

function replaceWords(dictionary, sentence) {
  let map = new Map();
  let lenMap = new Map();
  sentence = sentence.split(" ");
  for (let word of dictionary) {
    if (map.has(word[0])) {
      map.get(word[0]).add(word);
      lenMap.set(word[0], Math.max(word.length, lenMap.get(word[0])));
    } else {
      map.set(word[0], new Set().add(word));
      lenMap.set(word[0], word.length);
    }
  }
  for (let i = 0; i < sentence.length; i++) {
    if (map.has(sentence[i][0])) {
      let maxLen = lenMap.get(sentence[i][0]);
      for (let j = 1; j <= maxLen; j++) {
        if (map.get(sentence[i][0]).has(sentence[i].substring(0, j))) {
          sentence[i] = sentence[i].substring(0, j);
          break;
        }
      }
    }
  }
  return sentence.join(" ");
}

// 523. Continuous Subarray Sum

function checkSubarraySum(nums, k) {
  let prefixMod = 0;
  let seen = new Map();
  seen.set(0, -1);
  for (let i = 0; i < nums.length; i++) {
    prefixMod = (prefixMod + nums[i]) % k;
    if (seen.has(prefixMod)) {
      if (i - seen.get(prefixMod) > 1) return true;
    } else seen.set(prefixMod, i);
  }
  return false;
}

// 974. Subarray Sums Divisible by K

function subarraysDivByK(nums, k) {
  let sums = Array(k).fill(0);
  let mod = (n, m) => ((n % m) + m) % m;
  let res = 0;
  prev = 0;
  for (let num of nums) {
    prev = mod(prev + num, k);
    if (prev === 0) res++;
    res += sums[prev];
    sums[prev]++;
  }
  return res;
}

// 1051. Height Checker

function heightChecker(heights) {
  let expected = [...heights].sort((a, b) => a - b);
  let res = 0;
  for (let i = 0; i < heights.length; i++) {
    if (expected[i] !== heights[i]) res++;
  }
  return res;
}

// 1122. Relative Sort Array

function relativeSortArray(arr1, arr2) {
  let map = new Map();
  for (let i = 0; i < arr2.length; i++) {
    map.set(arr2[i], i);
  }
  let res = Array(arr2.length)
    .fill()
    .map(() => new Array());
  let rest = [];
  for (let i = 0; i < arr1.length; i++) {
    if (!map.has(arr1[i])) rest.push(arr1[i]);
    else {
      res[map.get(arr1[i])].push(arr1[i]);
    }
  }
  return [...res.flat(), ...rest.sort((a, b) => a - b)];
}

// 75. Sort Colors

function sortColors(nums) {
  let l = 0,
    r = nums.length - 1;
  for (let i = 0; i < nums.length; i++) {
    if (!nums[i]) {
      [nums[l], nums[i]] = [nums[i], nums[l]];
      l++;
    }
    if (nums[i] === 2) {
      [nums[i], nums[r]] = [nums[r], nums[i]];
      r--;
      i--;
    }
    if (i >= r) break;
  }
  return nums;
}

// 2037. Minimum Number of Moves to Seat Everyone

function minMovesToSeat(seats, students) {
  seats.sort((a, b) => a - b);
  students.sort((a, b) => a - b);
  let res = 0;
  for (let i = 0; i < seats.length; i++) {
    res += Math.abs(seats[i] - students[i]);
  }
  return res;
}

// 945. Minimum Increment to Make Array Unique

function minIncrementForUnique(nums) {
  nums.sort((a, b) => a - b);
  let res = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= nums[i - 1]) {
      let steps = Math.abs(nums[i] - (nums[i - 1] + 1));
      nums[i] += steps;
      res += steps;
    }
  }
  return res;
}

// 502. IPO

function findMaximizedCapital(k, w, profits, capital) {
  let projects = [];
  let heap = new MaxHeap();
  for (let i = 0; i < profits.length; i++) {
    projects.push([profits[i], capital[i]]);
  }
  projects.sort((a, b) => a[1] - b[1]);
  let x = 0;
  while (projects[x] && projects[x][1] <= w) {
    heap.add(projects[x][0]);
    x++;
  }
  while (heap.values.length > 0 && k > 0) {
    w += heap.extractMax();
    k--;
    while (projects[x] && projects[x][1] <= w) {
      heap.add(projects[x][0]);
      x++;
    }
  }
  return w;
}

class MaxHeap {
  constructor() {
    this.values = [];
  }
  parent(index) {
    return Math.floor((index - 1) / 2);
  }
  leftChild(index) {
    return index * 2 + 1;
  }
  rightChild(index) {
    return index * 2 + 2;
  }
  isLeaf(index) {
    return (
      index >= Math.floor(this.values.length / 2) &&
      index <= this.values.length - 1
    );
  }
  swap(index1, index2) {
    [this.values[index1], this.values[index2]] = [
      this.values[index2],
      this.values[index1],
    ];
  }

  heapifyDown(index) {
    if (!this.isLeaf(index)) {
      let leftChildIndex = this.leftChild(index),
        rightChildIndex = this.rightChild(index),
        largestIndex = index;
      if (this.values[leftChildIndex] > this.values[largestIndex]) {
        largestIndex = leftChildIndex;
      }
      if (this.values[rightChildIndex] >= this.values[largestIndex]) {
        largestIndex = rightChildIndex;
      }
      if (largestIndex !== index) {
        this.swap(index, largestIndex);
        this.heapifyDown(largestIndex);
      }
    }
  }
  heapifyUp(index) {
    let currentIndex = index,
      parentIndex = this.parent(currentIndex);
    while (
      currentIndex > 0 &&
      this.values[currentIndex] > this.values[parentIndex]
    ) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = this.parent(parentIndex);
    }
  }
  add(element) {
    this.values.push(element);
    this.heapifyUp(this.values.length - 1);
  }
  extractMax() {
    if (this.values.length === 1) return this.values.pop();
    if (this.values.length < 1) return "heap is empty";
    const max = this.values[0];
    const end = this.values.pop();
    this.values[0] = end;
    this.heapifyDown(0);
    return max;
  }
}

// 330. Patching Array

function minPatches(nums, n) {
  let miss = 1;
  let result = 0;
  let i = 0;

  while (miss <= n) {
    if (i < nums.length && nums[i] <= miss) {
      miss += nums[i];
      i++;
    } else {
      miss += miss;
      result++;
    }
  }
  return result;
}

// 633. Sum of Square Numbers

function judgeSquareSum(c) {
  let b = Math.ceil(Math.sqrt(c));
  let a = 0;
  while (a <= b) {
    let prod = a * a + b * b;
    if (prod === c) return true;
    else if (prod > c) b--;
    else a++;
  }
  return false;
}

// 826. Most Profit Assigning Work

function maxProfitAssignment(difficulty, profit, worker) {
  let ans = 0;
  let jobs = [];
  for (let i = 0; i < difficulty.length; i++) {
    jobs.push([difficulty[i], profit[i]]);
  }
  jobs.sort((a, b) => a[0] - b[0]);
  worker.sort((a, b) => a - b);
  let j = 0;
  let maxProfit = 0;
  for (let i = 0; i < worker.length; i++) {
    while (j < jobs.length && jobs[j][0] <= worker[i]) {
      maxProfit = Math.max(maxProfit, jobs[j][1]);
      j++;
    }
    ans += maxProfit;
  }
  return ans;
}