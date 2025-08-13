# Persian Book Club Café (KetabCafe)

A Persian-language book club café application built with React, Express, and TypeScript with full RTL support.

## Quick Start

### Option 1: Run from Root Directory (Recommended)
```bash
# From the project root directory
npm run dev    # Starts development server
npm run build  # Builds the project
npm run start  # Starts production server
```

### Option 2: Run from Client Directory
```bash
# From the client folder
cd client
npm run dev    # Redirects to root and starts dev server
npm run build  # Redirects to root and builds project
```

## Project Structure

This is a monorepo with the following structure:
```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types and schemas
├── attached_assets/ # Static assets
└── vite.config.ts   # Vite configuration (configured for monorepo)
```

## Troubleshooting

### Error: "paths[0] argument must be of type string. Received undefined"

This error occurs when running commands from the wrong directory. The vite.config.ts file is configured to work from the project root.

**Solutions:**
1. Always run commands from the root directory (not from client folder)
2. Use the client/package.json which redirects commands to root
3. Ensure you're in the correct directory before running npm commands

### Development Notes

- The project uses `import.meta.dirname` which requires Node.js 20.11+ or proper polyfills
- All path aliases (`@`, `@shared`, `@assets`) are resolved relative to project root
- The Vite config is protected and optimized for the Replit environment

## Features

- 📚 Persian book club event management
- 🔐 User authentication and profiles
- 📱 Responsive design with RTL support
- ☕ Café-themed UI with Persian typography
- 🎯 Event registration and cancellation
- 👥 Club creation and management

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend:** Express.js, TypeScript
- **Database:** PostgreSQL with Drizzle ORM
- **Build:** Vite, ESBuild
- **Development:** Hot reload, TypeScript strict mode