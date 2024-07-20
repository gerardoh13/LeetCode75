// 1550. Three Consecutive Odds

function threeConsecutiveOdds(arr) {
  if (arr.length < 3) return false;
  let count = 0;
  for (let num of arr) {
    if (num % 2 !== 0) {
      count++;
      if (count === 3) return true;
    } else count = 0;
  }
  return false;
}

// 350. Intersection of Two Arrays II

function intersect(nums1, nums2) {
  let res = [];
  let count = new Map();
  for (let num of nums1) {
    count.set(num, count.get(num) + 1 || 1);
  }
  for (let num of nums2) {
    if (count.get(num)) {
      count.set(num, count.get(num) - 1);
      res.push(num);
    }
  }
  return res;
}

// 1509. Minimum Difference Between Largest and Smallest Value in Three Moves

function minDifference(nums) {
  if (nums.length <= 4) return 0;
  nums.sort((a, b) => a - b);
  const n = nums.length;
  return Math.min(
    nums[n - 1] - nums[3],
    nums[n - 2] - nums[2],
    nums[n - 3] - nums[1],
    nums[n - 4] - nums[0]
  );
}

// 2181. Merge Nodes in Between Zeros

function mergeNodes(head) {
  let l = head;
  let r = head;
  let count = 0;
  r = r.next;
  while (r.next) {
    count += r.val;
    if (r.next.val === 0) {
      l.val = count;
      count = 0;
      r.next.next ? (l = l.next) : (l.next = null);
    }
    r = r.next;
  }
  return head;
}

// 2058. Find the Minimum and Maximum Number of Nodes Between Critical Points

function nodesBetweenCriticalPoints(head) {
  if (!head.next.next) return [-1, -1];
  let minMax = [Infinity, null];
  let firstI, lastI, prev, prevIdx;
  let i = 1;
  while (head.next) {
    if (
      (head.val > prev && head.val > head.next.val) ||
      (head.val < prev && head.val < head.next.val)
    ) {
      if (!firstI) {
        firstI = i;
        prevIdx = i;
      } else {
        minMax[0] = Math.min(minMax[0], i - prevIdx);
        lastI = i;
        prevIdx = i;
      }
    }
    prev = head.val;
    i++;
    head = head.next;
  }
  if (!lastI) return [-1, -1];
  minMax[1] = lastI - firstI;
  return minMax;
}

// 2582. Pass the Pillow

function passThePillow(n, time) {
  let fullRounds = Math.floor(time / (n - 1));
  let extraTime = Math.floor(time % (n - 1));
  if (fullRounds % 2 === 0) return extraTime + 1;
  return n - extraTime;
}

// 1518. Water Bottles

function numWaterBottles(numBottles, numExchange) {
  let res = numBottles;
  while (numBottles >= numExchange) {
    let exchange = Math.floor(numBottles / numExchange);
    numBottles = numBottles - exchange * numExchange + exchange;
    res += exchange;
  }
  return res;
}

// 1823. Find the Winner of the Circular Game

function findTheWinner(n, k) {
  let arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  let start = 0;
  while (arr.length > 1) {
    arr.splice((start + k - 1) % arr.length, 1);
    start = (start + k - 1) % (arr.length + 1);
  }
  return arr[0];
}

// 1701. Average Waiting Time

function averageWaitingTime(customers) {
  let res = 0;
  let start = 1;
  for (let i = 0; i < customers.length; i++) {
    start = Math.max(start, customers[i][0]);
    let end = start + customers[i][1];
    res += end - customers[i][0];
    start = end;
  }
  return res / customers.length;
}

// 1598. Crawler Log Folder

function minOperations(logs) {
  let res = 0;
  for (let log of logs) {
    if (log === "./" || (log === "../" && !res)) continue;
    else if (log === "../") res--;
    else res++;
  }
  return res;
}

// 1190. Reverse Substrings Between Each Pair of Parentheses

function reverseParentheses(s) {
  let arr = s.split("");
  let stack = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "(") {
      stack.push(i);
      arr[i] = "";
    } else if (arr[i] === ")") {
      arr[i] = "";
      let start = stack.pop();
      let end = i;
      while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
      }
    }
  }
  return arr.join("");
}

// 1717. Maximum Score From Removing Substrings

function maximumGain(s, x, y) {
  let aCt = 0,
    bCt = 0,
    res = 0,
    a = "a",
    b = "b";
  if (x < y) {
    [a, b, x, y] = [b, a, y, x];
  }
  for (let char of s) {
    if (char === a) aCt++;
    else if (char === b) {
      if (aCt) {
        aCt--;
        res += x;
      } else bCt++;
    } else {
      res += Math.min(aCt, bCt) * y;
      aCt = bCt = 0;
    }
  }
  res += Math.min(aCt, bCt) * y;
  return res;
}

// 2751. Robot Collisions

function survivedRobotsHealths(positions, healths, directions) {
  let stack = [];
  let bots = [...Array(healths.length).keys()];
  bots.sort((a, b) => positions[a] - positions[b]);
  for (let bot of bots) {
    if (!stack.length) {
      stack.push(bot);
      continue;
    }
    let peek = stack[stack.length - 1];
    if (directions[peek] === "R") {
      if (directions[bot] === "R") {
        stack.push(bot);
        continue;
      } else {
        while (
          stack.length &&
          directions[peek] === "R" &&
          healths[bot] > healths[peek]
        ) {
          healths[bot]--;
          stack.pop();
          peek = stack[stack.length - 1];
        }
        if (!stack.length) stack.push(bot);
        else if (directions[peek] === "L") stack.push(bot);
        else if (healths[peek] === healths[bot]) stack.pop();
        else if (healths[peek] > healths[bot]) healths[peek]--;
      }
    } else stack.push(bot);
  }
  let res = [];
  for (let bot of stack) {
    res[bot] = healths[bot];
  }
  return res.filter((b) => b);
}

function countOfAtoms(formula) {
  let stack = [],
    curr = {},
    i = 0;

  function readNextDigit(i) {
    if (!formula[i]?.match(/[0-9]/)) return [1, i];
    let res = 0;
    while (formula[i]?.match(/[0-9]/)) {
      res = res * 10 + +formula[i++];
    }
    return [res, i];
  }

  function readNextElement(i) {
    if (!formula[i].match(/[A-Z]/)) return null;
    let res = formula[i++];
    while (formula[i]?.match(/[a-z]/)) {
      res += formula[i++];
    }
    return [res, i];
  }

  while (i < formula.length) {
    if (formula[i] === "(") {
      stack.push(curr);
      curr = {};
      i++;
    } else if (formula[i] === ")") {
      const [mult, newI] = readNextDigit(++i);
      i = newI;
      Object.keys(curr).forEach((key) => (curr[key] *= mult));
      const last = stack[stack.length - 1];
      Object.keys(last).forEach(
        (key) => (last[key] = last[key] + (curr[key] ?? 0))
      );
      Object.keys(curr).forEach((key) => {
        if (last[key] === undefined) {
          last[key] = curr[key];
        }
      });
      curr = stack.pop();
    } else {
      const [ele, newI] = readNextElement(i);
      i = newI;
      const [c, nI] = readNextDigit(i);
      i = nI;
      curr[ele] = (curr[ele] ?? 0) + c;
    }
  }

  return Object.entries(curr)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .reduce((r, [key, val]) => (r += `${key}${val === 1 ? "" : val}`), "");
}

// 2196. Create Binary Tree From Descriptions

function createBinaryTree(descriptions) {
  let map = new Map();
  let children = new Set();
  let posRoots = new Set();
  for (let desc of descriptions) {
    children.add(desc[1]);
    if (!children.has(desc[0])) posRoots.add(desc[0]);
    if (posRoots.has(desc[1])) posRoots.delete(desc[1]);
    if (map.has(desc[0])) parent = map.get(desc[0]);
    else {
      parent = new TreeNode(desc[0]);
      map.set(desc[0], parent);
    }
    let child;
    if (map.has(desc[1])) child = map.get(desc[1]);
    else {
      child = new TreeNode(desc[1]);
      map.set(desc[1], child);
    }
    let dir = desc[2] == 1 ? "left" : "right";
    parent[dir] = child;
  }
  return map.get(posRoots.values().next().value);
}

// 2096. Step-By-Step Directions From a Binary Tree Node to Another

function getDirections(root, startValue, destValue) {
  let startPath = [];
  let destPath = [];

  function dfs(node, target, path) {
    if (!node) return;
    if (node.val == target) return node;
    path.push("L");
    if (dfs(node.left, target, path)) return true;
    path.pop();
    path.push("R");
    if (dfs(node.right, target, path)) return true;
    path.pop();
    return false;
  }
  dfs(root, startValue, startPath);
  dfs(root, destValue, destPath);
  let commonPathLength = 0;
  while (
    commonPathLength < startPath.length &&
    commonPathLength < destPath.length &&
    startPath[commonPathLength] == destPath[commonPathLength]
  )
    commonPathLength++;
  let directions = Array(startPath.length - commonPathLength).fill("U");
  for (let i = commonPathLength; i < destPath.length; i++) {
    directions.push(destPath[i]);
  }
  return directions.join("");
}

// 1110. Delete Nodes And Return Forest

// function delNodes(root, to_delete) {
//   if (!root) return [];
//   let res = [];
//   delSet = new Set(to_delete);
//   if (!delSet.has(root.val)) res.push(root);
//   function dfs(node) {
//     debugger;
//     if (!node) return;
//     let left = node.left;
//     let right = node.right;

//     if (left && dfs(left)) {
//       node.left = null;
//       if (left.left) res.push(left.left);
//       if (left.right) res.push(left.right);
//     }
//     if (right && dfs(right)) {
//       node.right = null;
//       if (right.left) res.push(right.left);
//       if (right.right) res.push(right.right);
//     }
//     if (delSet.has(node.val)) return true;
//   }
//   dfs(root);
//   return res;
// }

function delNodes(root, to_delete) {
  if (!root) return [];
  let res = [];
  delSet = new Set(to_delete);
  function dfs(node) {
    if (!node) return;
    let left = node.left;
    let right = node.right;
    if (left && dfs(left)) {
      node.left = null;
      if (left.left) res.push(left.left);
      if (left.right) res.push(left.right);
    }
    if (right && dfs(right)) {
      node.right = null;
      if (right.left) res.push(right.left);
      if (right.right) res.push(right.right);
    }
    if (delSet.has(node.val)) return true;
  }
  if (!delSet.has(root.val)) {
    res.push(root);
    dfs(root);
  } else {
    let dummy = new TreeNode(101, root);
    dfs(dummy);
  }
  return res;
}

// 1530. Number of Good Leaf Nodes Pairs

function countPairs(root, distance) {
  let count = 0;
  const MAX_DISTANCE = 10;

  function dfs(node) {
    if (!node) return new Array(MAX_DISTANCE + 1).fill(0);
    if (!node.left && !node.right) {
      const res = new Array(MAX_DISTANCE + 1).fill(0);
      res[1] = 1;
      return res;
    }
    const left = dfs(node.left);
    const right = dfs(node.right);
    for (let i = 1; i <= distance; i++) {
      for (let j = 1; j <= distance - i; j++) {
        count += left[i] * right[j];
      }
    }
    const res = new Array(MAX_DISTANCE + 1).fill(0);
    for (let i = 1; i < MAX_DISTANCE; i++) {
      res[i + 1] = left[i] + right[i];
    }
    return res;
  }
  dfs(root);
  return count;
}

// 1380. Lucky Numbers in a Matrix

function luckyNumbers(matrix) {
  for (let row of matrix) {
    min = Math.min(...row);
    let i = row.indexOf(min);
    let col = matrix.map((r) => r[i]);
    if (Math.max(...col) === min) return [min];
  }
  return [];
}

// 1605. Find Valid Matrix Given Row and Column Sums

function restoreMatrix(rowSum, colSum) {
  let res = Array(rowSum.length)
    .fill()
    .map(() => Array(colSum.length).fill(0));
  let [i, j] = [0, 0];
  while (i < rowSum.length && j < colSum.length) {
    res[i][j] = Math.min(rowSum[i], colSum[j]);
    rowSum[i] -= res[i][j];
    colSum[j] -= res[i][j];
    if (rowSum[i] === 0) i++;
    else j++;
  }
  return res;
}

let rowSum = [3, 8],
  colSum = [4, 7];
restoreMatrix(rowSum, colSum);
