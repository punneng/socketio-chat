FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ./package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Build files
RUN node build/build.js

ENV NODE_ENV production

EXPOSE 8080
CMD [ "npm", "run", "dev" ]
