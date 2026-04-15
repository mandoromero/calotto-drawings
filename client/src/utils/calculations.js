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