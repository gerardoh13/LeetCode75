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

