# 1. Build stage
# Use the official Bun image for a smaller and faster build
FROM oven/bun:1-alpine AS build

WORKDIR /app

# Install dependencies. Bun will use bun.lockb if it exists.
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the SvelteKit app
RUN bun run build

# 2. Production stage
FROM oven/bun:1-alpine AS production

WORKDIR /app

# Copy production artifacts from the build stage
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/bun.lockb ./bun.lockb

# Install only production dependencies
RUN bun install --production

# Expose the port the app will run on
EXPOSE 3000

# Set the host to be accessible from outside the container
ENV HOST=0.0.0.0

# The command to start the Node server using Bun's runtime
CMD [ "bun", "run", "build/index.js" ]