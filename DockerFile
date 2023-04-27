FROM node:18-alpine
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

ARG DATABASE_URL
ENV DATABASE_URL="$DATABASE_URL"
ENV PORT 8080

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN sed -i 's|env("DATABASE_URL")|'"\"$DATABASE_URL\""'|' prisma/schema.prisma

RUN npx prisma generate 

EXPOSE 8080

CMD ["npm","start"]
