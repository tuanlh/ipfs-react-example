# BUILDER IMAGE
FROM node:10-alpine
EXPOSE 3000

# Create app directory and set to working directory
WORKDIR /app

# Install dependencies
COPY yarn.lock package.json /app/
RUN yarn

# Bundle source code
COPY . /app/

CMD yarn start
