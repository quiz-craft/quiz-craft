# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-log.json to the container in order to install dependencies
COPY ./package*.json .

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 

# Copy 
COPY ./tailwind.config.js .
COPY ./src ./src
COPY ./public ./public

# Build the React app for production
RUN npm run build

# Install serve globally to serve the app
RUN npm install -g serve

# Expose the port that the app will be running on (change 80 to the desired port)
EXPOSE 80

# Start the app using the 'serve' command
CMD ["serve", "-s", "build", "-l", "80"]