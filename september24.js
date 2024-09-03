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

