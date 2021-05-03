FROM node:14.16.0

RUN npm install -g nodemon

# Set the Current Working Directory inside the container
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app

# Copy dependencies package list
COPY package.json /usr/src/app/
COPY index.js /usr/src/app/

# Install dependencies
RUN npm install

# Copy all source code
COPY . /usr/src/app

# Expose application port
EXPOSE 5000

# Run application
CMD ["nodemon","start"]