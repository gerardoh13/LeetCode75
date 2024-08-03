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
