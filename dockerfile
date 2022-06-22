FROM node

COPY ./frontend /frontend
WORKDIR /frontend

RUN npm i
RUN npm run build

WORKDIR /
COPY ./backend-node /backend

WORKDIR /backend
RUN npm i 
RUN mv /frontend/dist /backend/dist

CMD [ "node", "index.js" ]
EXPOSE 8000