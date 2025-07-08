# ShopFind (Next.js)

A modern product search and comparison app built with Next.js, React, and Tailwind CSS.

## Features
- Search for products across multiple stores
- Filter by country
- Optional sorting (ascending/descending)
- Responsive UI with Tailwind CSS
- Dockerized for local development
- Ready for Vercel deployment

## Getting Started

### Prerequisites
- Node.js 18+ (or use Docker)
- npm or yarn

### Local Development
1. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
2. Run the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker
1. Build and run with Docker Compose:
   ```sh
   docker-compose up --build
   ```
2. The app will be available at [http://localhost:3000](http://localhost:3000).

### Vercel Deployment
1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com), import your repo, and deploy.

## Project Structure
- `app/` - Next.js app directory
- `components/` - Reusable React components
- `hooks/` - Custom React hooks
- `lib/` - Utility functions
- `public/` - Static assets

## Environment Variables
Create a `.env.local` file for any secrets or API keys. Example:
```
API_URL=https://your-api-url.com
```

## Scripts
- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server

## License
MIT
