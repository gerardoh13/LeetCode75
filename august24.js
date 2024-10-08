// 2678. Number of Senior Citizens

function countSeniors(details) {
  let res = 0;
  for (let str of details) {
    if (+(str[11] + str[12]) > 60) res++;
  }
  return res;
}
// 2134. Minimum Swaps to Group All 1's Together II

function minSwaps(nums) {
  let res = Infinity;
  let ones = nums.reduce((prev, curr) => prev + curr, 0);
  let count = nums[0];
  let end = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i) count -= nums[i - 1];
    while (end - i + 1 < ones) {
      end++;
      count += nums[end % nums.length];
    }
    res = Math.min(res, ones - count);
  }
  return res;
}

// 1460. Make Two Arrays Equal by Reversing Subarrays

function canBeEqual(target, arr) {
  let obj1 = {};
  let obj2 = {};
  for (let i = 0; i < arr.length; i++) {
    obj1[target[i]] = obj1[target[i]] + 1 || 1;
    obj2[arr[i]] = obj2[arr[i]] + 1 || 1;
  }
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
}

// 1508. Range Sum of Sorted Subarray Sums

function rangeSum(nums, n, left, right) {
  let arr = [];
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    arr.push(num);
    for (let j = i + 1; j < nums.length; j++) {
      num += nums[j];
      arr.push(num);
    }
  }
  arr.sort((a, b) => a - b);
  return arr
    .slice(--left, right)
    .reduce((prev, curr) => (prev + curr) % (1e9 + 7), 0);
}

// 2053. Kth Distinct String in an Array

function kthDistinct(arr, k) {
  let freq = new Map();
  for (let s of arr) freq.set(s, freq.get(s) + 1 || 1);
  return arr.filter((s) => freq.get(s) === 1)[--k] || "";
}

// 3016. Minimum Number of Pushes to Type Word II

function minimumPushes(word) {
  let freq = {};
  let res = 0;
  for (let char of word) {
    freq[char] = freq[char] + 1 || 1;
  }
  let freqArr = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  let keyPress = 1;
  for (let i = 0; i < freqArr.length; i++) {
    if (i > 1 && !(i % 8)) keyPress++;
    res += freqArr[i][1] * keyPress;
  }
  return res;
}

// 273. Integer to English Words

function numberToWords(num) {
  if (!num) return "Zero";
  let str = num.toString();
  let ans = [];
  let count = 1;
  let dict = {
    0: "Zero",
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
    10: "Ten",
    11: "Eleven",
    12: "Twelve",
    13: "Thirteen",
    14: "Fourteen",
    15: "Fifteen",
    16: "Sixteen",
    17: "Seventeen",
    18: "Eighteen",
    19: "Nineteen",
    20: "Twenty",
    30: "Thirty",
    40: "Forty",
    50: "Fifty",
    60: "Sixty",
    70: "Seventy",
    80: "Eighty",
    90: "Ninety",
    100: "Hundred",
    1000: "Thousand",
    1000000: "Million",
    1000000000: "Billion",
  };
  function helper(chunk) {
    chunk = parseInt(chunk).toString();
    let res = [];
    if (!+chunk) return;
    if (chunk.length === 3) {
      res.push(dict[chunk[0]]);
      res.push(dict[100]);
      if (dict[chunk.slice(1)]) res.push(dict[chunk.slice(1)]);
      else if (+chunk.slice(1)) {
        if (+chunk[1]) res.push(dict[chunk[1] * 10]);
        res.push(dict[chunk[2]]);
      }
    } else if (chunk.length === 2) {
      if (dict[chunk]) res.push(dict[chunk]);
      else {
        res.push(dict[chunk[0] * 10]);
        res.push(dict[chunk[1]]);
      }
    } else res.push(dict[chunk[0]]);
    res = res.join(" ");
    if (count > 1) res += " " + dict[count];
    ans.unshift(res);
  }
  let chunk = "";
  for (let i = str.length - 1; i >= 0; i--) {
    chunk = str[i] + chunk;
    if (chunk.length === 3 || i === 0) {
      helper(chunk);
      chunk = "";
      count *= 1000;
    }
  }
  return ans.join(" ");
}

// 885. Spiral Matrix III

function spiralMatrixIII(rows, cols, rStart, cStart) {
  let count = rows * cols - 1;
  let [steps, dir] = [1, 0];
  let increase = false;
  let res = [[rStart, cStart]];
  while (count) {
    for (let i = 0; i < steps; i++) {
      !dir ? cStart++ : dir == 1 ? rStart++ : dir == 2 ? cStart-- : rStart--;
      if (rStart < 0 || rStart >= rows || cStart < 0 || cStart >= cols)
        continue;
      res.push([rStart, cStart]);
      count--;
    }
    if (dir < 3) dir++;
    else dir = 0;
    if (increase) steps++;
    increase = !increase;
  }
  return res;
}

// 840. Magic Squares In Grid

function numMagicSquaresInside(grid) {
  if (grid.length < 3 || grid[0].length < 3) return 0;
  res = 0;
  function isMagic(i, j) {
    let firstRow = [grid[i][j], grid[i][j + 1], grid[i][j + 2]];
    if (firstRow.some((val) => val > 9)) return false;
    if (
      firstRow[0] === firstRow[1] ||
      firstRow[0] === firstRow[2] ||
      firstRow[1] === firstRow[2] ||
      !firstRow[0] ||
      !firstRow[1] ||
      !firstRow[2]
    )
      return false;
    let target = firstRow.reduce((p, c) => p + c, 0);
    let square = [
      [grid[i + 1][j], grid[i + 1][j + 1], grid[i + 1][j + 2]],
      [grid[i + 2][j], grid[i + 2][j + 1], grid[i + 2][j + 2]],
      [grid[i][j], grid[i + 1][j], grid[i + 2][j]],
      [grid[i][j + 1], grid[i + 1][j + 1], grid[i + 2][j + 1]],
      [grid[i][j + 2], grid[i + 1][j + 2], grid[i + 2][j + 2]],
      [grid[i][j], grid[i + 1][j + 1], grid[i + 2][j + 2]],
      [grid[i][j + 2], grid[i + 1][j + 1], grid[i + 2][j]],
    ];
    if (
      square.some(
        (arr) =>
          arr.some((val) => val > 9) ||
          arr.reduce((p, c) => p + c, 0) !== target ||
          arr[0] === arr[1] ||
          arr[0] === arr[2] ||
          arr[1] === arr[2] ||
          !arr[0] ||
          !arr[1] ||
          !arr[2]
      )
    )
      return false;
    return true;
  }
  for (let i = 0; i < grid.length - 2; i++) {
    for (let j = 0; j < grid[0].length - 2; j++) {
      if (isMagic(i, j)) res++;
    }
  }
  return res;
}

// 959. Regions Cut By Slashes

class DS {
  constructor(n) {
    this.root = [...new Array(n).keys()];
    this.rank = new Array(n).fill(0);
    this.n = n;
  }
  find = (v) => {
    if (this.root[v] !== v) this.root[v] = this.find(this.root[v]);
    return this.root[v];
  };
  union = (i, j) => {
    let [ri, rj] = [this.find(i), this.find(j)];
    if (ri === rj) return;
    if (this.rank[ri] > this.rank[rj]) this.root[rj] = ri;
    else if (this.rank[ri] < this.rank[rj]) this.root[ri] = rj;
    else (this.root[ri] = rj), this.rank[rj]++;
  };
  getUnoinCount = () => {
    for (let i = 0; i < this.n; i++) this.find(i);
    return new Set(this.root).size;
  };
}

function getKeys(i, j, n) {
  let val = i * n + j;
  val *= 2;
  return [val, val + 1];
}

function regionsBySlashes(grid) {
  let n = grid.length;
  if (n === 1) return grid[0][0] === " " ? 1 : 2;
  let ds = new DS(n * n * 2);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let [left, right] = getKeys(i, j, n);
      if (grid[i][j] === " ") ds.union(left, right);
      if (i !== 0) {
        let [upLeft, upRight] = getKeys(i - 1, j, n);
        let upKey = grid[i - 1][j] === "\\" ? upLeft : upRight;
        let curKey = grid[i][j] === "/" ? left : right;
        ds.union(upKey, curKey);
      }
      if (j !== 0) {
        let [leftLeft, leftRight] = getKeys(i, j - 1, n);
        let leftKey = leftRight;
        let curKey = left;
        ds.union(leftKey, curKey);
      }
    }
  }
  return ds.getUnoinCount();
}

//

function minDays(grid) {
  const countIslands = () => {
    const seen = new Set();
    let islands = 0;

    const dfs = (r, c) => {
      const stack = [[r, c]];
      while (stack.length > 0) {
        const [x, y] = stack.pop();
        for (const [dx, dy] of [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]) {
          const nx = x + dx,
            ny = y + dy;
          if (
            nx >= 0 &&
            nx < grid.length &&
            ny >= 0 &&
            ny < grid[0].length &&
            grid[nx][ny] === 1 &&
            !seen.has(`${nx},${ny}`)
          ) {
            seen.add(`${nx},${ny}`);
            stack.push([nx, ny]);
          }
        }
      }
    };

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === 1 && !seen.has(`${i},${j}`)) {
          islands++;
          seen.add(`${i},${j}`);
          dfs(i, j);
        }
      }
    }
    return islands;
  };

  if (countIslands() !== 1) return 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        grid[i][j] = 0;
        if (countIslands() !== 1) return 1;
        grid[i][j] = 1;
      }
    }
  }

  return 2;
}

// 703. Kth Largest Element in a Stream

class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.nums = nums;
  }
  add = (num) => {
    this.nums.push(num);
    this.nums.sort((a, b) => a - b);
    return this.nums[this.nums.length - this.k];
  };
}

// 40. Combination Sum II

function combinationSum(candidates, target) {
  let res = [];
  function backtrack(target, idx, path) {
    if (target < 0) return;
    if (target == 0) {
      res.push(path);
      return;
    }
    for (let i = idx; i < candidates.length; i++) {
      if (i > idx && candidates[i] == candidates[i - 1]) continue;
      backtrack(target - candidates[i], i + 1, [...path, candidates[i]]);
    }
  }
  candidates.sort((a, b) => a - b);
  backtrack(target, 0, []);
  return res;
}

// 719. Find K-th Smallest Pair Distance

function smallestDistancePair(numbers, k) {
  numbers.sort((a, b) => a - b);
  let minDistance = 0;
  let maxDistance = numbers[numbers.length - 1] - numbers[0];

  while (minDistance < maxDistance) {
    let midDistance = Math.floor((minDistance + maxDistance) / 2);
    if (countPairsWithinDistance(numbers, midDistance) < k) {
      minDistance = midDistance + 1;
    } else {
      maxDistance = midDistance;
    }
  }

  return minDistance;
}

function countPairsWithinDistance(numbers, distance) {
  let count = 0;
  let left = 0;
  for (let right = 1; right < numbers.length; right++) {
    while (numbers[right] - numbers[left] > distance) {
      left++;
    }
    count += right - left;
  }
  return count;
}

// 860. Lemonade Change

function lemonadeChange(bills) {
  let five = 0;
  let ten = 0;
  for (const bill of bills) {
    if (bill == 5) {
      five++;
    } else if (bill == 10) {
      if (five >= 1) {
        five--;
        ten++;
      } else {
        return false;
      }
    } else {
      if (five >= 1 && ten >= 1) {
        ten--;
        five--;
      } else if (five >= 3) {
        five -= 3;
      } else {
        return false;
      }
    }
  }
  return true;
}

// 624. Maximum Distance in Arrays

function maxDistance(arrays) {
  let globalMin = arrays[0][0];
  let globalMax = arrays[0][arrays[0].length - 1];
  let result = 0;
  for (let i = 1; i < arrays.length; i++) {
    const localMin = arrays[i][0];
    const localMax = arrays[i][arrays[i].length - 1];
    result = Math.max(
      result,
      Math.max(localMax - globalMin, globalMax - localMin)
    );
    globalMin = Math.min(globalMin, localMin);
    globalMax = Math.max(globalMax, localMax);
  }
  return result;
}

// 264. Ugly Number II

function nthUglyNumber(n) {
  let cache = [1];
  let p2 = 0;
  let p3 = 0;
  let p5 = 0;
  let m, r2, r3, r5;
  let i = cache.length;
  for (; i < n; i++) {
    r2 = cache[p2] * 2;
    r3 = cache[p3] * 3;
    r5 = cache[p5] * 5;
    m = Math.min(r2, r3, r5);
    if (m === r2) p2++;
    if (m === r3) p3++;
    if (m === r5) p5++;
    cache[i] = m;
  }
  return cache[n - 1];
}

// 650. 2 Keys Keyboard

function minSteps(n) {
  if (n === 1) return 0;
  let steps = 0;
  let factor = 2;
  while (n > 1) {
    while (n % factor === 0) {
      steps += factor;
      n = Math.floor(n / factor);
    }
    factor++;
  }
  return steps;
}

// 1140. Stone Game II

function stoneGameII(piles) {
  const n = piles.length;
  const dp = Array.from({ length: n }, () => Array(n + 1).fill(0));
  const suffixSum = Array(n).fill(0);
  suffixSum[n - 1] = piles[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    suffixSum[i] = suffixSum[i + 1] + piles[i];
  }
  for (let i = n - 1; i >= 0; i--) {
    for (let m = 1; m <= n; m++) {
      if (i + 2 * m >= n) dp[i][m] = suffixSum[i];
      else {
        for (let x = 1; x <= 2 * m; x++) {
          dp[i][m] = Math.max(
            dp[i][m],
            suffixSum[i] - dp[i + x][Math.max(m, x)]
          );
        }
      }
    }
  }
  return dp[0][1];
}

// 664. Strange Printer

function strangePrinter(s) {
  const memo = {};
  function min_turns_to_print(start, end) {
    if (start > end) return 0;
    if (memo.hasOwnProperty(`${start}-${end}`)) return memo[`${start}-${end}`];
    let res = min_turns_to_print(start, end - 1) + 1;
    for (let middle = start; middle < end; middle++) {
      if (s[middle] === s[end]) {
        res = Math.min(
          res,
          min_turns_to_print(start, middle) +
            min_turns_to_print(middle + 1, end - 1)
        );
      }
    }
    memo[`${start}-${end}`] = res;
    return res;
  }
  return min_turns_to_print(0, s.length - 1);
}

// 476. Number Complement

function findComplement(num) {
  let binary = num.toString(2).split("");
  for (let i = 0; i < binary.length; i++) {
    binary[i] = binary[i] === "1" ? "0" : "1";
  }
  return parseInt(binary.join(""), 2);
}

// 592. Fraction Addition and Subtraction

// const gcd = (a, b) => (b ? gcd(b, a % b) : a);

function fractionAddition(expression) {
  let [num, den] = [0, 1];
  const fractions = expression
    .replaceAll("-", "+-")
    .split("+")
    .filter((is) => is);
  for (const fraction of fractions) {
    const [n, d] = fraction.split("/");
    [num, den] = [num * d + den * n, den * d];
  }
  const commonDev = gcd(Math.abs(num), den);
  return `${num / commonDev}/${den / commonDev}`;
}

// 564. Find the Closest Palindrome

function distance(n) {
  let s = n + "",
    i = 0,
    j = s.length - 1;
  while (i < j) {
    if (s[i++] !== s[j--]) return 10 ** (i - 1);
  }
  return 0;
}

function nearestPalindromic(n) {
  let bit = BigInt(n);
  let num = [bit - 1n, bit + 1n];
  while (true) {
    let d1 = distance(num[0]);
    if (d1 === 0) break;
    num[0] -= BigInt(d1);
  }
  while (true) {
    let d2 = distance(num[1]);
    if (d2 === 0) break;
    num[1] += BigInt(d2);
  }
  return bit - num[0] <= num[1] - bit ? String(num[0]) : String(num[1]);
}

// 145. Binary Tree Postorder Traversal

function postorderTraversal(root) {
  let res = [];
  if (!root) return res;
  let node = root;
  let prevNode = null;
  let stack = [];
  while (node || stack.length) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      node = stack[stack.length - 1];
      if (!node.right || node.right == prevNode) {
        res.push(node.val);
        stack.pop();
        prevNode = node;
        node = null;
      } else {
        node = node.right;
      }
    }
  }
  return res;
}

// 590. N-ary Tree Postorder Traversal

function postorder(root) {
  const res = [],
    stack = [root];
  while (stack.length) {
    const curr = stack.pop();
    if (!curr) continue;
    res.push(curr.val);
    stack.push(...curr.children);
  }
  return res.reverse();
}

// 1514. Path with Maximum Probability

function maxProbability(n, edges, succProb, start_node, end_node) {
  const MIN = Number.MIN_SAFE_INTEGER;
  const m = edges.length;
  const adjList = {};
  const dists = new Array(n).fill(MIN);
  for (let i = 0; i < n; i++) {
    adjList[i] = [];
  }
  for (let i = 0; i < m; i++) {
    const [u, v] = edges[i];
    const weight = succProb[i];
    adjList[u].push([v, weight]);
    adjList[v].push([u, weight]);
  }
  const maxHeap = new MaxPriorityQueue({ priority: (x) => x[1] });
  maxHeap.enqueue([start_node, 1]);
  while (!maxHeap.isEmpty()) {
    const [node, prob] = maxHeap.dequeue().element;
    if (node === end_node) return prob;
    if (dists[node] > prob) continue;
    for (const [nei, weight] of adjList[node]) {
      if (prob * weight > dists[nei]) {
        dists[nei] = prob * weight;
        maxHeap.enqueue([nei, dists[nei]]);
      }
    }
  }
  return 0;
}

// 1905. Count Sub Islands

function countSubIslands(grid1, grid2) {
  const R = grid2.length,
    C = grid2[0].length;
  function noOfNotCoveredDfs(i, j) {
    if (i < 0 || j < 0) return 0;
    if (i >= R || j >= C) return 0;
    if (grid2[i][j] !== 1) return 0;
    grid2[i][j] = 2;
    return (
      (grid1[i][j] === 1 ? 0 : 1) +
      noOfNotCoveredDfs(i - 1, j) +
      noOfNotCoveredDfs(i + 1, j) +
      noOfNotCoveredDfs(i, j - 1) +
      noOfNotCoveredDfs(i, j + 1)
    );
  }
  let ans = 0;
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (grid2[i][j] === 1) {
        if (noOfNotCoveredDfs(i, j) === 0) ans++;
      }
    }
  }
  return ans;
}

// 947. Most Stones Removed with Same Row or Column

function removeStones(stones) {
  const visited = new Set();
  let valid = 0;
  const traverse = (row, col) => {
    const key = `${row}-${col}`;
    if (visited.has(key)) return;
    visited.add(key);
    for (const [x, y] of stones) {
      if (row === x || col === y) traverse(x, y);
    }
  };
  for (const [x, y] of stones) {
    const key = `${x}-${y}`;
    if (visited.has(key)) continue;
    traverse(x, y);
    valid++;
  }
  return stones.length - valid;
}

function modifiedGraphEdges(n, edges, source, destination, target) {
  const kMax = 2000000000;
  const graph = Array(n)
    .fill()
    .map(() => []);
  for (const [u, v, w] of edges) {
    if (w === -1) continue;
    graph[u].push([v, w]);
    graph[v].push([u, w]);
  }
  const distToDestination = dijkstra(graph, source, destination);
  if (distToDestination < target) {
    return [];
  }
  if (distToDestination === target) {
    for (const edge of edges) {
      if (edge[2] === -1) edge[2] = kMax;
    }
    return edges;
  }
  for (let i = 0; i < edges.length; i++) {
    const [u, v, w] = edges[i];
    if (w !== -1) continue;
    edges[i][2] = 1;
    graph[u].push([v, 1]);
    graph[v].push([u, 1]);
    const distToDestination = dijkstra(graph, source, destination);
    if (distToDestination <= target) {
      edges[i][2] += target - distToDestination;
      for (let j = i + 1; j < edges.length; j++) {
        if (edges[j][2] === -1) edges[j][2] = kMax;
      }
      return edges;
    }
  }
  return [];
}

function dijkstra(graph, src, dst) {
  const dist = Array(graph.length).fill(Infinity);
  const minHeap = new MinHeap();

  dist[src] = 0;
  minHeap.insert(dist[src], src);

  while (!minHeap.isEmpty()) {
    const [d, u] = minHeap.extractMin();
    for (const [v, w] of graph[u]) {
      if (d + w < dist[v]) {
        dist[v] = d + w;
        minHeap.insert(dist[v], v);
      }
    }
  }
  return dist[dst];
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(key, value) {
    this.heap.push([key, value]);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return min;
  }

  bubbleUp(index) {
    const [key, value] = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex][0] <= key) break;

      this.heap[index] = this.heap[parentIndex];
      index = parentIndex;
    }
    this.heap[index] = [key, value];
  }

  bubbleDown(index) {
    const [key, value] = this.heap[index];
    const lastIndex = this.heap.length - 1;
    while (true) {
      let smallestChildIndex = -1;
      let smallestChildKey = key;
      let smallestChildValue = value;
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      if (leftChildIndex <= lastIndex) {
        const [leftChildKey, leftChildValue] = this.heap[leftChildIndex];
        if (leftChildKey < smallestChildKey) {
          smallestChildIndex = leftChildIndex;
          smallestChildKey = leftChildKey;
          smallestChildValue = leftChildValue;
        }
      }
      if (rightChildIndex <= lastIndex) {
        const [rightChildKey, rightChildValue] = this.heap[rightChildIndex];
        if (rightChildKey < smallestChildKey) {
          smallestChildIndex = rightChildIndex;
          smallestChildKey = rightChildKey;
          smallestChildValue = rightChildValue;
        }
      }
      if (smallestChildIndex === -1 || key <= smallestChildKey) break;
      this.heap[index] = [smallestChildKey, smallestChildValue];
      index = smallestChildIndex;
    }
    this.heap[index] = [key, value];
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}
