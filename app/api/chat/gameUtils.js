// Utility functions for game-related operations

export async function fetchSimilarGameId(similarGameName) {
  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID,
      Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: `
      fields name,similar_games;
      search "${similarGameName}";
    `,
  });

  if (!response.ok) throw new Error("Failed to fetch similar game ID");

  const data = await response.json();
  return data[0]?.id || null;
}