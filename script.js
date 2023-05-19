function largestAltitude(gain) {
  let g = 0;
  let res = 0;
  for (let i = 0; i < gain.length; i++) {
    g += gain[i];
    if (g > res) res = g;
  }
  return res;
}

console.log(largestAltitude([-5, 1, 5, 0, -7]));
