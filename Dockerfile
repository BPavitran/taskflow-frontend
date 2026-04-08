# Use lightweight Node image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy full project
COPY . .

# Accepts the API URL as a variable during the 'docker build' command
ARG VITE_API_BASE_URL

# Sets it as an environment variable so Vite can "bake" it into the JS files during build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the app (Vite build → creates dist/)
RUN npm run build

# Install simple static server
RUN npm install -g serve

# Expose port
EXPOSE 5174

# Run built app using serve
CMD ["serve", "-s", "dist", "-l", "5174"]