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

// 58. Length of Last Word

function lengthOfLastWord(s) {
  let i = s.length - 1;
  let res = 0;
  while (s[i] === " " && i >= 0) i--;
  if (i === 0) return s[i] === " " ? 0 : 1;
  while (s[i] !== " " && i >= 0) {
    i--;
    res++;
  }
  return res;
}

// 141. Linked List Cycle

function hasCycle(head) {
  if (!head) return false;
  while (head.next) {
    if (head.val === "x") return true;
    head.val = "x";
    head = head.next;
  }
  return false;
}

// 160. Intersection of Two Linked Lists

function getIntersectionNode(headA, headB) {
  headA.seen = true;
  while (headA.next) {
    headA.next.seen = true;
    headA = headA.next;
  }
  while (headB.next) {
    if (headB.seen) return headB;
    headB = headB.next;
  }
  if (headB.seen) return headB;
  return null;
}

// 5. Longest Palindromic Substring

function longestPalindrome(s) {
  let res = "";
  function expand(l, r) {
    while (l >= 0 && r < s.length) {
      if (s[l] !== s[r]) break;
      let pal = s.substring(l, r + 1);
      if (pal.length > res.length) res = pal;
      l--;
      r++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return res;
}

// 100. Same Tree

function isSameTree(p, q) {
  let pStack = [p];
  let qStack = [q];

  while (pStack.length) {
    let currP = pStack.pop();
    let currQ = qStack.pop();
    if (currP && currQ) {
      if (currP.val !== currQ.val) return false;
      for (let node of [currP.left, currP.right]) {
        pStack.push(node);
      }
      for (let node of [currQ.left, currQ.right]) {
        qStack.push(node);
      }
    } else if (!currP && !currQ) continue;
    else return false;
  }
  if (qStack.length) return false;
  return true;
}

// 18. 4Sum

function fourSum(nums, target) {
  let res = [];
  if (nums.length === 4 && nums.reduce((a, c) => a + c, 0) === target)
    return [nums];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 3; i++) {
    for (let j = i + 1; j < nums.length - 2; j++) {
      let l = j + 1;
      let r = nums.length - 1;
      while (l < r) {
        let sum = nums[i] + nums[j] + nums[l] + nums[r];
        if (sum < target) l++;
        else if (sum > target) r--;
        else {
          res.push([nums[i], nums[j], nums[l], nums[r]]);
          let lastL = nums[l];
          let lastR = nums[r];
          while (nums[l] === lastL) l++;
          while (nums[r] === lastR) r--;
        }
      }
      while (nums[j] === nums[j + 1]) j++;
    }
    while (nums[i] === nums[i + 1]) i++;
  }
  return res;
}

// 59. Spiral Matrix II

function generateMatrix(n) {
  if (n === 1) return [[1]];
  let res = Array.from(Array(n), () => new Array(n).fill(0));
  let curr = 0;
  let top = 0;
  let right = n - 1;
  let bottom = n - 1;
  let left = 0;
  let side = "top";
  while (curr !== n * n) {
    switch (side) {
      case "top":
        for (let i = left; i <= right; i++) {
          res[top][i] = ++curr;
        }
        side = "right";
        top++;
        break;
      case "right":
        for (let i = top; i <= bottom; i++) {
          res[i][right] = ++curr;
        }
        side = "bottom";
        right--;
        break;
      case "bottom":
        for (let i = right; i >= left; i--) {
          res[bottom][i] = ++curr;
        }
        side = "left";
        bottom--;

        break;
      case "left":
        for (let i = bottom; i >= top; i--) {
          res[i][left] = ++curr;
        }
        side = "top";
        left++;
        break;
      default:
        break;
    }
  }
  return res;
}

// 167. Two Sum II - Input Array Is Sorted

function twoSum2(numbers, target) {
  let obj = {};
  for (let i = 0; i < numbers.length; i++) {
    let targetVal = target - numbers[i];
    if (obj[targetVal] !== undefined) return [obj[targetVal], i + 1];
    obj[numbers[i]] = i + 1;
  }
}

// 1929. Concatenation of Array

function getConcatenation(nums) {
  return [...nums, ...nums];
}

// 1920. Build Array from Permutation

function buildArray(nums) {
  let ans = [];
  for (let i = 0; i < nums.length; i++) {
    ans.push(nums[nums[i]]);
  }
  return ans;
}

// 1512. Number of Good Pairs

function numIdenticalPairs(nums) {
  let res = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    let j = i + 1;
    while (j < nums.length) {
      if (nums[i] === nums[j]) res++;
      j++;
    }
  }
  return res;
}

// 2011. Final Value of Variable After Performing Operations

function finalValueAfterOperations(operations) {
  let x = 0;
  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === "--X" || operations[i] === "X--") x -= 1;
    else if (operations[i] === "++X" || operations[i] === "X++") x += 1;
  }
  return x;
}

// 1470. Shuffle the Array

function shuffle(nums, n) {
  let i = 0;
  let j = 0;
  let res = [];
  while (res.length < nums.length) {
    res.push(nums[i]);
    i += n;
    if (i >= nums.length) {
      j++;
      i = j;
    }
  }
  return res;
}

// 2942. Find Words Containing Character

function findWordsContaining(words, x) {
  let res = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i].includes(x)) res.push(i);
  }
  return res;
}

// 1637. Widest Vertical Area Between Two Points Containing No Points

function maxWidthOfVerticalArea(points) {
  let res = 0;
  let arr = points.map((p) => p[0]).sort((a, b) => a - b);
  let i = 0;
  while (i < arr.length - 1) {
    res = Math.max(arr[i + 1] - arr[i], res);
    i++;
  }
  return res;
}

// 2798. Number of Employees Who Met the Target

function numberOfEmployeesWhoMetTarget(hours, target) {
  return hours.filter((h) => h >= target).length;
}

// 2824. Count Pairs Whose Sum is Less than Target

function countPairs(nums, target) {
  nums.sort((a, b) => a - b);
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    let j = i + 1;
    if (nums[i] + nums[j] >= target) break;
    while (nums[i] + nums[j] < target) {
      res++;
      j++;
    }
  }
  return res;
}

// 22. Generate Parentheses

function generateParenthesis(n) {
  let res = [];
  recursive(n, 0, "", res);
  return res;
}
function recursive(open, close, output, res) {
  if (open === 0 && close === 0) {
    res.push(output);
  }
  if (open > 0) recursive(open - 1, close + 1, output + "(", res);
  if (close > 0) recursive(open, close - 1, output + ")", res);
}

// 1480. Running Sum of 1d Array

function runningSum(nums) {
  for (let i = 1; i < nums.length; i++) {
    nums[i] = nums[i] + nums[i - 1];
  }
  return nums;
}

// 1365. How Many Numbers Are Smaller Than the Current Number

function smallerNumbersThanCurrent(nums) {
  let sorted = nums.toSorted((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    nums[i] = sorted.indexOf(nums[i]);
  }
  return nums;
}

// 2114. Maximum Number of Words Found in Sentences

function mostWordsFound(sentences) {
  let res = 0;
  for (let i = 0; i < sentences.length; i++) {
    res = Math.max(res, sentences[i].split(" ").length);
  }
  return res;
}

// 2859. Sum of Values at Indices With K Set Bits

function sumIndicesWithKSetBits(nums, k) {
  let arr = [];
  for (let i = 0; i < nums.length; i++) {
    let x = i.toString(2).replaceAll("0", "").length;
    if (x === k) arr.push(nums[i]);
  }
  return arr.reduce((a, b) => a + b, 0);
}

// 2574. Left and Right Sum Differences

function leftRightDifference(nums) {
  if (nums.length === 1) return [0];
  let res = [];
  let leftSum = 0;
  let rightSum = nums.slice(1).reduce((a, b) => a + b, 0);
  for (let i = 0; i < nums.length; i++) {
    res.push(Math.abs(leftSum - rightSum));
    leftSum += nums[i];
    rightSum -= nums[i + 1];
  }
  return res;
}

// 1389. Create Target Array in the Given Order

function createTargetArray(nums, index) {
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    res.splice(index[i], 0, nums[i]);
  }
  return res;
}

// 41. First Missing Positive

function firstMissingPositive(nums) {
  let set = new Set(nums);
  let i = 1;
  while (set.has(i)) i++;
  return i;
}

// 2910. Minimum Number of Groups to Create a Valid Assignment

// function minGroupsForValidAssignment(balls) {
//   let freq = {};
//   for (let num of balls) {
//     freq[num] = freq[num] + 1 || 1;
//   }
//   let values = Object.values(freq).sort((a, b) => a - b);
//   let n = values.length - 1;
//   let target = values[0] + 1;
//   while (n >= 0) {
//     if (values[n] > target) {
//       let excess =
//         Math.floor(values[n] / 2) > target
//           ? values[n] - target
//           : Math.floor(values[n] / 2);
//       values.splice(n + 1, 0, excess);
//       values[n] = values[n] - excess;
//       if (excess < target) {
//         target = excess + 1;
//         n = values.length - 1;
//       }
//     }
//     if (values[n + 1] > target) n++;
//     else if (values[n] > target) continue;
//     else n--;
//   }
//   return values.length;
// }

// 713. Subarray Product Less Than K

function numSubarrayProductLessThanK(nums, k) {
  let res = 0;
  if (k === 0) return res;
  let l = 0;
  let sub = 1;
  for (let r = 0; r < nums.length; r++) {
    sub *= nums[r];
    while (sub >= k && l <= r) {
      sub /= nums[l];
      l++;
    }
    res += r - l + 1;
  }
  return res;
}

// 2958. Length of Longest Subarray With at Most K Frequency

function maxSubarrayLength(nums, k) {
  let res = 0;
  let freq = {};
  let l = 0;
  let count = 0;
  for (let r = 0; r < nums.length; r++) {
    freq[nums[r]] = freq[nums[r]] + 1 || 1;
    count++;
    while ((freq[nums[l]] > k || freq[nums[r]] > k) && l <= r) {
      freq[nums[l]]--;
      count--;
      l++;
    }
    res = Math.max(count, res);
  }
  return res;
}

// 2810. Faulty Keyboard

function finalString(s) {
  let res = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "i") res.reverse();
    else res.push(s[i]);
  }
  return res.join("");
}

// 2962. Count Subarrays Where Max Element Appears at Least K Times

function countSubarrays(nums, k) {
  let max = Math.max(...nums);
  let res = 0;
  let count = 0;
  let l = 0;
  for (let r = 0; r < nums.length; r++) {
    if (nums[r] === max) count++;
    while (count >= k) {
      res += nums.length - r;
      if (nums[l] === max) count--;
      l++;
    }
  }
  return res;
}

// 992. Subarrays with K Different Integers

function subarraysWithKDistinct(nums, k) {
  let res = 0;
  let freq = {};
  let l = 0;
  let r = 0;
  let size = 0;
  while (r < nums.length) {
    if (nums[r] in freq) {
      freq[nums[r]]++;
    } else {
      freq[nums[r]] = 1;
      size++;
    }
    while (size == k) {
      let count = 0;
      let j = r + 1;
      while (nums[j++] in freq) {
        count++;
      }
      res += count + 1;
      freq[nums[l]]--;
      if (freq[nums[l]] == 0) {
        size--;
        delete freq[nums[l]];
      }
      l++;
    }
    r++;
  }
  return res;
}

// 2444. Count Subarrays With Fixed Bounds

function countSubarrays2(nums, minK, maxK) {
  let res = 0;
  let bad = -1,
    l = -1,
    r = -1;
  for (let i = 0; i < nums.length; ++i) {
    if (!(minK <= nums[i] && nums[i] <= maxK)) bad = i;
    if (nums[i] === minK) l = i;
    if (nums[i] === maxK) r = i;
    res += Math.max(0, Math.min(l, r) - bad);
  }
  return res;
}

// 1535. Find the Winner of an Array Game

function getWinner(arr, k) {
  if (k === 1) return Math.max(arr[0], arr[1]);
  let max = arr[0];
  let wins = 0;
  let i = 1;
  while (wins < k && i < arr.length) {
    wins++;
    if (max < arr[i]) {
      max = arr[i];
      wins = 1;
    }
    i++;
  }
  return max;
}

// 205. Isomorphic Strings

function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  let dictS = {};
  let dictT = {};
  for (let i = 0; i < s.length; i++) {
    if (dictS[s[i]] !== dictT[t[i]]) return false;
    dictS[s[i]] = i;
    dictT[t[i]] = i;
  }
  return true;
}

// 79. Word Search

function exists(board, word) {
  let dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let backtrack = (y, x, k) => {
    if (k === word.length) return true;
    if (
      y < 0 ||
      x < 0 ||
      y >= board.length ||
      x >= board[0].length ||
      board[y][x] !== word[k]
    )
      return false;
    board[y][x] = "";
    for (const [dY, dX] of dirs) {
      if (backtrack(y + dY, x + dX, k + 1)) {
        return true;
      }
    }
    board[y][x] = word[k];
  };
  for (let y = 0; y < board.length; ++y) {
    for (let x = 0; x < board[0].length; ++x) {
      if (board[y][x] === word[0] && backtrack(y, x, 0)) return true;
    }
  }
  return false;
}

// 1614. Maximum Nesting Depth of the Parentheses

function maxDepth(s) {
  let res = 0;
  if (s === "") return res;
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      count++;
      res = Math.max(count, res);
    } else if (s[i] === ")") count--;
  }
  return res;
}

// 1544. Make The String Great

function makeGood(s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    let lifo = stack[stack.length - 1] || null;
    if (
      (s[i].toLowerCase() === lifo || s[i].toUpperCase() === lifo) &&
      s[i] !== lifo
    )
      stack.pop();
    else stack.push(s[i]);
  }
  return stack.join("");
}

// 1249. Minimum Remove to Make Valid Parentheses

function minRemoveToMakeValid(s) {
  let toArr = [];
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") stack.push(i);
    else if (s[i] === ")") {
      if (stack.length) stack.pop();
      else {
        toArr.push("");
        continue;
      }
    }
    toArr.push(s[i]);
  }
  for (let i = 0; i < stack.length; i++) {
    toArr[stack[i]] = "";
  }
  return toArr.join("");
}

// 678. Valid Parenthesis String

function checkValidString(s) {
  let openStack = [];
  let astStack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") openStack.push(i);
    else if (s[i] === "*") astStack.push(i);
    else {
      if (openStack.length) openStack.pop();
      else if (astStack.length) astStack.pop();
      else return false;
    }
  }
  while (openStack.length && astStack.length) {
    if (openStack.pop() > astStack.pop()) return false;
  }
  return openStack.length === 0;
}

// 1700. Number of Students Unable to Eat Lunch

function countStudents(students, sandwiches) {
  while (students.length) {
    let s1 = students.shift();
    if (s1 === sandwiches[0]) sandwiches.shift();
    else students.push(s1);
    if (students.indexOf(sandwiches[0]) === -1) return students.length;
  }
  return 0;
}

// 2073. Time Needed to Buy Tickets

function timeRequiredToBuy(tickets, k) {
  let res = 0;
  let kTickets = tickets[k];
  for (let i = 0; i < tickets.length; i++) {
    if (i <= k) {
      time += Math.min(tickets[i], kTickets);
    } else {
      time += Math.min(tickets[i], kTickets - 1);
    }
  }
  return res;
}

// 950. Reveal Cards In Increasing Order

function deckRevealedIncreasing(deck) {
  let stack = deck.sort((a, b) => b - a);
  let queue = [stack.shift()];
  debugger;
  while (stack.length > 0) {
    queue.unshift(queue.pop());
    queue.unshift(stack.shift());
  }
  return queue;
}

// 402. Remove K Digits

function removeKdigits(num, k) {
  if (num.length === k) return "0";
  let stack = [];
  for (let int of num) {
    while (k && stack.length && int < stack[stack.length - 1]) {
      stack.pop();
      k--;
    }
    stack.push(int);
  }
  while (k) {
    stack.pop();
    k--;
  }
  let res = stack.join("").replace(/^0+/, "");
  return res ? res : "0";
}

// 42. Trapping Rain Water

function trap(height) {
  let l = 0,
    r = height.length - 1;
  let lHeight = height[l],
    rHeight = height[r];
  let res = 0;
  while (l < r) {
    if (lHeight < rHeight) {
      l++;
      lHeight = Math.max(lHeight, height[l]);
      res += lHeight - height[l];
    } else {
      r--;
      rHeight = Math.max(rHeight, height[r]);
      res += rHeight - height[r];
    }
  }
  return res;
}

// 85. Maximal Rectangle

function maximalRectangle() {
  if (!matrix.length) return 0;
  const n = matrix[0].length;
  const heights = new Array(n + 1).fill(0);
  let maxArea = 0;
  for (let row of matrix) {
    for (let i = 0; i < n; i++) {
      heights[i] = row[i] === "1" ? heights[i] + 1 : 0;
    }
    const stack = [-1];
    for (let i = 0; i < n + 1; i++) {
      while (heights[i] < heights[stack[stack.length - 1]]) {
        const h = heights[stack.pop()];
        const w = i - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, h * w);
      }
      stack.push(i);
    }
  }
  return maxArea;
}

// let matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]

// console.log(maximalRectangle(matrix))

// 404. Sum of Left Leaves

function sumOfLeftLeaves(root) {
  let res = 0;
  function dfs(node, dir) {
    if (!node.left && !node.right && dir === "left") res += node.val;
    if (node.left) dfs(node.left, "left");
    if (node.right) dfs(node.right, "right");
  }
  dfs(root, "root");
  return res;
}

// 129. Sum Root to Leaf Numbers

function sumNumbers(root) {
  let res = 0;
  function dfs(node, count) {
    if (!node.left && !node.right) res += count * 10 + node.val;
    if (node.left) dfs(node.left, count * 10 + node.val);
    if (node.right) dfs(node.right, count * 10 + node.val);
  }
  dfs(root, 0);
  return res;
}
