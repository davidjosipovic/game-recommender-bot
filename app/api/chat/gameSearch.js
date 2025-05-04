// Utility functions for searching games in IGDB

import { fetchPlatformId } from "./platformUtils";
import { fetchGenreId } from "./genreUtils";

export async function fetchGamesFromIGDB({ platform, genre, similarGame }) {

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
      const platformIds = platform ? await Promise.all(platform.map(fetchPlatformId)) : [];
      const validPlatformIds = platformIds.filter(id => id !== null);
  
      const genreIds = genre ? await Promise.all(genre.map(fetchGenreId)) : [];
      const validGenreIds = genreIds.filter(id => id !== null);
  
      const platformConditions = validPlatformIds.length
        ? validPlatformIds.map(id => `platforms = (${id})`).join(" & ")
        : null;
  
      const genreConditions = validGenreIds.length
        ? validGenreIds.map(id => `genres = (${id})`).join(" & ")
        : null;
  
      const combinedConditions = [
        `id = (${similarGameIds.join(",")})`,
        platformConditions,
        genreConditions,
      ]
        .filter(condition => condition !== null)
        .join(" & ");
  
      const bodyContent = `
        fields name;
        where ${combinedConditions};
        sort rating desc;
        limit 10;
      `;
  
      const filteredGamesResponse = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: bodyContent,
      });
  
      if (!filteredGamesResponse.ok) throw new Error("Failed to fetch filtered similar games");
  
      const filteredGamesData = await filteredGamesResponse.json();
      return filteredGamesData.map(game => ({
        name: game.name,
      }));
    }
  }

  if (genre && platform.length==0 && !similarGame) {
    const genreIds = await Promise.all(genre.map(fetchGenreId));
    const validGenreIds = genreIds.filter(id => id !== null);

    if (validGenreIds.length) {
      const genreConditions = validGenreIds.map(id => `genres = (${id})`).join(" & ");
      console.log("Genre conditions:", genreConditions);
      const igdbResponse = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: `
          fields name;
          where ${genreConditions} & rating != null & rating_count >= 40 & version_parent = null;
          sort rating desc;
          limit 10;
        `,
      });

      if (!igdbResponse.ok) {
        throw new Error("Failed to fetch games from IGDB");
      }

      const gamesData = await igdbResponse.json();
      return gamesData.map(game => ({
        name: game.name,
      }));
    }
  }

  if (platform && genre.length==0 && !similarGame) {
    console.log("Platform:", platform);
    const platformIds = await Promise.all(platform.map(fetchPlatformId));
    console.log("Platform IDs:", platformIds);
    const validPlatformIds = platformIds.filter(id => id !== null);

    if (validPlatformIds.length) {
      const platformConditions = validPlatformIds.map(id => `platforms = (${id})`).join(" & ");
      console.log("Platform conditions:", platformConditions);
      const igdbResponse = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: `
          fields name;
          where ${platformConditions} & rating != null & rating_count >= 40 & version_parent = null;
          sort rating desc;
          limit 10;
        `,
      });

      if (!igdbResponse.ok) {
        throw new Error("Failed to fetch games from IGDB");
      }

      const gamesData = await igdbResponse.json();
      return gamesData.map(game => ({
        name: game.name,
      }));
    }
  }
  if (platform.length>0 && genre.length>0 && !similarGame) {
    console.log("Platform:", platform);
    console.log("Genre:", genre);
    const platformIds = await Promise.all(platform.map(fetchPlatformId));
    const validPlatformIds = platformIds.filter(id => id !== null);
  
    const genreIds = await Promise.all(genre.map(fetchGenreId));
    const validGenreIds = genreIds.filter(id => id !== null);
  
    if (validPlatformIds.length && validGenreIds.length) {
      const platformConditions = validPlatformIds.map(id => `platforms = (${id})`).join(" & ");
      const genreConditions = validGenreIds.map(id => `genres = (${id})`).join(" & ");
  
      const combinedConditions = `${platformConditions} & ${genreConditions}`;
  
      const igdbResponse = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
          "Client-ID": process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: `
          fields name;
          where ${combinedConditions} & rating != null & rating_count >= 40 & version_parent = null;
          sort rating desc;
          limit 10;
        `,
      });
  
      if (!igdbResponse.ok) {
        throw new Error("Failed to fetch games from IGDB");
      }
  
      const gamesData = await igdbResponse.json();
      return gamesData.map(game => ({
        name: game.name,
      }));
    }

  }
}

