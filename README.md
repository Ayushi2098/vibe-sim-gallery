# VIBE Simulation Gallery

Interactive GeoGebra simulation viewer built with React, TypeScript, and Mafs.js.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API URL
```bash
cp .env.example .env
```

Edit `.env` to set your server URL:
```env
# For local development
VITE_API_URL=http://localhost:5555

# For production (replace with your deployed server URL)
# VITE_API_URL=https://your-server.herokuapp.com
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Environment Variables

- `VITE_API_URL` - URL of the GeoGebra simulation generation server
  - Default: `http://localhost:5555`
  - Production: Set to your deployed server URL

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Backend Server

This frontend requires the GeoGebra simulation server to be running.

See the [Backend Deployment Guide](../mafs-geogebra/DEPLOYMENT.md) for details on:
- Running the server locally
- Deploying to Heroku, Render, Railway, or self-hosted
- Configuring OpenCode AI API keys

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Mafs.js** - Mathematical visualization library
- **KaTeX** - Math rendering

## Project Structure

```
src/
├── components/          # React components
│   ├── SimulationViewer.tsx
│   └── SimulationViewer.css
├── lib/                 # Utilities and API
│   ├── api.ts          # API client
│   └── types.ts        # TypeScript types
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## License

MIT
