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
