// Utility function to format game data for replies

export function formatGames(games, searchedGame) {
  if (!games.length) {
    return `Sorry, I couldn't find any games similar to "${searchedGame}".`;
  }

  const gameNames = games.map((game) => game.name).join(", ") + ".";

  const responses = [
    `Here are some amazing games similar to "${searchedGame}" that you might enjoy:\n\n${gameNames}`,
    `Looking for games like "${searchedGame}"? Check these out:\n\n${gameNames}`,
    `If you liked "${searchedGame}", you might also enjoy these games:\n\n${gameNames}`,
    `Games similar to "${searchedGame}" that you should try:\n\n${gameNames}`
  ];

  // Randomly select a response template
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}