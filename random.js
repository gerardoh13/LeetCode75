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
