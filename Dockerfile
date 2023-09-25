# Use an official Node.js runtime as the base image
FROM node:16.15.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Expose port 10 for serving the app
EXPOSE 10

# Define the command to start app
CMD ["npm", "start"]