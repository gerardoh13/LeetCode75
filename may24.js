// 2000. Reverse Prefix of Word

function reveresePrefix(word, ch) {
  let res = "";
  for (let i = 0; i < word.length; i++) {
    res = word[i] + res;
    if (word[i] === ch) return res + word.substring(i + 1);
  }
  return word;
}

// 2441. Largest Positive Integer That Exists With Its Negative

function findMaxK(nums) {
  let res = -1;
  let set = new Set();
  for (let i = 0; i < nums.length; i++) {
    set.add(nums[i]);
    if (set.has(nums[i] * -1)) {
      res = Math.max(res, Math.abs(nums[i]));
    }
  }
  return res;
}

// 165. Compare Version Numbers

function compareVersion(version1, version2) {
  let v1 = version1.split(".");
  let v2 = version2.split(".");
  let longest = v1.length > v2.length ? v1.length : v2.length;
  for (let i = 0; i < longest; i++) {
    let rev1 = +v1[i] || 0;
    let rev2 = +v2[i] || 0;
    if (rev1 > rev2) return 1;
    if (rev1 < rev2) return -1;
  }
  return 0;
}

// 881. Boats to Save People

function numRescueBoats(people, limit) {
  people.sort((a, b) => a - b);
  let res = 0,
    l = 0,
    r = people.length - 1;
  while (l <= r) {
    if (people[l] + people[r] > limit) {
      l++;
      r--;
    } else r--;
    res++;
  }
  return res;
}

// 237. Delete Node in a Linked List

function deleteNode(node) {
  node.val = node.next.val;
  node.next = node.next.next;
}

// 2487. Remove Nodes From Linked List

function removeNodes(head) {
  if (!head) return head;
  head = reverseList(head);
  let max = head;
  let curr = head;
  while (curr.next.next) {
    if (curr.val < max.val) {
      curr.val = curr.next.val;
      curr.next = curr.next.next;
    } else curr = curr.next;
    max = curr.val >= max.val ? curr : max;
  }
  if (curr.next.val < max.val || curr.next.val < curr.val) curr.next = null;
  if (curr.val < max.val) max.next = null;
  return reverseList(head);
}

function reverseList(node) {
  let vals = [];
  let curr = node;
  while (curr.next) {
    vals.push(curr.val);
    curr = curr.next;
  }
  vals.push(curr.val);
  curr = node;
  while (curr.next) {
    curr.val = vals.pop();
    curr = curr.next;
  }
  curr.val = vals.pop();
  return node;
}

// 2816. Double a Number Represented as a Linked List

function doubleIt(head) {
  let curr = head;
  let intStr = "";
  while (curr) {
    intStr += curr.val;
    curr = curr.next;
  }
  let ogLen = intStr.length;
  intStr = (BigInt(intStr) + BigInt(intStr)).toString();
  if (intStr.length > ogLen) head = new ListNode(0, head);
  curr = head;
  let i = 0;
  while (curr) {
    curr.val = +intStr[i];
    curr = curr.next;
    i++;
  }
  return head;
}

// 506. Relative Ranks

function findRelativeRanks(score) {
  let copy = [...score].sort((a, b) => b - a);
  let map = new Map();
  for (let i = 0; i < score.length; i++) {
    if (i === 0) map.set(copy[i], "Gold Medal");
    else if (i === 1) map.set(copy[i], "Silver Medal");
    else if (i === 2) map.set(copy[i], "Bronze Medal");
    else map.set(copy[i], `${i + 1}`);
  }
  for (let j = 0; j < score.length; j++) {
    score[j] = map.get(score[j]);
  }
  return score;
}

// 3075. Maximize Happiness of Selected Children

function maximumHappinessSum(happiness, k) {
  happiness.sort((a, b) => b - a);
  let turns = 0;
  let res = 0;
  for (let i = 0; i < k; i++) {
    res += Math.max(0, happiness[i] - turns);
    turns++;
  }
  return res;
}

// 786. K-th Smallest Prime Fraction

function kthSmallestPrimeFraction(arr, k) {
  let left = 0,
    right = 1;
  let res = [];
  while (left <= right) {
    let mid = left + (right - left) / 2;
    let j = 1,
      total = 0,
      num = 0,
      den = 0;
    let maxFrac = 0;
    for (let i = 0; i < arr.length; ++i) {
      while (j < arr.length && arr[i] >= arr[j] * mid) {
        ++j;
      }
      total += arr.length - j;
      if (j < arr.length && maxFrac < (arr[i] * 1.0) / arr[j]) {
        maxFrac = (arr[i] * 1.0) / arr[j];
        num = i;
        den = j;
      }
    }
    if (total === k) {
      res = [arr[num], arr[den]];
      break;
    }
    if (total > k) {
      right = mid;
    } else {
      left = mid;
    }
  }
  return res;
}

// 857. Minimum Cost to Hire K Workers

function mincostToHireWorkers(quality, wage, k) {
  let ratios = [];
  for (let i = 0; i < quality.length; i++) {
    ratios.push([wage[i] / quality[i], quality[i], wage[i]]);
  }
  ratios.sort((a, b) => a[0] - b[0]);
  let res = Infinity;
  let maxHeap = new PriorityQueue({ compare: (a, b) => b - a });
  let heapSum = 0;
  for (let i = 0; i < ratios.length; i++) {
    let ratio = ratios[i][0];
    let [, qual] = ratios[i];
    maxHeap.enqueue(qual);
    heapSum += qual;
    if (maxHeap.size() > k) {
      heapSum -= maxHeap.dequeue();
    }
    if (maxHeap.size() === k) {
      res = Math.min(res, heapSum * ratio);
    }
  }
  return res;
}

// 2373. Largest Local Values in a Matrix

function largestLocal(grid) {
  let len = grid.length;
  let res = [];
  for (let i = 0; i < len - 2; i++) {
    let row = [];
    for (let j = 0; j < len - 2; j++) {
      row.push(
        Math.max(
          grid[i][j],
          grid[i][j + 1],
          grid[i][j + 2],
          grid[i + 1][j],
          grid[i + 1][j + 1],
          grid[i + 1][j + 2],
          grid[i + 2][j],
          grid[i + 2][j + 1],
          grid[i + 2][j + 2]
        )
      );
    }
    res.push(row);
  }
  return res;
}

// 861. Score After Flipping Matrix

function matrixScore(grid) {
  let m = grid.length;
  let n = grid[0].length;
  let res = Math.pow(2, n - 1) * m;
  for (let j = 1; j < n; j++) {
    let curr = 0;
    for (let i = 0; i < m; i++) {
      curr += grid[i][0] === grid[i][j] ? 1 : 0;
    }
    res += Math.max(curr, m - curr) * Math.pow(2, n - 1 - j);
  }
  return res;
}

// 1219. Path with Maximum Gold

function getMaximumGold(grid) {
  let m = grid.length;
  let n = grid[0].length;
  let res = 0;
  function dfs(i, j, count) {
    count += grid[i][j];
    let temp = grid[i][j];
    grid[i][j] = 0;
    if (i > 0 && grid[i - 1][j]) dfs(i - 1, j, count);
    if (i < m - 1 && grid[i + 1][j]) dfs(i + 1, j, count);
    if (grid[i][j - 1]) dfs(i, j - 1, count);
    if (grid[i][j + 1]) dfs(i, j + 1, count);
    grid[i][j] = temp;
    res = Math.max(res, count);
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j]) dfs(i, j, 0);
    }
  }
  return res;
}

// 2812. Find the Safest Path in a Grid

function maximumSafenessFactor(grid) {
  const n = grid.length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const isInBound = (r, c) => r >= 0 && r < n && c >= 0 && c < n;

  const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));
  const queue = [];

  const maxDistance = Array.from({ length: n }, () => Array(n).fill(0));

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        dist[r][c] = 0;
        queue.push([r, c]);
      }
    }
  }

  for (let i = 0; i < queue.length; i++) {
    const [r, c] = queue[i];
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (isInBound(nr, nc) && dist[nr][nc] === Infinity) {
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }

  maxDistance[0][0] = dist[0][0];
  queue.push([0, 0]);

  for (let i = 0; i < queue.length; i++) {
    const [r, c] = queue[i];
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (isInBound(nr, nc)) {
        const newDistance = Math.min(maxDistance[r][c], dist[nr][nc]);
        if (newDistance > maxDistance[nr][nc]) {
          maxDistance[nr][nc] = newDistance;
          queue.push([nr, nc]);
        }
      }
    }
  }
  return maxDistance[n - 1][n - 1];
}

// 2331. Evaluate Boolean Binary Tree

function evaluateTree(root) {
  if (node.val === 2)
    return evaluateTree(root.left) || evaluateTree(root.right);
  if (node.val === 3)
    return evaluateTree(root.left) && evaluateTree(root.right);
  return (root.val = 1);
}

// 1325. Delete Leaves With a Given Value

function removeLeafNodes(root, target) {
  function dfs(node) {
    if (node.left && dfs(node.left)) node.left = null;
    if (node.right && dfs(node.right)) node.right = null;
    if (!node.left && !node.right && node.val === target) return true;
  }
  dfs(root);
  if (!root.left && !root.right && root.val === target) return null;
  return root;
}

// 979. Distribute Coins in Binary Tree

function distributeCoins(root) {
  res = 0;
  function dfs(node) {
    if (!node) return 0;
    let leftCoins = dfs(node.left);
    let rightCoins = dfs(node.right);
    res += Math.abs(leftCoins) + Math.abs(rightCoins);
    return node.val - 1 + leftCoins + rightCoins;
  }
  dfs(root);
  return res;
}

// 3068. Find the Maximum Sum of Node Values

function maximumValueSum(nums, k, edges) {
  let totalSum = 0;
  let count = 0;
  let positiveMin = Infinity;
  let negativeMax = -Infinity;

  for (let nodeValue of nums) {
    let nodeValAfterOperation = nodeValue ^ k;
    totalSum += nodeValue;
    let netChange = nodeValAfterOperation - nodeValue;

    if (netChange > 0) {
      positiveMin = Math.min(positiveMin, netChange);
      totalSum += netChange;
      count += 1;
    } else {
      negativeMax = Math.max(negativeMax, netChange);
    }
  }

  if (count % 2 === 0) return totalSum;
  return Math.max(totalSum - positiveMin, totalSum + negativeMax);
}

// 1863. Sum of All Subset XOR Totals

function subsetXORSum(nums) {
  let res = 0;
  let n = nums.length;
  for (let i = 0; i < 1 << n; i++) {
    let xor = 0;
    for (let j = 0; j < n; j++) {
      if (((i >> j) & 1) != 0) xor = xor ^ nums[j];
    }
    res += xor;
  }
  return res;
}

// 78. Subsets

function subsets(nums) {
  let res = [];
  function recursion(sub, idx) {
    if (idx === nums.length) {
      res.push([...sub]);
      return;
    }
    sub.push(nums[idx]);
    recursion(sub, idx + 1);
    sub.pop();
    recursion(sub, idx + 1);
  }
  recursion([], 0);
  return res;
}

// 131. Palindrome Partitioning

function partition(s) {
  let res = [];
  function isPalindrome(s) {
    let i = 0,
      j = s.length - 1;
    while (i < j) {
      if (s[i++] !== s[j--]) return false;
    }
    return true;
  }
  function backtrack(part, start) {
    if (start === s.length) {
      res.push([...part]);
      return;
    }
    for (let end = start + 1; end <= s.length; end++) {
      let sub = s.substring(start, end);
      if (isPalindrome(sub)) {
        part.push(sub);
        backtrack(part, end);
        part.pop();
      }
    }
  }
  backtrack([], 0);
  return res;
}

// 2597. The Number of Beautiful Subsets

function beautifulSubsets(nums, k) {
  let res = 0;
  let sub = [];
  function backtrack(start) {
    if (sub.length) res++;
    for (let i = start; i < nums.length; i++) {
      let valid = true;
      for (let num of sub) {
        if (Math.abs(num - nums[i]) === k) {
          valid = false;
          break;
        }
      }
      if (valid) {
        sub.push(nums[i]);
        backtrack(i + 1);
        sub.pop();
      }
    }
  }
  backtrack(0);
  return res;
}

// 1255. Maximum Score Words Formed by Letters

function maxScoreWords(words, letters, score) {
  let lettersSize = new Array(26).fill(0);
  for (let char of letters) {
    lettersSize[char.charCodeAt() - "a".charCodeAt()]++;
  }
  let res = 0;
  const backTrack = function (start, curSize, curScore) {
    for (let i = start; i < words.length; i++) {
      let word = words[i];
      let remainSize = [...curSize];
      let nextScore = curScore;
      let j = 0;
      while (j < word.length) {
        let idx = word[j].charCodeAt() - "a".charCodeAt();
        if (remainSize[idx]-- === 0) break;
        nextScore += score[idx];
        j++;
      }
      if (j === word.length) {
        res = Math.max(res, nextScore);
        backTrack(i + 1, remainSize, nextScore);
      }
    }
  };
  backTrack(0, lettersSize, 0);
  return res;
}

// 140. Word Break II

function wordBreak(s, wordDict) {
  let res = [];
  let words = [];
  let dict = new Set(wordDict);
  function backtrack(start) {
    if (start === s.length) {
      res.push(words.join(" "));
      return;
    }
    for (let i = start; i < s.length; i++) {
      let word = s.substring(start, i + 1);
      if (!dict.has(word)) continue;
      words.push(word);
      backtrack(i + 1);
      words.pop();
    }
  }
  backtrack(0);
  return res;
}

// 552. Student Attendance Record II

function checkRecord(n) {
  let MOD = 1000000007;
  let memo = new Array(n + 1)
    .fill(null)
    .map(() => new Array(2).fill(null).map(() => new Array(3).fill(-1)));
  let eligibleCombinations = (n, totalAbsences, consecutiveLates) => {
    if (totalAbsences >= 2 || consecutiveLates >= 3) return 0;
    if (n === 0) return 1;
    if (memo[n][totalAbsences][consecutiveLates] !== -1) {
      return memo[n][totalAbsences][consecutiveLates];
    }
    let count = 0;
    count = eligibleCombinations(n - 1, totalAbsences, 0);
    count = (count + eligibleCombinations(n - 1, totalAbsences + 1, 0)) % MOD;
    count =
      (count +
        eligibleCombinations(n - 1, totalAbsences, consecutiveLates + 1)) %
      MOD;
    memo[n][totalAbsences][consecutiveLates] = count;
    return count;
  };
  return eligibleCombinations(n, 0, 0);
}

// 1608. Special Array With X Elements Greater Than or Equal X

function specialArray(nums) {
  nums.sort((a, b) => a - b);
  if (!nums[nums.length - 1]) return -1;
  let n = nums.length;
  let i;
  debugger;
  if (nums[0]) i = 0;
  else {
    let start = 0,
      end = n - 1;
    while (true) {
      i = Math.floor((start + end) / 2);
      if (nums[i] && !nums[i - 1]) break;
      if (nums[i] === 0) start = i + 1;
      else end = i - 1;
    }
  }
  while (nums[i] < n - i) {
    i++;
  }
  if (nums[i - 1] === n - i) return -1;
  return n - i;
}

// 1208. Get Equal Substrings Within Budget

function equalSubstring(s, t, maxCost) {
  let n = s.length;
  let start = 0;
  let currentCost = 0;
  let maxLength = 0;

  for (let end = 0; end < n; end++) {
    currentCost += Math.abs(s.charCodeAt(end) - t.charCodeAt(end));

    while (currentCost > maxCost) {
      currentCost -= Math.abs(s.charCodeAt(start) - t.charCodeAt(start));
      start++;
    }

    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}

// 1404. Number of Steps to Reduce a Number in Binary Representation to One

function numSteps(s) {
  let num = BigInt("0b" + s);
  let res = 0;
  while (num !== 1n) {
    if (num % 2n === 0n) num /= 2n;
    else num += 1n;
    res++;
  }
  return res;
}
