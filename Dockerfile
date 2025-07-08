# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile || npm install

# Copy the rest of the application
COPY . .

# Expose port (default Next.js port)
EXPOSE 3000

# Start the Next.js app in development mode for local testing
CMD ["npm", "run", "dev"]
