# AI CallCenter Dashboard

## Overview

This is a full-stack AI CallCenter dashboard application built with React, Express, and TypeScript. The application provides a comprehensive interface for managing AI-powered call center operations, including call analytics, agent management, sentiment analysis, and various integrations. It follows a monorepo structure with separate client and server directories, sharing common schemas and utilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with Shadcn/UI components
- **State Management**: TanStack Query for server state management
- **Routing**: React Router for client-side navigation
- **Build Tool**: Vite for development and production builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Module System**: ES Modules
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Session Management**: In-memory storage with option for database persistence
- **API Structure**: RESTful API with `/api` prefix
- **Development**: Hot reloading with Vite middleware integration

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with type-safe queries
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Located in `shared/schema.ts` for type sharing

## Key Components

### Client Components
- **Layout System**: Responsive layout with collapsible sidebar and top bar
- **Dashboard**: Main analytics and metrics overview
- **Call Management**: Call reports, queue management, and transcripts
- **AI Features**: Agent configuration, sentiment analysis, and scoring
- **Integrations**: Google and WhatsApp integration pages
- **User Management**: Team management and performance tracking

### Server Components
- **Route Registration**: Centralized route management in `server/routes.ts`
- **Storage Interface**: Abstracted storage layer with in-memory fallback
- **Middleware**: Request logging, error handling, and JSON parsing
- **Development Tools**: Vite integration for hot reloading

### Shared Components
- **Schema Definitions**: Database schemas with Zod validation
- **Type Safety**: Shared types between client and server
- **Utilities**: Common utility functions and configurations

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **Server Processing**: Express routes handle requests and interact with storage
3. **Database Operations**: Drizzle ORM manages database interactions
4. **Response Handling**: Structured JSON responses with error handling
5. **State Management**: Client-side state updates trigger UI re-renders

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with extensive Radix UI component library
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns for date manipulation
- **Form Management**: React Hook Form with Zod validation
- **Styling**: TailwindCSS with class-variance-authority for component variants

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **Session Storage**: connect-pg-simple for PostgreSQL session storage
- **ORM**: Drizzle ORM with Zod schema validation
- **Development**: tsx for TypeScript execution

### Build Tools
- **Bundling**: Vite for client, esbuild for server
- **Development**: Replit-specific plugins for enhanced development experience
- **TypeScript**: Strict configuration with path mapping

## Deployment Strategy

### Development
- **Client**: Vite dev server with hot reloading
- **Server**: tsx with automatic restarts
- **Database**: Push schema changes with `drizzle-kit push`

### Production
- **Build Process**: 
  - Client: Vite build to `dist/public`
  - Server: esbuild bundle to `dist/index.js`
- **Startup**: Node.js server serving static files and API routes
- **Database**: Migrations applied automatically

### Environment Configuration
- **Database**: `DATABASE_URL` environment variable required
- **Development**: Replit-specific development banner and tooling
- **Production**: Optimized builds with static file serving

## Changelog

```
Changelog:
- July 03, 2025. Initial setup
- July 03, 2025. Migration from Lovable to Replit completed successfully
- July 03, 2025. Added comprehensive Integration Hub with Google/WhatsApp configuration and advanced features
- July 03, 2025. Added four new powerful pages:
  • Live Monitoring: Real-time call oversight with agent status, queue management, and system alerts
  • Knowledge Base: Comprehensive guides, FAQs, and quick tutorials with search and filtering
  • Call Recordings: Audio player with playback controls, transcript search, and recording management
  • Customer CRM: Complete customer relationship management with call history and sales opportunities
- July 03, 2025. Enhanced home page with modern Bolt.new-inspired design:
  • Added comprehensive SEO meta tags and structured data for search engine optimization
  • Implemented dynamic typing animation, parallax scrolling effects, and interactive elements
  • Created "How It Works" section with 3-step process visualization
  • Added live demo section with real-time dashboard preview
  • Enhanced testimonials with auto-rotating carousel
  • Improved mobile navigation and responsive design
  • Added floating particle animations and scroll-to-top functionality
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```