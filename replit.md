# Persian Book Club Café

## Overview

A Persian-language book club café application built with React, Express, and Drizzle ORM. The application allows book lovers to view upcoming literary events, register for book club meetings, and participate in discussions about Persian literature. The UI is designed specifically for Persian text with right-to-left (RTL) support and café-themed styling.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Issues Resolved

**Path Resolution Error Fix (Aug 13, 2025):**
- Root Cause: TypeError "paths[0] argument must be of type string. Received undefined" in vite.config.ts
- Issue: Project uses import.meta.dirname which requires Node.js v20.11+, but user has Node.js v18.20.8
- Solution: Must upgrade to Node.js v20.11.0 or higher (critical requirement)
- Added: Node.js version compatibility checker script and comprehensive documentation
- Note: Both vite.config.ts and server/vite.ts are protected files that cannot be modified
- Project structure: This is a monorepo that must be run from root directory with Node.js v20+

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for home, events listing, and event details
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom café-themed color palette and Persian typography
- **State Management**: TanStack Query for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Internationalization**: Built-in Persian language support with RTL layout and Persian date/number utilities

### Backend Architecture
- **Framework**: Express.js with TypeScript using ESM modules
- **API Design**: RESTful endpoints for events and registrations with JSON responses
- **Error Handling**: Centralized error middleware with structured error responses
- **Development**: Vite middleware integration for hot module replacement in development
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development

### Data Storage Solutions
- **ORM**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Database**: PostgreSQL (configured but currently using in-memory storage for development)
- **Schema**: Strongly typed database schema with tables for users, events, and registrations
- **Migrations**: Drizzle Kit for database migrations and schema management

### Component Architecture
- **Design System**: Comprehensive UI component library with consistent theming
- **Form Components**: Reusable form components with built-in validation
- **Layout Components**: Responsive navbar and footer with mobile-friendly navigation
- **Event Components**: Specialized components for event display and registration

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL database provider (@neondatabase/serverless)
- **Drizzle ORM**: TypeScript ORM for database operations and schema management
- **Drizzle Kit**: Database toolkit for migrations and schema generation

### UI Framework & Components
- **Radix UI**: Comprehensive set of low-level UI primitives for accessibility
- **Shadcn/ui**: Pre-built component library based on Radix UI
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography

### Form Handling & Validation
- **React Hook Form**: Performant forms library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### State Management & Data Fetching
- **TanStack Query**: Server state management with caching and synchronization
- **Wouter**: Lightweight routing library for React applications

### Development & Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Custom Vite plugins for Replit development environment

### Typography & Localization
- **Google Fonts**: Vazirmatn and Estedad fonts for Persian text support
- **Date-fns**: Date manipulation and formatting utilities
- **Custom Persian Utils**: Built-in utilities for Persian date formatting and digit conversion