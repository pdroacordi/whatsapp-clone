FROM node:14

ENV PROJECT_HOME /usr/src/whatsappcloneapp-frontend

RUN mkdir -p $PROJECT_HOME
WORKDIR $PROJECT_HOME

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
