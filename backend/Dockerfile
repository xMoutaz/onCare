FROM node:12.14.0

LABEL version="1.0"
LABEL description="This is the base docker image for the ONCARE backend API."

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --production
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]