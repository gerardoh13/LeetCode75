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
