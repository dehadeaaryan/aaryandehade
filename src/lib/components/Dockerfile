# 1. Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies based on your lock file
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the SvelteKit app
RUN npm run build

# 2. Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy the built app and package.json from the build stage
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json

# Install only production dependencies
RUN npm install --omit=dev

# Expose the port the app will run on
EXPOSE 3000

# Set the host to be accessible from outside the container
ENV HOST=0.0.0.0

# The command to start the Node server
CMD [ "node", "build" ]