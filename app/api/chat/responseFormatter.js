// Utility function to format game data for replies

export function formatGames(games, searchedGame, genre, platform) {
  if (!games.length) {
    if (searchedGame) {
      return `Sorry, I couldn't find any games similar to "${searchedGame}".`;
    } else if (genre) {
      return `Sorry, I couldn't find any games in the "${genre}" genre.`;
    } else if (platform) {
      return `Sorry, I couldn't find any games for the "${platform}" platform.`;
    } else {
      return "Sorry, I couldn't find any games.";
    }
  }

  const gameNames = games.map((game) => game.name).join(", ") + ".";

  if (searchedGame) {
    const responses = [
      `Here are some amazing games similar to "${searchedGame}" that you might enjoy:\n\n${gameNames}`,
      `Looking for games like "${searchedGame}"? Check these out:\n\n${gameNames}`,
      `If you liked "${searchedGame}", you might also enjoy these games:\n\n${gameNames}`,
      `Games similar to "${searchedGame}" that you should try:\n\n${gameNames}`
    ];

    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  } else if (genre) {
    return `Here are some top-rated games in the "${genre}" genre:\n\n${gameNames}`;
  } else if (platform) {
    return `Here are some top-rated games for the "${platform}" platform:\n\n${gameNames}`;
  }

  return `Here are some games you might enjoy:\n\n${gameNames}`;
}