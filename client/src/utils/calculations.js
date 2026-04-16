// -----------------------------
// TOP 3 MOST FREQUENT NUMBERS
// -----------------------------
export function getTopThreeNumbers(data) {
  if (!Array.isArray(data)) return [];

  const frequency = {};

  data.forEach((draw) => {
    draw.numbers?.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([num]) => num);
}


// -----------------------------
// TOP 3 MOST FREQUENT PAIRS
// -----------------------------
export function getTopThreePairs(data) {
  if (!Array.isArray(data)) return [];

  const frequency = {};

  data.forEach((draw) => {
    const nums = draw.numbers || [];

    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        const pair = [nums[i], nums[j]]
          .sort((a, b) => Number(a) - Number(b))
          .join("-");

        frequency[pair] = (frequency[pair] || 0) + 1;
      }
    }
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([pair]) => pair.split("-"));
}


// -----------------------------
// TOP 3 MOST FREQUENT TRIPLETS
// -----------------------------
export function getTopThreeTriplets(data) {
  if (!Array.isArray(data)) return [];

  const frequency = {};

  data.forEach((draw) => {
    const nums = draw.numbers || [];

    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        for (let k = j + 1; k < nums.length; k++) {
          const triplet = [nums[i], nums[j], nums[k]]
            .sort((a, b) => Number(a) - Number(b))
            .join("-");

          frequency[triplet] = (frequency[triplet] || 0) + 1;
        }
      }
    }
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([triplet]) => triplet.split("-"));
}