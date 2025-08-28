# Busuanzi Frontend

> A modern, fast, and privacy-friendly website visitor counter service frontend built with Next.js

## Overview

This is the official frontend application for [Busuanzi](https://github.com/soxft/busuanzi), a high-performance visitor counter service that serves as a modern alternative to the original Busuanzi service. Together with the backend, it provides a complete solution for website analytics that respects user privacy while delivering accurate visitor statistics.

### What is Busuanzi?

Busuanzi is a simple yet powerful visitor counter system that allows website owners to track page views (PV) and unique visitors (UV) without compromising user privacy. The name "Busuanzi" (不蒜子) comes from Chinese, meaning "not garlic" - a playful name for a serious privacy-focused analytics tool.

## Features

- 🚀 **High Performance**: Built with Next.js 14 and optimized for speed
- 📊 **Real-time Statistics**: Display PV (Page Views) and UV (Unique Visitors) in real-time
- 🔒 **Privacy First**: No cookies, no personal data collection, GDPR compliant
- 💅 **Modern UI**: Clean, responsive interface built with Tailwind CSS
- ⚡ **Lightweight**: Minimal JavaScript footprint for fast page loads
- 🌐 **Easy Integration**: Simple script tag integration for any website
- 📱 **Fully Responsive**: Works perfectly on all devices
- 🛠️ **Developer Friendly**: TypeScript support and clear API documentation

## Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm/yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/soxft/busuanzi-front.git
cd busuanzi-front
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
# or
yarn install
```

## Development

Start the development server:

```bash
pnpm run dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Building for Production

Build the application:

```bash
pnpm run build
# or
npm run build
# or
yarn build
```

Start the production server:

```bash
pnpm run start
# or
npm run start
# or
yarn start
```

## Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint for code linting

## Project Structure

```
busuanzi-frontend/
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   │   └── js/          # JavaScript counter endpoints
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Landing page with integration guide
├── components/          # React components
│   ├── ui/              # Reusable UI components
│   │   ├── badge.tsx    # Badge component
│   │   ├── button.tsx   # Button component
│   │   └── card.tsx     # Card component
│   └── CodeBlock.tsx    # Syntax highlighted code display
├── lib/                 # Utility functions and helpers
│   └── utils.ts         # Common utilities
├── public/              # Static assets
│   ├── favicon.ico      # Site favicon
│   └── robots.txt       # SEO configuration
└── ...
```

## API Endpoints

The frontend provides JavaScript endpoints for easy integration:

- `/api/js` - Main counter script
- `/api/js/[path]` - Dynamic path-based counters

## Integration Example

Add Busuanzi to your website with just one line:

```html
<script async src="https://your-domain.com/api/js"></script>
<span id="busuanzi_value_site_pv"></span> PV
<span id="busuanzi_value_site_uv"></span> UV
```

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Code Highlighting**: [Highlight.js](https://highlightjs.org/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Architecture

This frontend works in conjunction with the [Busuanzi Backend](https://github.com/soxft/busuanzi):

```
┌──────────────┐     ┌───────────────┐     ┌──────────────┐
│   Website    │────▶│   Frontend    │────▶│   Backend    │
│  (Your Site) │     │  (This Repo)  │     │   (API/DB)   │
└──────────────┘     └───────────────┘     └──────────────┘
```

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsoxft%2Fbusuanzi-frontend)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/soxft/busuanzi-frontend)

### Self-Hosting

1. Build the application:
```bash
pnpm run build
```

2. Deploy the `.next` folder to your hosting service

3. Configure environment variables if needed

4. Point your domain to the deployment

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API URL (if different from default)
NEXT_PUBLIC_API_URL=https://api.busuanzi.com

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## Related Projects

- [Busuanzi Backend](https://github.com/soxft/busuanzi) - The backend API service
- [Original Busuanzi](http://busuanzi.ibruce.info/) - The original inspiration

## Support

- 📖 [Documentation](https://github.com/soxft/busuanzi/wiki)
- 💬 [Discussions](https://github.com/soxft/busuanzi/discussions)
- 🐛 [Report Issues](https://github.com/soxft/busuanzi-frontend/issues)

## Acknowledgments

- Inspired by the original Busuanzi service by Bruce
- Built with modern web technologies for better performance and user experience
- Thanks to all contributors and users of the Busuanzi ecosystem