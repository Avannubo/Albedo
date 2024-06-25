# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . . 

RUN npm run build


# Expose the port Next.js uses (usually 3000)
EXPOSE 3000

# Command to run the Next.js development server 
CMD ["npm", "start"]