import { NextResponse } from "next/server";
import { fetchWitAiData } from "./witAiUtils";
import { fetchGamesFromIGDB } from "./gameSearch";
import { formatGames } from "./responseFormatter";

const conversationState = new Map();

export async function POST(request) {
  try {
    const { message, sessionId } = await request.json();

    // Retrieve or initialize conversation state
    const state = conversationState.get(sessionId) || { step: 0, data: {} };

    const { intent, platform, genre = [], similarGame } = await fetchWitAiData(message);

    if (state.step === 0) {
      if (intent === "greet") {
        const greetings = [
          "Hello! How can I assist you today?",
          "Hi there! What can I do for you?",
          "Hey! How can I help you?",
          "Greetings! How may I assist you?",
        ];
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        return NextResponse.json({ reply: randomGreeting });
      }

      if (intent === "farewell") {
        return NextResponse.json({ reply: "Goodbye! Have a great day!" });
      }

      if (intent === "thank_you") {
        return NextResponse.json({ reply: "You're welcome! If you need anything else, feel free to ask." });
      }

      if (intent === "help") {
        return NextResponse.json({ reply: "I can help you find game recommendations based on platform, genre, or similar games. Just let me know what you're looking for!" });
      }

      if (intent === "exit") {
        conversationState.delete(sessionId);
        return NextResponse.json({ reply: "Alright, I've reset our conversation. Let me know if you need anything else!" });
      }

      if (intent === "GameRecommendation") {
        if (similarGame && !platform.length && !genre.length) {
          conversationState.set(sessionId, { step: 3, data: { similarGame } });
          return NextResponse.json({ reply: "Would you like to specify a genre or platform for filtering?" });
        }

        if (!platform.length && !genre.length && !similarGame) {
          // Not enough information, ask follow-up question
          conversationState.set(sessionId, { step: 1, data: {} });
          return NextResponse.json({ reply: "What platform or genre are you interested in?" });
        }

        // Proceed with game recommendation
        const games = await fetchGamesFromIGDB({ platform, genre, similarGame });
        const reply = formatGames(games, similarGame);
        return NextResponse.json({ reply });
      }

      return NextResponse.json({ reply: "I'm not sure what you're asking. Could you clarify?" });
    }

    if (state.step === 1) {
      // Process follow-up response
      if (intent === "exit") {
        conversationState.delete(sessionId);
        return NextResponse.json({ reply: "Alright, I've reset our conversation. Let me know if you need anything else!" });
      }

      if (platform.length) state.data.platform = platform;
      if (genre.length) state.data.genre = genre;

      if (!state.data.platform && !state.data.genre) {
        return NextResponse.json({ reply: "I still need to know the platform or genre you're interested in." });
      }

      // Proceed with game recommendation
      const games = await fetchGamesFromIGDB({
        platform: state.data.platform || platform,
        genre: state.data.genre || genre,
        similarGame,
      });
      const reply = formatGames(games, similarGame);

      // Clear conversation state
      conversationState.delete(sessionId);
      return NextResponse.json({ reply });
    }

    if (state.step === 3) {
      if (intent === "exit") {
        conversationState.delete(sessionId);
        return NextResponse.json({ reply: "Alright, I've reset our conversation. Let me know if you need anything else!" });
      }

      if (platform.length || genre.length) {
        state.data.platform = platform;
        state.data.genre = genre;

        const games = await fetchGamesFromIGDB({
          platform: state.data.platform || [],
          genre: state.data.genre || [],
          similarGame: state.data.similarGame,
        });

        conversationState.delete(sessionId);
        const reply = formatGames(games, state.data.similarGame);
        return NextResponse.json({ reply });
      }

      if (message.toLowerCase() === "no") {
        const games = await fetchGamesFromIGDB({ similarGame: state.data.similarGame });
        conversationState.delete(sessionId);
        const reply = formatGames(games, state.data.similarGame);
        return NextResponse.json({ reply });
      }

      return NextResponse.json({ reply: "Please specify a genre or platform, or say 'no' to skip filtering." });
    }

    return NextResponse.json({ reply: "An unexpected error occurred." });
  } catch (error) {
    console.error("Error in game recommendation endpoint:", error);
    return NextResponse.json(
      { reply: "An error occurred while processing your request. Please try again later." },
      { status: 500 }
    );
  }
}
