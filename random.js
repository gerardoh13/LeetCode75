// 15. 3Sum
function threeSum(nums) {
  let res = [];
  if (nums.length === 3 && nums.reduce((a, c) => a + c, 0) === 0) return [nums];
  nums.sort((a, b) => a - b);
  let i = 0;
  while (i < nums.length - 2) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) {
      i++;
      continue;
    }
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      let sum = nums[i] + nums[l] + nums[r];
      if (sum < 0) l++;
      else if (sum > 0) r--;
      else {
        res.push([nums[i], nums[l], nums[r]]);
        let lastL = nums[l];
        let lastR = nums[r];
        while (l < r && nums[l] === lastL) l++;
        while (l < r && nums[r] === lastR) r--;
      }
    }
    i++;
  }
  return res;
}

// 258. Add Digits
function addDigits(num) {
  while (num > 10) {
    let str = num.toString();
    num = str.split("").reduce((a, p) => +a + +p);
  }
  return num;
}

// 202. Happy Number
function isHappy(n) {
  if (n === 1) return true;
  let set = new Set();
  let str = n.toString();
  while (true) {
    if (str.length === 1) str += "0";
    n = 0;
    for (let char of str.split("")) {
      n += (+char) ** 2;
    }
    str = n.toString();
    if (set.has(n)) return false;
    if (str.length === 1) str += "0";
    if (str.split("").reduce((a, p) => +a + +p) === 1) return true;
    else set.add(n);
  }
}

// 3. Longest Substring Without Repeating Characters
function lengthOfLongestSubstring(s) {
  let res = 0;
  let sb = "";
  for (let i = 0; i < s.length; i++) {
    if (!sb.includes(s[i])) {
      sb = sb + s[i];
    } else {
      res = Math.max(res, sb.length);
      let index = sb.indexOf(s[i]);
      sb = sb.slice(index + 1, sb.length) + s[i];
    }
  }
  res = Math.max(res, sb.length);
  return res;
}

// 7. Reverse Integer
// not optimal answer
function reverse(x) {
  let neg = x < 0;
  let s = x.toString().split("").reverse().join("");
  if (neg) s = s.slice(0, s.length - 1);
  let res = neg ? +s * -1 : +s;
  if (Math.abs(res) > Math.pow(2, 31)) return 0;

  return res;
}

// 6. Zigzag Conversion

function convert(s, numRows) {
  if (numRows === 1) return s;
  let arrs = Array(numRows).fill("");
  let j = 0;
  let down = true;
  for (let i = 0; i < s.length; i++) {
    arrs[j] += s[i];
    if (down) {
      j++;
      if (j === numRows - 1) down = false;
    } else {
      j--;
      if (j === 0) down = true;
    }
  }
  let res = "";
  for (let str of arrs) {
    res += str;
  }
  return res;
}

// 16. 3Sum Closest

function threeSumClosest(nums, target) {
  let res = nums[0] + nums[1] + nums[2];
  if (nums.length === 3) return nums.reduce((a, c) => a + c, 0);
  nums.sort((a, b) => a - b);
  let i = 0;
  while (i < nums.length - 2) {
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      let sum = nums[i] + nums[l] + nums[r];
      if (Math.abs(sum - target) < Math.abs(res - target)) {
        res = sum;
      }
      if (sum < target) l++;
      else if (sum > target) r--;
      else {
        return sum;
      }
    }
    i++;
  }
  return res;
}

// 19. Remove Nth Node From End of List

function removeNthFromEnd(head, n) {
  let i = head;
  let j = head.next;
  let steps = n - 1;
  if (!head.next) return null;
  if (n > 1) {
    while (j.next && steps > 0) {
      j = j.next;
      steps--;
    }
  }
  while (j && j.next) {
    i = i.next;
    j = j.next;
  }
  if (steps > 0) return i.next;
  i.next = i.next.next;
  return head;
}

// 24. Swap Nodes in Pairs

function swapPairs(head) {
  if (!head) return null;
  if (!head.next) return head;
  let i = head;
  let j = head.next;
  i.next = j.next;
  j.next = i;
  head = j;
  while (j && i) {
    if (j.next && i.next && j.next && i.next.next) {
      j = i.next;
    } else break;
    i.next = j.next;
    j.next = j.next.next;
    i = i.next;
    i.next = j;
    j = j.next;
    i = i.next;
  }
  return head;
}

// 501. Find Mode in Binary Search Tree

function findMode(root) {
  if (!root) return;
  let freq = {};
  let mode = [root.val, 1];
  function dfs(node) {
    if (!node) return;
    freq[node.val] = freq[node.val] + 1 || 1;
    if (freq[node.val] > mode[1]) {
      mode[0] = node.val;
      mode[1] = freq[node.val];
    }
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  let res = [];
  for (let k in freq) {
    if (freq[k] === mode[1]) res.push(+k);
  }
  return res;
}

// 2910. Minimum Number of Groups to Create a Valid Assignment

// function minGroupsForValidAssignment(balls) {
//   let freq = {};
//   for (let num of balls) {
//     freq[num] = freq[num] + 1 || 1;
//   }
//   let values = Object.values(freq).sort((a, b) => a - b);
//   let target = values[0] + 1;
//   let extra = 0;
//   debugger;
//   for (let i = 1; i < values.length; i++) {
//     if (values[i] > target) extra += Math.ceil(values[i] / target) - 1;
//   }
//   return values.length + extra;
// }

// let balls = [1,1,3,3,1,1,2,2,3,1,3,2]
// minGroupsForValidAssignment(balls);

function makeChange(V) {
  if (V < 0) {
    console.log("Invalid input: Amount cannot be negative.");
    return;
  }
  if (V === 0) {
    console.log("No coins needed.");
    return;
  }
  const coins = [25, 10, 5, 1];
  const result = {};
  let totalCoins = 0;
  for (let coin of coins) {
    if (V >= coin) {
      let count = Math.floor(V / coin);
      result[coin] = count;
      totalCoins += count;
      // V %= coin;
      V -= count * coin;
    }
  }
  for (let [coin, count] of Object.entries(result)) {
    console.log(`${coin}c: ${count}`);
  }
  console.log(`Total coins: ${totalCoins}`);
}

function freqCounter(str) {
  let strObj = {};
  for (let char of str) {
    strObj[char] = (strObj[char] ?? 0) + 1;
  }
  return strObj;
}

// function groupAnagrams(words) {
//   const map = new Map();

//   for (const word of words) {
//     const sortedWord = [...word].sort().join("");
//     if (!map.has(sortedWord)) {
//       map.set(sortedWord, []);
//     }
//     map.get(sortedWord).push(word);
//   }
//   return Array.from(map.values());
// }

// Input: strs = ["act","pots","tops","cat","stop","hat"]

// Output: [["hat"],["act", "cat"],["stop", "pots", "tops"]]

function groupAnagrams(strs) {
  const res = {};
  for (let s of strs) {
    const count = new Array(26).fill(0);
    for (let c of s) {
      count[c.charCodeAt(0) - "a".charCodeAt(0)] += 1;
    }
    const key = count.join(",");
    if (!res[key]) {
      res[key] = [];
    }
    res[key].push(s);
  }
  return Object.values(res);
}

function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

function titleCase(str) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

function longestConsecutive(nums) {
  let numSet = new Set();
  let longestLength = 0;
  for (let i = 0; i < nums.length; i++) {
    numSet.add(nums[i]);
  }

  for (let num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let count = 1;
      while (numSet.has(currentNum + 1)) {
        count++;
        currentNum = currentNum + 1;
      }

      longestLength = Math.max(longestLength, count);
    }
  }

  return longestLength;
}

// 31. Next Permutation
function nextPermutation(nums) {
  if (nums.length < 2) return nums;

  let i = nums.length - 2;
  let j = i + 1;
  debugger;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;

  if (i >= 0) {
    while (nums[j] <= nums[i]) {
      j--;
    }
    swap(nums, i, j);
  }
  let l = i + 1;
  let r = nums.length - 1;
  while (l < r) {
    swap(nums, l, r);
    l++;
    r--;
  }
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// 39. Combination Sum

function combinationSum(candidates, target) {
  const res = [];
  function backtrack(start, path, remaining) {
    if (remaining === 0) {
      res.push([...path]);
      return;
    }
    if (remaining < 0) return;

    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      backtrack(i, path, remaining - candidates[i]);
      path.pop();
    }
  }
  backtrack(0, [], target);
  return res;
}

// 46. Permutations
function permute(nums) {
  const res = [];
  debugger;
  function backtrack(start) {
    if (start === nums.length) {
      res.push([...nums]);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      swap(nums, start, i);
      backtrack(start + 1);
      swap(nums, start, i);
    }
  }
  backtrack(0);
  return res;
}

// 594. Longest Harmonious Subsequence

function findLHS(nums) {
  nums.sort((a, b) => a - b);
  let [max, i, j] = [0, 0, 1];
  while (j < nums.length) {
    if (nums[j] - nums[i] === 1) {
      let count = j - i + 1;
      max = Math.max(count, max);
      j++;
    } else if (nums[j] - nums[i] > 1) {
      i++;
    } else {
      j++;
    }
  }
  return max;
}

// 94. Binary Tree Inorder Traversal
function inorderTraversal(root) {
  let res = [];
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    res.push(node.val);
    dfs(node.right);
  }
  dfs(root);
  return res;
}

// 3304. Find the Kth Largest Element in an Array
function kthCharacter(k) {
  let word = "a";
  const dict = {
    a: "b",
    b: "c",
    c: "d",
    d: "e",
    e: "f",
    f: "g",
    g: "h",
    h: "i",
    i: "j",
    j: "k",
    k: "l",
    l: "m",
    m: "n",
    n: "o",
    o: "p",
    p: "q",
    q: "r",
    r: "s",
    s: "t",
    t: "u",
    u: "v",
    v: "w",
    w: "x",
    y: "z",
    z: "a",
  };
  while (word.length < k) {
    for (let char of word) {
      word += dict[char];
      if (word.length >= k) break;
    }
  }
  return word[k - 1];
}
