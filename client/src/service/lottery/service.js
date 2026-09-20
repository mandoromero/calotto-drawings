export async function fetchLotteryData(game) {
  const url = `http://localhost:5001/api/lotto/${game}`;

  console.log("FETCHING:", url);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${game}: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();

  console.log("RECEIVED:", game, data);

  return data;
}