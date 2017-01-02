# socketio-chat

> A Vue.js + SocketIO + NodeJS + MongoDB chat project

Based on the requirements below

1. User asked for a display name before entering the chatroom.
2. Single chat room for all users.
3. User able to send text into the chatroom.
4. Chat history should be saved for the last 100 messages. Every user should see the chat history once they are in the chatroom.

## Running with Docker

``` bash
$ docker pull mongo
$ docker pull punneng/socketio-chat
$ cd docker
$ docker-compose up
```
and navigate at localhost:8080.
or it can run from source by the *Build Setup* below

## Build Setup

### Prerequisites

NodeJS and MongoDB setup.
then run the commands below

``` bash
# install dependencies
$ npm install

# serve at localhost:8080
$ npm run dev
```
and navigate at localhost:8080

### Running the tests

``` bash
# run unit tests
$ npm run unit

# run e2e tests
$ npm run e2e

# run all frontend tests
$ npm test:frontend

# run all backend tests
$ npm test:api
```

## Todo

- Decouple frontend and backend
- Implement user sessions
- Fix docker compose database url
- Message and @mention Notification
- Replace request-respone action with socketio with http request
