var majorityElement = function (nums) {
  let len = nums.length;
  let i = [0, len - 1];
  let temp;
  let obj = {};
  let max = [0, null];

  function setObj(num) {
    temp = obj[num] = (obj[num] || 0) + 1;
    if (temp > max[0]) {
      max = [temp, num];
    }
  }

  while (i[0] < len / 2) {
    let x = nums[i[0]],
      y = nums[i[1]];
    if (i[0] === i[1]) {
      setObj(x);
    } else {
      setObj(x);
      setObj(y);
    }
    i[0]++;
    i[1]--;
  }

  return max[1];
};
