FROM node:19
RUN groupadd -r app && useradd -r -g app appuser
WORKDIR /app
COPY package*.json ./
COPY .env ./
COPY tsconfig.json ./
COPY src ./src
RUN npm install
USER appuser
EXPOSE 3000
CMD ["npm", "start"]