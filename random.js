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
  debugger;
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
//   debugger;
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
