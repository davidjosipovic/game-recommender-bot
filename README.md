# Game Recommender Bot

## Overview
The Game Recommender Bot is a web application designed to suggest games similar to a user-provided game title. It leverages APIs and utilities to fetch, process, and format game recommendations, providing users with a seamless experience.

## Features
- Fetches game recommendations based on user input.
- Formats game data into user-friendly responses.
- Utilizes external APIs for game data and natural language processing.

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
			igdbUtils.js
			responseFormatter.js
			route.js
			witAiUtils.js
public/
	file.svg
	globe.svg
	next.svg
	vercel.svg
	window.svg
```

### Key Directories and Files
- **app/**: Contains the main application files.
  - **api/chat/**: Includes utilities and routes for handling chat-based game recommendations.
    - `igdbUtils.js`: Handles interactions with the IGDB API.
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

## Usage
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.
3. Enter a game title to receive recommendations.

## Technologies Used
- **Next.js**: Framework for building the web application.
- **IGDB API**: Provides game data for recommendations.
- **Wit.ai**: Enables natural language understanding for user input.

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
