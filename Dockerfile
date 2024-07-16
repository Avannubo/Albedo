# Use Node.js 18 Alpine as base image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# RUN chmod -R 755 /app/public/assets/images

# Install dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Create a new stage for the final production image
FROM node:18-alpine

VOLUME ["./public/assets/images:/app/public/assets/images"]

# Set the working directory inside the container
WORKDIR /app
COPY .env .env 
USER 10047
# Copy only the necessary files from the builder stage

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/node_modules ./node_modules

# Expose the port Next.js uses (usually 3000)
EXPOSE 3000

# Command to run the Next.js production server
CMD ["npm", "start"]
