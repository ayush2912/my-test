FROM node as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 4000
CMD [ "npm", "run", "dev" ]
