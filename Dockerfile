FROM node:16-alpine

RUN apk --no-cache add --virtual .builds-deps build-base python3

WORKDIR /app

# Copy package.json and yarn.lock to the workdir
COPY package*.json turbo.json ./

# Copy package.json files from apps directory to the workdir
COPY apps/api/package.json apps/api/
COPY apps/client/package.json apps/client/

# Install dependencies
RUN npm ci

# Copy the rest of the files
COPY . .

# Build the app
RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]    