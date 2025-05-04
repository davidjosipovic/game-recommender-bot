// Utility functions for Wit.ai API interactions

export async function fetchWitAiData(message) {
  const witResponse = await fetch(
    `https://api.wit.ai/message?v=20230428&q=${encodeURIComponent(message)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.WIT_AI_SERVER_ACCESS_TOKEN}`,
      },
    }
  );

  if (!witResponse.ok) {
    throw new Error("Failed to fetch response from Wit.ai");
  }

  const witData = await witResponse.json();
  const intent = witData.intents?.[0]?.name || null;
  const platform = Array.from(new Set(
    (witData.entities?.['platform:platform'] || []).map(g => g.value.toLowerCase())
  ));  
  const genre = Array.from(new Set(
    (witData.entities?.['genre:genre'] || []).map(g => g.value.toLowerCase())
  ));  
  const similarGame = witData.entities?.['similar_game:similar_game']?.[0]?.value || null;

  return { intent, platform, genre, similarGame };
}