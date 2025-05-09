// Utility functions for genre-related operations

export async function fetchGenreId(genreName) {
  const genreMapping = {
    "point and click": 2,
    "point-and-click": 2,
    "fighting": 4,
    "shooter": 5,
    "music": 7,
    "platform": 8,
    "platformer": 8,
    "puzzle": 9,
    "racing": 10,
    "real time strategy": 11,
    "rts": 11,
    "role playing": 12,
    "rpg": 12,
    "simulator": 13,
    "sport": 14,
    "strategy": 15,
    "turn based strategy": 16,
    "tbs": 16,
    "tactical": 24,
    "hack and slash": 25,
    "beat 'em up": 25,
    "quiz": 26,
    "trivia": 26,
    "pinball": 30,
    "adventure": 31,
    "indie": 32,
    "arcade": 33,
    "visual novel": 34,
    "card and board game": 35,
    "card game": 35,
    "board game": 35,
    "moba": 36
  };

  const normalizedGenreName = genreName.toLowerCase();
  const genreId = genreMapping[normalizedGenreName];

  if (genreId) {
    return genreId;
  }

  const response = await fetch("https://api.igdb.com/v4/genres", {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID,
      Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: `
      fields id, name;
      where name ~ *"${genreName}"*;
      limit 1;
    `,
  });

  if (!response.ok) throw new Error("Failed to fetch genre ID");

  const data = await response.json();
  return data[0]?.id || null;
}