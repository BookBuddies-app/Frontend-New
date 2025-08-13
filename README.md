# Persian Book Club Café (KetabCafe)

A Persian-language book club café application built with React, Express, and TypeScript with full RTL support.

## Prerequisites

**Required Node.js Version: 20.11.0 or higher**

This project uses `import.meta.dirname` which requires Node.js v20.11+. If you're getting path resolution errors, upgrade your Node.js version:

```bash
# Check your current version
node --version

# If you see v18.x.x or older, upgrade to Node.js v20+
# Using nvm (recommended):
nvm install 20
nvm use 20

# Or download from: https://nodejs.org/en/download/
```

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

This error occurs due to Node.js version incompatibility. The project uses `import.meta.dirname` which requires Node.js v20.11+.

**Solutions:**
1. **Upgrade Node.js to v20.11.0 or higher** (Required)
2. Ensure you're running commands from the project root directory
3. Restart your terminal/IDE after upgrading Node.js

**If you're still getting errors after upgrading Node.js:**
- Clear node_modules: `rm -rf node_modules package-lock.json && npm install`
- Restart your terminal completely
- Verify Node.js version: `node --version` should show v20.x.x or higher

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