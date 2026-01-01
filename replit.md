# Overview

An immersive, highly-animated birthday celebration website for Aarohi built with React 18 and TypeScript. The application features a multi-page journey with WebGL effects, GSAP animations, a counter animation, galaxy backgrounds, and a 3D dome gallery. The site guides users through a sequential experience from a welcome page to a final gallery showcase.

**Page Flow:**
```
Welcome (/) → Intro (/intro) → Main (/main) → Counter (/counter) → Birthday Wish (/birthday-wish) → Gallery (/gallery)
```

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Component-Based UI:**
- React 18.3.1 with TypeScript for type-safe component development
- Wouter 3.3.5 for lightweight client-side routing
- Component library based on shadcn/ui (New York variant) with Radix UI primitives

**Animation System:**
- GSAP 3.13.0 + ScrollTrigger for professional timeline-based animations
- Framer Motion for React-specific declarative animations (CountUp component)
- Canvas Confetti for celebration effects
- @use-gesture/react for touch/drag interactions in the dome gallery

**WebGL Effects:**
- OGL 1.0.11 for lightweight WebGL rendering (particle systems, shaders, galaxy backgrounds)
- Custom shaders for liquid chrome, galaxy, orb, and laser flow effects
- Fallback mechanisms for browsers without WebGL support

**Styling Architecture:**
- Tailwind CSS 3.4.17 utility-first approach with custom design tokens
- CSS custom properties for dynamic theming
- Component-specific CSS modules for complex animations (DomeGallery, CurvedLoop, etc.)

**State Management:**
- React TanStack Query 5.60.5 for server state and caching
- Local component state with hooks for UI interactions
- Ref-based state for animation timelines and WebGL contexts

## Backend Architecture

**Server Framework:**
- Express.js 4.21.2 with TypeScript
- ESM module system throughout
- TSX 4.20.5 for TypeScript execution

**Development Setup:**
- Vite 5.4.20 as build tool with HMR in development mode
- Middleware mode for Vite integration with Express
- Custom error handling and request logging

**Route Structure:**
- API routes prefixed with `/api`
- Static file serving for production builds
- Vite middleware for development hot reloading

**Storage Layer:**
- Interface-based storage abstraction (IStorage)
- In-memory implementation (MemStorage) for development
- Prepared for database integration via Drizzle ORM

## Data Storage

**Database Configuration:**
- Drizzle ORM configured for PostgreSQL
- Schema defined in shared/schema.ts (users table)
- Migration support via drizzle-kit
- Neon serverless driver (@neondatabase/serverless) ready for integration

**Current Implementation:**
- In-memory storage for user data
- UUID-based identifiers
- Prepared schema for user authentication (username/password)

**Note:** The application is configured for PostgreSQL but currently uses in-memory storage. Database can be provisioned and connected via DATABASE_URL environment variable.

## External Dependencies

**Media Assets:**
- Audio files: Birthday Piano Music (birthday-wish page), Tum Se Hi Instrumental (gallery page)
- Custom fade-in audio playback implementation
- Media files served from attached_assets directory

**Third-Party Libraries:**
- Lucide React 0.453.0 for icons
- React Hook Form integration via @hookform/resolvers
- Zod for schema validation
- class-variance-authority + clsx for dynamic className generation

**Build Tools:**
- esbuild for server bundle compilation
- PostCSS with Tailwind and Autoprefixer
- TypeScript compiler for type checking

**Development Tools:**
- @replit/vite-plugin-runtime-error-modal for error overlay
- @replit/vite-plugin-cartographer for development mapping
- @replit/vite-plugin-dev-banner for development indicators

**WebGL Dependencies:**
- OGL (Lightweight WebGL library)
- Three.js (for LaserFlow component only)
- Custom GLSL shaders for visual effects

**Animation Dependencies:**
- GSAP with SplitText plugin
- Framer Motion
- @use-gesture/react for touch/gesture handling
- canvas-confetti for particle effects