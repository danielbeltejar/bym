# Use a Node.js base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY server ./

# Modify the getDefaultBaseData.ts file
RUN sed -i 's/credits: 2500/credits: 6969696969/' src/data/getDefaultBaseData.ts

# Build TypeScript files
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "serve"]
