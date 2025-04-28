import { NextResponse } from "next/server";
import { fetchWitAiData } from "./witAiUtils";
import { fetchGamesFromIGDB } from "./igdbUtils";
import { formatGames } from "./responseFormatter";

export async function POST(request) {
  try {
    const { message } = await request.json();
    const { intent, platform, genre, similarGame } = await fetchWitAiData(message);

    if (intent !== "GameRecommendation") {
      return NextResponse.json({ reply: "I'm not sure what you're asking. Could you clarify?" });
    }

    const games = await fetchGamesFromIGDB({ platform, genre, similarGame });
    const reply = formatGames(games, similarGame);

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Error in game recommendation endpoint:", error);
    return NextResponse.json(
      { reply: "An error occurred while processing your request. Please try again later." },
      { status: 500 }
    );
  }
}
