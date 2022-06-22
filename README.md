# URL Shorten

Full stack of Omni

---

## Local Debugging
---
### Prerequisites

Nodejs: >= 12 [Download](https://nodejs.org/en/download/)

### Backend 

Step into [backend-node](./backend-node/) folder
```shell
npm install
node index.js
```

### Frontend

Step into [frontend](./frontend/) folder
```shell
npm install
npm run dev
```
Build frontend project
```shell
npm run build
```

## Docker Compose

You can modify the content of below 3 files to setup the database / username / password of the postgreSQL. 

| File | Description | Default Value |
|---|---|---|
|[pg_db.txt](pg_db.txt)| Database | postgres |
|[pg_usr.txt](pg_usr.txt)| Username | postgres |
|[pg_pwd.txt](pg_pwd.txt)| Password | postgres |

Start up
```shell
docker-compose up -d
```


