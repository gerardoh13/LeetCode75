class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 2022. Convert 1D Array Into 2D Array

function construct2DArray(original, m, n) {
  let res = [];
  if (m * n !== original.length) return res;
  if (m == 1) return [original];
  let i = 0;
  while (i < original.length) {
    let arr = [];
    let count = 0;
    while (count < n) {
      arr.push(original[i]);
      count++;
      i++;
    }
    count = 0;
    res.push(arr);
  }
  return res;
}

// 1894. Find the Student that Will Replace the Chalk

function chalkReplacer(chalk, k) {
  let n = chalk.length;
  let prefixSum = Array(n)
    .fill()
    .map(() => []);
  prefixSum[0] = chalk[0];
  for (let i = 1; i < n; i++) {
    prefixSum[i] = prefixSum[i - 1] + chalk[i];
  }
  let sumChalk = prefixSum[n - 1];
  remainingChalk = k % sumChalk;
  let low = 0;
  let high = n - 1;
  while (low < high) {
    let mid = low + Math.floor((high - low) / 2);
    if (prefixSum[mid] <= remainingChalk) low = mid + 1;
    else high = mid;
  }
  return high;
}

// 1945. Sum of Digits of String After Convert

function getLucky(s, k) {
  s = s
    .split("")
    .map((c) => (c.charCodeAt(0) - 96).toString())
    .join("");
  while (k) {
    s = s
      .split("")
      .reduce((p, c) => +p + +c, 0)
      .toString();
    k--;
  }
  return +s;
}

// 874. Walking Robot Simulation

function robotSim(commands, obstacles) {
  let pos = [0, 0];
  let dir = "n";
  let set = new Set(obstacles.map((arr) => `${arr[0]}-${arr[1]}`));
  let res = 0;
  for (let command of commands) {
    if (command === -1) {
      dir = dir == "n" ? "e" : dir == "e" ? "s" : dir == "s" ? "w" : "n";
    } else if (command === -2) {
      dir = dir == "n" ? "w" : dir == "w" ? "s" : dir == "s" ? "e" : "n";
    } else {
      for (let j = 0; j < command; j++) {
        let next = [...pos];
        if (dir == "n") next[1]++;
        else if (dir == "s") next[1]--;
        else if (dir == "w") next[0]--;
        else next[0]++;
        let nextStr = `${next[0]}-${next[1]}`;
        if (set.has(nextStr)) break;
        else pos = [...next];
      }
    }
    res = Math.max(res, pos[0] * pos[0] + pos[1] * pos[1]);
  }
  return res;
}

// 2028. Find Missing Observations

function missingRolls(rolls, mean, n) {
  let res = [];
  let mSum = rolls.reduce((p, c) => p + c, 0);
  let target = mean * (rolls.length + n) - mSum;
  if (target > n * 6 || target < n) return res;
  let targetAvg = Math.floor(target / n);
  let mod = target % n;
  let nArr = Array(n).fill(targetAvg);
  for (let i = 0; i < mod; i++) nArr[i]++;
  return nArr;
}

// 3217. Delete Nodes From Linked List Present in Array

function modifiedList(nums, head) {
  let set = new Set(nums);
  let dummy = new ListNode(0, head);
  let l = dummy;
  let r = head;
  debugger;
  while (r) {
    while (r && set.has(r.val)) {
      l.next = r.next;
      r = l.next;
    }
    if (r) {
      l = l.next;
      r = l.next;
    }
  }
  return dummy.next;
}

// 1367. Linked List in Binary Tree

function isSubPath(head, root) {
  function traverse(node) {
    if (!node) return false;
    if (node.val === head.val && helper(node, head)) return true;
    return traverse(node.left) || traverse(node.right);
  }
  function helper(treeNode, listNode) {
    if (!listNode) return true;
    if (!treeNode || treeNode.val !== listNode.val) return false;

    return (
      helper(treeNode.left, listNode.next) ||
      helper(treeNode.right, listNode.next)
    );
  }
  return traverse(root);
}

// 725. Split Linked List in Parts

function splitListToParts(head, k) {
  let len = 0;
  let curr = head;
  while (curr) {
    curr = curr.next;
    len++;
  }
  let mod = len % k;
  let base = Math.floor(len / k);
  curr = head;
  let partHead = head;
  let partTail = head;
  let res = Array(k).fill(null);
  for (let i = 0; i < k; i++) {
    if (!mod && !curr) continue;
    curr = curr.next;
    if (base) {
      for (let j = 0; j < base - 1; j++) {
        curr = curr.next;
        partTail = partTail.next;
      }
      if (mod) {
        curr = curr.next;
        partTail = partTail.next;
        mod--;
      }
    }
    res[i] = partHead;
    partHead = curr;
    partTail.next = null;
    partTail = curr;
    if (mod && !base) mod--;
  }
  return res;
}

// 2326. Spiral Matrix IV

function spiralMatrix(m, n, head) {
  let res = Array(m)
    .fill()
    .map(() => Array(n).fill(-1));
  let node = head;
  let top = 0;
  let right = n - 1;
  let bottom = m - 1;
  let left = 0;
  while (node) {
    for (let i = left; i <= right; i++) {
      res[top][i] = node.val;
      node = node.next;
      if (!node) return res;
    }
    top++;
    for (let i = top; i <= bottom; i++) {
      res[i][right] = node.val;
      node = node.next;
      if (!node) return res;
    }
    right--;
    for (let i = right; i >= left; i--) {
      res[bottom][i] = node.val;
      node = node.next;
      if (!node) return res;
    }
    bottom--;
    for (let i = bottom; i >= top; i--) {
      res[i][left] = node.val;
      node = node.next;
      if (!node) return res;
    }
    left++;
  }
  return res;
}

// 2807. Insert Greatest Common Divisors in Linked List

function insertGreatestCommonDivisors(head) {
  if (!head.next) return head;
  let [l, r] = [head, head.next];
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  while (r) {
    l.next = new ListNode(gcd(l.val, r.val), r);
    [l, r] = [r, r.next];
  }
  return head;
}

// 2220. Minimum Bit Flips to Convert Number

function minFlipBits(start, goal) {
  let xorRes = start ^ goal;
  let count = 0;
  while (xorRes > 0) {
    count += xorRes & 1;
    xorRes >>= 1;
  }
  return count;
}

// 1684. Count the Number of Consistent Strings

function countConsistentStrings(allowed, words) {
  let res = 0;
  let set = new Set(allowed);
  for (let word of words) {
    let consistent = true;
    for (let char of word) {
      if (!set.has(char)) {
        consistent = false;
        break;
      }
    }
    if (consistent) res++;
  }
  return res;
}

// 1310. XOR Queries of a Subarray

function was(arr, queries) {
  let xors = new Array(arr.length).fill(0);
  xors[0] = arr[0];
  for (let i = 1; i < arr.length; i++) {
    xors[i] = xors[i - 1] ^ arr[i];
  }
  let res = [];
  for (let query of queries) {
    let [L, R] = query;
    if (L === 0) res.push(xors[R]);
    else res.push(xors[L - 1] ^ xors[R]);
  }
  return res;
}

// 2419. Longest Subarray With Maximum Bitwise AND

function longestSubarray(nums) {
  let max = Math.max(...nums);
  let [res, count] = [0, 0];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === max) count++;
    else count = 0;
    res = Math.max(count, res);
  }
  return res;
}

// 1371. Find the Longest Substring Containing Vowels in Even Counts

function findTheLongestSubstring(s) {
  let [mask, maxLength] = [0, 0];
  let map = new Map();
  map.set(0, -1);

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "a") mask ^= 1 << 0;
    else if (s[i] === "e") mask ^= 1 << 1;
    else if (s[i] === "i") mask ^= 1 << 2;
    else if (s[i] === "o") mask ^= 1 << 3;
    else if (s[i] === "u") mask ^= 1 << 4;
    if (map.has(mask)) maxLength = Math.max(maxLength, i - map.get(mask));
    else map.set(mask, i);
  }
  return maxLength;
}

// 539. Minimum Time Difference

function findMinDifference(timePoints) {
  let res = 1441;
  let mins = timePoints.map((t) => +(t.slice(0, 2) * 60) + +t.slice(3));
  mins.sort((a, b) => a - b);
  for (let i = 0; i < mins.length - 1; i++)
    res = Math.min(res, mins[i + 1] - mins[i]);
  return Math.min(res, 1440 - mins[mins.length - 1] + mins[0]);
}

// 884. Uncommon Words from Two Sentences

function uncommonFromSentences(s1, s2) {
  let badSet = new Set();
  let goodSet = new Set();
  for (let word of s1.split(" ")) {
    if (badSet.has(word)) continue;
    if (goodSet.has(word)) {
      badSet.add(word);
      goodSet.delete(word);
    } else goodSet.add(word);
  }
  for (let word of s2.split(" ")) {
    if (badSet.has(word)) continue;
    if (goodSet.has(word)) {
      badSet.add(word);
      goodSet.delete(word);
    } else goodSet.add(word);
  }
  return Array.from(goodSet);
}

// 179. Largest Number

function largestNumber(nums) {
  let array = nums.map(String);
  array.sort((a, b) => (b + a).localeCompare(a + b));
  if (array[0] == "0") return "0";
  return array.join("");
}

// 241. Different Ways to Add Parentheses

function diffWaysToCompute(expression) {
  let res = [];
  for (let i = 0; i < expression.length; i++) {
    let oper = expression[i];
    if (oper === "+" || oper === "-" || oper === "*") {
      let s1 = diffWaysToCompute(expression.slice(0, i));
      let s2 = diffWaysToCompute(expression.slice(i + 1));
      for (let a of s1) {
        for (let b of s2) {
          if (oper === "+") res.push(a + b);
          else if (oper === "-") res.push(a - b);
          else if (oper === "*") res.push(a * b);
        }
      }
    }
  }
  if (res.length === 0) res.push(parseInt(expression));
  return res;
}

// 214. Shortest Palindrome

function was() {
  let count = kmp(s.split("").reverse().join(""), s);
  return s.slice(count).split("").reverse().join("") + s;
}

function kmp(txt, patt) {
  let newString = patt + "#" + txt;
  let pi = new Array(newString.length).fill(0);
  let i = 1,
    k = 0;
  while (i < newString.length) {
    if (newString[i] === newString[k]) {
      k++;
      pi[i] = k;
      i++;
    } else {
      if (k > 0) k = pi[k - 1];
      else {
        pi[i] = 0;
        i++;
      }
    }
  }
  return pi[newString.length - 1];
}

// 386. Lexicographical Numbers

function lexicalOrder(n) {
  let res = [];
  function helper(x) {
    if (x > n) return;
    res.push(x);
    x = x * 10;
    for (let i = 0; i < 10; i++) helper(x + i);
  }
  for (let i = 1; i < 10; i++) helper(i);
  return res;
}

//

function findKthNumber(n, k) {
  function getReqNum(a, b) {
    let gap = 0;
    while (a <= n) {
      gap += Math.min(n + 1, b) - a;
      a *= 10;
      b *= 10;
    }
    return gap;
  }
  let [num, i] = [1, 1];
  while (i < k) {
    let req = getReqNum(num, num + 1);
    if (i + req <= k) {
      i += req;
      num++;
    } else {
      i++;
      num *= 10;
    }
  }
  return num;
}

// 2707. Extra Characters in a String

function minExtraChar(s, dictionary) {
  const dictionarySet = new Set(dictionary);
  const memo = new Map();
  const dp = (start) => {
    if (start === s.length) return 0;
    if (memo.has(start)) return memo.get(start);
    let ans = dp(start + 1) + 1;
    for (let end = start; end < s.length; end++) {
      const curr = s.slice(start, end + 1);
      if (dictionarySet.has(curr)) ans = Math.min(ans, dp(end + 1));
    }
    memo.set(start, ans);
    return ans;
  };
  return dp(0);
}

// 3043. Find the Length of the Longest Common Prefix

function longestCommonPrefix(arr1, arr2) {
  let set = new Set();
  for (let num of arr1) {
    let str = num.toString();
    let prefix = "";
    for (let char of str) {
      prefix += char;
      set.add(prefix);
    }
  }
  let res = 0;
  for (let num of arr2) {
    str = num.toString();
    let prefix = "";
    for (let char of str) {
      prefix += char;
      if (set.has(prefix)) res = Math.max(res, prefix.length);
      else break;
    }
  }
  return res;
}

// 2416. Sum of Prefix Scores of Strings

class TrieNode {
  constructor() {
    this.children = {};
    this.prefixCount = 0;
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
      node.prefixCount++;
    }
  }
  getPrefixScore(word) {
    let node = this.root;
    let score = 0;
    for (const char of word) {
      node = node.children[char];
      score += node.prefixCount;
    }
    return score;
  }
}

function sumPrefixScores(words) {
  const trie = new Trie();
  for (const word of words) trie.insert(word);
  const result = words.map((word) => trie.getPrefixScore(word));
  return result;
}

// 729. My Calendar I

class MyCalendar {
  constructor() {
    this.val = [];
  }
}

MyCalendar.prototype.book = function (start, end) {
  for (let book of this.val) {
    if (end > book[0] && start < book[1]) return false;
  }
  this.val.push([start, end]);
  return true;
};

// 731. My Calendar II

class MyCalendarTwo {
  constructor() {
    this.calendar = [];
    this.overlaps = [];
  }
}

MyCalendar.prototype.book = function (start, end) {
  for (let date of this.overlaps) {
    if (start < date[1] && end > date[0]) return false;
  }

  for (let date of this.calendar) {
    if (start < date[1] && end > date[0]) {
      this.overlaps.push([Math.max(date[0], start), Math.min(date[1], end)]);
    }
  }
  this.calendar.push([start, end]);
  return true;
};

