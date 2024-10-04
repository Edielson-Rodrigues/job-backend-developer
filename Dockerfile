# Node version: 20.11.1
FROM node:20.17-alpine3.19

# Create app directory
WORKDIR /usr/src/api

COPY package*.json ./

# Install app dependencies
RUN npm install --quiet --loglevel=error

COPY . .

# Build app and Expose port
RUN npm run build

CMD ["npm", "run", "start:prod"]

EXPOSE 3000