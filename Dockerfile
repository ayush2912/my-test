FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

ENV PORT 8080

RUN npm ci 
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD ["npm","start"]
