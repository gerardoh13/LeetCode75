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


