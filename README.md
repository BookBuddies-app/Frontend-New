# باشگاه کافه کتاب (Persian Book Club Café)

A modern Persian-language book club café application built with React, Express, and TypeScript. This application allows book lovers to view upcoming literary events, register for book club meetings, and participate in discussions about Persian literature.

## Features

- 📚 **Event Management**: View and register for upcoming book club events
- 🔐 **User Authentication**: Secure login and registration system
- 🎨 **Persian UI**: Right-to-left (RTL) support with Persian typography
- 📱 **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- ☕ **Café Theme**: Warm, coffee-inspired color palette and styling
- 🗄️ **Database Ready**: PostgreSQL integration with Drizzle ORM

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **TanStack Query** for state management
- **React Hook Form** with Zod validation
- **Wouter** for routing

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **PostgreSQL** database
- **Passport.js** for authentication
- **Express Session** for session management

## Prerequisites

- **Node.js 20.11.0 or higher** (required for `import.meta.dirname`)
- **npm** or **yarn**
- **PostgreSQL** database (optional for development)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd persian-book-club-cafe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   DATABASE_URL=postgresql://username:password@localhost:5432/bookclub
   SESSION_SECRET=your-session-secret-here
   ```

4. **Database Setup** (Optional)
   
   If using PostgreSQL:
   ```bash
   npm run db:push
   ```
   
   The application will use in-memory storage by default for development.

## Development

Start the development server:

```bash
npm run dev
```

This will start both the Express backend and Vite frontend development servers on port 5000.

## Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configuration
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Storage abstraction
│   └── vite.ts           # Vite middleware setup
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema definitions
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema changes

## Key Features

### Authentication System
- User registration and login
- Session-based authentication
- Protected event registration
- Persian error messages and validation

### Event Management
- View upcoming book club events
- Detailed event information
- User registration for events
- Terms and conditions acceptance

### Persian Language Support
- Right-to-left (RTL) layout
- Persian fonts (Vazirmatn, Estedad)
- Persian date formatting
- Localized UI text and messages

## Configuration

### Database
The application uses Drizzle ORM with PostgreSQL. For development, it falls back to in-memory storage if no database is configured.

### Session Management
Sessions are handled using Express Session with PostgreSQL store for production and memory store for development.

### Styling
The application uses a custom café-themed color palette:
- Primary: Coffee browns and caramels
- Secondary: Warm creams and cinnamons
- Accent: Rich espresso tones

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Persian typography support via Google Fonts
- UI components from Shadcn/ui and Radix UI
- Icons from Lucide React
- Built with modern React and TypeScript ecosystem