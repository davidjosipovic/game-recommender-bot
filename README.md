# Game Recommender Bot

## Overview
The Game Recommender Bot is a web application designed to suggest games based on user preferences such as platform, genre, or similar games. It leverages APIs and utilities to fetch, process, and format game recommendations, providing users with a seamless experience.

## Features
- **Game Recommendations**: Get suggestions based on platform, genre, or similar games.
- **Natural Language Processing**: Understands user queries using Wit.ai.
- **Interactive Chat Interface**: Communicate with the bot in a user-friendly chat interface.
- **Platform and Genre Filtering**: Filter recommendations by specific platforms or genres.

## Project Structure
```
jsconfig.json
next.config.mjs
package.json
postcss.config.mjs
README.md
app/
	favicon.ico
	globals.css
	layout.js
	page.js
	api/
		chat/
			gameSearch.js
			gameUtils.js
			genreUtils.js
			platformUtils.js
			responseFormatter.js
			route.js
			witAiUtils.js
public/
	file.svg
	globe.svg
	next.svg
	robot_icon.png
	vercel.svg
	window.svg
```

### Key Directories and Files
- **app/**: Contains the main application files.
  - **api/chat/**: Includes utilities and routes for handling chat-based game recommendations.
    - `gameSearch.js`: Handles game search logic using IGDB API.
    - `gameUtils.js`: Utility functions for game-related operations.
    - `genreUtils.js`: Utility functions for genre-related operations.
    - `platformUtils.js`: Utility functions for platform-related operations.
    - `responseFormatter.js`: Formats game data into user-friendly responses.
    - `route.js`: Defines the API route for chat-based recommendations.
    - `witAiUtils.js`: Integrates with Wit.ai for natural language processing.
  - `globals.css`: Global styles for the application.
  - `layout.js` and `page.js`: Define the layout and main page of the application.
- **public/**: Contains static assets like images and icons.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/game-recommender-bot.git
   ```
2. Navigate to the project directory:
   ```bash
   cd game-recommender-bot
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     IGDB_CLIENT_ID=your_igdb_client_id
     IGDB_ACCESS_TOKEN=your_igdb_access_token
     WIT_AI_SERVER_ACCESS_TOKEN=your_wit_ai_access_token
     ```

## Usage
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.
3. Interact with the bot to get game recommendations.

## Technologies Used
- **Next.js**: Framework for building the web application.
- **IGDB API**: Provides game data for recommendations.
- **Wit.ai**: Processes natural language queries.
- **Tailwind CSS**: Styles the user interface.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments
- [IGDB API](https://www.igdb.com/api) for game data.
- [Wit.ai](https://wit.ai/) for natural language processing.
