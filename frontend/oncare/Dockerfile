FROM node:10.19.0

LABEL version="1.0"
LABEL description="This is the base docker image for the oncare User Login/Sigun frontend react app."

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]