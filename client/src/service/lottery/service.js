// client/src/service/lottery/service.js
export async function fetchLotteryData(game) {
  try {
    const res = await fetch(`http://localhost:5000/api/lotto/${game}`);
    if (!res.ok) throw new Error(`Failed to fetch ${game}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}