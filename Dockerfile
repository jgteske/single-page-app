#####################################################
#
# Build and run this image
#
# Build:
#
# docker build -t imagename:tag .
#
# docker build -t single-page-app:latest .
#
#
# Run the container:
#
# docker run -p 8001:5000 --name single-page-app -d single-page-app:latest
#
#####################################################


# build the frontend part based on vite
ARG NODE_VERSION=22.14.0-bookworm-slim

FROM node:$NODE_VERSION AS builder

# Args for builder build process
ARG FRONTEND_BUILD_DIR=/tmp/build

# create build folder and copy all repository files into the folder
RUN mkdir -p $FRONTEND_BUILD_DIR && chown -R node:node $FRONTEND_BUILD_DIR
WORKDIR $FRONTEND_BUILD_DIR
COPY --chown=node:node . .

#build the frontend part
RUN yarn install
RUN yarn build:frontend

# run frontend integrated into the backend as node server
FROM node:$NODE_VERSION AS app

# Args for app build process
ARG FRONTEND_BUILD_DIR=/tmp/build
ARG PORT=5000

# Envs vor runtime of app
ENV PORT=$PORT

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
USER node
COPY --chown=node:node package*.json ./
COPY --chown=node:node server server

RUN yarn install

# copy frontend part into backend
COPY --chown=node:node --from=builder $FRONTEND_BUILD_DIR/frontend/dist server/public

EXPOSE $PORT

CMD [ "node", "server/server.js" ]