# Persian Book Club Café Application

## Overview

This is a modern Persian-language book club café application built with React, Express, and TypeScript. The application serves as a platform for book lovers to discover and register for literary events, join book clubs, and participate in discussions about Persian literature. The application features a café-themed design with warm color palettes and comprehensive Persian language support including RTL (right-to-left) layout.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built with React 18 and TypeScript, using a modern component-based architecture:
- **Build System**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with a custom café-themed color palette and Persian font support (Vazirmatn, Estedad)
- **UI Components**: Shadcn/ui component library providing consistent, accessible components
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Internationalization**: Built-in RTL support and Persian date/number formatting utilities

### Backend Architecture
The server follows a REST API pattern with Express.js:
- **Runtime**: Node.js with TypeScript and ES modules
- **Framework**: Express.js with middleware for JSON parsing, CORS, and session management
- **Authentication**: Session-based authentication with memory storage (can be extended to use PostgreSQL sessions)
- **Storage Layer**: Abstracted storage interface (IStorage) with in-memory implementation for development
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

### Data Storage Solutions
The application uses a flexible storage architecture:
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL configured for production use
- **Schema**: Comprehensive schema supporting users, cafés, clubs, events, and registrations
- **Development Storage**: In-memory storage implementation for rapid development
- **Migrations**: Drizzle-kit for database migrations and schema management

### Authentication and Authorization
- **Session Management**: Express sessions with configurable storage backends
- **User Roles**: Multi-tier role system (user, café owner, admin)
- **Registration System**: Email and password-based registration with validation
- **Profile Management**: User profile editing and management capabilities

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for cloud deployment
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-zod**: Integration between Drizzle and Zod for schema validation

### UI and Styling
- **@radix-ui/react-***: Accessible, unstyled UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **clsx**: Conditional class name utility

### State Management and Data Fetching
- **@tanstack/react-query**: Powerful data synchronization for React
- **@hookform/resolvers**: Form validation resolvers for React Hook Form
- **zod**: TypeScript-first schema validation

### Development and Build Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **@vitejs/plugin-react**: React integration for Vite
- **@replit/vite-plugin-***: Replit-specific development enhancements

### Utilities and Helpers
- **date-fns**: Modern JavaScript date utility library
- **wouter**: Minimalist routing for React
- **lucide-react**: Beautiful and customizable SVG icons
- **embla-carousel-react**: Carousel component for React applications