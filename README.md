# single-page-app

## Frontend

- [vite](https://vitejs.dev/guide/) + [react](https://react.dev/reference/react)
- [TanStack](https://tanstack.com/router/latest/docs/framework/react/installation)
- [mui Material UI](https://mui.com/material-ui/getting-started/)

## Backend

- [Express.js](https://expressjs.com/de/starter/installing.html)
- [Logger](https://github.com/winstonjs/winston)
- [Auth API](https://github.com/jgteske/auth-api)

## Setup Env

```bash
touch server/.env
cp server/.env.template
```

```ENV
PORT=<Port of app>

LOG_LEVEL=<log level>
LOG_DIR=<log dir>

AUTH_SERVER_URL=<auth server>
```

## Development

### Dev Server

```powershell
yarn install
yarn dev-server
```

### Dev Frontend

```powershell
yarn install
yarn dev-frontend
```

## Build Static Sites

### Build Server

> Server is static site

`./server`

### Build Frontend

```powershell
yarn install
yarn build-frontend
```

`./frontend/dist/*`

## Dockerise

### Build and run Docker Container

```bash
docker build -t single-page-app:latest .
docker run -p 8001:5000 --name single-page-app -d single-page-app:latest
```

### Use provided Docker Compose File

```bash
# build fresh image
docker compose build
# run with fresh build
docker compose up -d --build

docker compose pull
docker compose up -d
docker compose down
```
