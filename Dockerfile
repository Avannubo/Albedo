# # Use Node.js 18 Alpine as base image
# FROM node:18-alpine AS builder

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json (if present)
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the entire project directory to the container
# COPY . .

# # Build the Next.js application
# RUN npm run build

# # Stage 2: Create a new stage for the final production image
# FROM node:18-alpine

# # Set the working directory inside the container
# WORKDIR /app

# # Copy .env file
# COPY .env .env 

# # Copy only the necessary files from the builder stage
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/next.config.mjs ./
# COPY --from=builder /app/node_modules ./node_modules

# # Expose the port Next.js uses (usually 3000)
# EXPOSE 3000

# # Set user permissions
# RUN chown -R 10047:1004 /app

# # Switch to non-root user
# USER 10047

# # Command to run the Next.js production server
# CMD ["npm", "start"]

# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Build the Next.js application 
RUN npm run build

# Stage 2: Create a new stage for the final production image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app


# Create a non-root user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs nextjs

# Copy .env file if needed (uncomment the line below if .env is required)
# COPY .env .env

# Copy only the necessary files from the builder stage
COPY --from=builder /app/ .
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/next.config.mjs ./
# COPY --from=builder /app/node_modules ./node_modules

# # Create necessary directories with correct ownership
# RUN mkdir -p /app/.next/cache && chown -R nextjs:nodejs /app/.next/cache

# Change ownership of the app directory to the nextjs user
RUN chown -R nextjs:nodejs /app

# Ensure the images directory has the correct ownership and permissions
RUN chown -R nextjs:nodejs /app/public/assets/images
RUN chmod -R u+rwX,g+rwX,o-rwx /app/public/assets/images

# Switch to the non-root user
USER nextjs

# Expose the port Next.js uses (usually 3000)
EXPOSE 3000

# Command to run the Next.js production server and the watcher script
CMD ["npm start"]


