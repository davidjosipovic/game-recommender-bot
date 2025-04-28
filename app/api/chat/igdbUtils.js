// Utility functions for IGDB API interactions

export async function fetchPlatformId(platformName) {
  const response = await fetch("https://api.igdb.com/v4/platforms", {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID,
      Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: `
      fields id;
      where name ~ *"${platformName}"*;
      limit 1;
    `,
  });

  if (!response.ok) throw new Error("Failed to fetch platform ID");

  const data = await response.json();
  return data[0]?.id || null;
}

export async function fetchGenreId(genreName) {
  const response = await fetch("https://api.igdb.com/v4/genres", {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID,
      Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: `
      fields id;
      where name ~ *"${genreName}"*;
      limit 1;
    `,
  });

  if (!response.ok) throw new Error("Failed to fetch genre ID");

  const data = await response.json();
  return data[0]?.id || null;
}

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

export async function fetchGamesFromIGDB({ platform, genre, similarGame }) {
  let whereParts = [];

  if (similarGame) {
    const similarGameResponse = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: `
        fields similar_games;
        search "${similarGame}";
        limit 1;
      `,
    });

    if (!similarGameResponse.ok) throw new Error("Failed to fetch similar game data");

    const similarGameData = await similarGameResponse.json();
    const similarGameIds = similarGameData[0]?.similar_games || [];

    if (similarGameIds.length) {
      const similarGamesResponse = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: `
          fields id, name, first_release_date, rating;
          where id = (${similarGameIds.join(",")});
        `,
      });

      if (!similarGamesResponse.ok) throw new Error("Failed to fetch similar games names");

      const similarGamesData = await similarGamesResponse.json();
      return similarGamesData.map(game => ({
        id: game.id,
        name: game.name,
        releaseYear: game.first_release_date
          ? new Date(game.first_release_date * 1000).getFullYear()
          : "unknown year",
        rating: game.rating ? `${Math.round(game.rating)}%` : "no rating",
      }));
    }
  }

  if (platform) {
    const platformId = await fetchPlatformId(platform);
    if (platformId) {
      whereParts.push(`platforms != null & platforms = (${platformId})`);
    }
  }

  if (genre) {
    const genreId = await fetchGenreId(genre);
    if (genreId) {
      whereParts.push(`genres != null & genres = (${genreId})`);
    }
  }

  const whereClause = whereParts.length ? `where ${whereParts.join(' & ')};` : "";

  const igdbResponse = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_CLIENT_ID,
      Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: `
      fields id, name, genres.name, rating, first_release_date;
      ${whereClause}
      sort rating desc;
      limit 3;
    `,
  });

  if (!igdbResponse.ok) {
    throw new Error("Failed to fetch games from IGDB");
  }

  const gamesData = await igdbResponse.json();
  return gamesData.map(game => ({
    id: game.id,
    name: game.name,
    releaseYear: game.first_release_date
      ? new Date(game.first_release_date * 1000).getFullYear()
      : "unknown year",
    rating: game.rating ? `${Math.round(game.rating)}%` : "no rating",
  }));
}