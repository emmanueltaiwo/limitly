# Limitly Web

Marketing website and documentation for Limitly - the best TypeScript-first rate limiting SDK.

## Features

- **Landing Page** (`/`) - Beautiful hero, features, and getting started section
- **Documentation** (`/docs`) - Complete TypeScript-first documentation with code examples
- **Dark Theme** - Modern dark theme with smooth transitions
- **Responsive** - Fully responsive design for all devices
- **Type-Safe** - Built with TypeScript and Next.js 16

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The site will be available at `http://localhost:3000`.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Geist Font** - Beautiful typography

## Project Structure

```
apps/web/
├── app/
│   ├── page.tsx          # Landing page
│   ├── docs/
│   │   └── page.tsx      # Documentation page
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles
└── public/               # Static assets
```

## Pages

### Landing Page (`/`)

Features:
- Hero section with gradient text
- Feature grid highlighting benefits
- Code examples with installation
- Call-to-action sections

### Documentation (`/docs`)

Sections:
- Getting Started
- Installation
- Basic Usage
- TypeScript Support
- Features
- API Reference
- Examples

## Development

The site uses Next.js App Router with:
- Server and Client Components
- TypeScript strict mode
- Tailwind CSS for styling
- Custom UI components from `@repo/ui`

## Deployment

The site can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

## License

ISC
