FROM node:carbon
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY app.js .
ENV MONGO_HOST=35.174.100.96
ENV MONGO_PORT=27017
ENV MONGO_DB_NAME=mydb
ENV PORT=3000
EXPOSE ${PORT}
CMD ["npm", "start"]
