# Signal Room — AI vs AI Debate Simulator

A responsive, browser-based educational project. Two simulated analyst agents debate a **fictional** company scenario, and a neutral moderator evaluates the quality of their reasoning.

## Features
- Three built-in fictional scenarios.
- Optimist and Skeptic agent roles with multiple debate rounds.
- Neutral judge with a transparent reasoning scorecard.
- Responsive layout for desktop and mobile.
- No API key, account, backend, live market feed, brokerage connection, or trade execution.

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Select a scenario and debate depth.
4. Click **Run debate**.

## Publish with GitHub Pages
1. Create a GitHub repository named `ai-vs-ai-debate-simulator`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site.

## Project structure
```text
ai-vs-ai-debate-simulator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Important limitations
This version uses prewritten, rule-based simulated agent responses. It is not connected to real AI services or live data. Scores are illustrative and do not represent investment analysis. The project is for programming and critical-thinking education only; it does not provide financial advice or execute transactions.

## Possible future engineering improvements
- Add a backend that safely orchestrates separate language-model agents.
- Store debate transcripts locally.
- Add user-created fictional scenarios and rubric settings.
- Add automated tests for the scoring and scenario logic.
