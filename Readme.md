## 1. The challenge code in Docker
Postman collection is attached with the name: Jooycar-challenge.postman_collection.json

For the project Two environment variables are required:
- PORT
- MONGO_URI

These variables must be set to execute the code.
You need to change the mongo uri to the value of your server. Currently the url provided will work until 06/31/2023.
Examples:
````dotenv
MONGO_URI=mongodb+srv://user-test:1234@cluster0.8ocxtrn.mongodb.net/?retryWrites=true&w=majority
PORT=3000
````
### Run the project with docker

1. Build docker image:
````shell
docker build -t jooycar-chall-gustavo-condezo:latest .
````

Run Docker container:
````shell
docker run -p 3000:3000 -e MONGO_URI="mongodb+srv://user-test:1234@cluster0.8ocxtrn.mongodb.net/?retryWrites=true&w=majority" -e PORT=3000 jooycar-chall-gustavo-condezo:latest
````

# Run in local environment
Define file .env with values:
````dotenv
MONGO_URI=mongodb://localhost:27017/jooycar
PORT=3000
````
You can have MongoDB installed on your machine or else get up with docker compose provided in this project. To use docker-compose run:
````shell
docker-compose up
````
You can have MongoDB installed on your machine or else get up with docker compose provided in this project. To use docker-compose run:
Remember that the mongo URI must match in the .env

Install dependency
````shell
npm install
````
Run project in development
````shell
npm run start:dev
````
##

# Testing
This project has testing.
I use the mongodb-memory-server library that runs a mongobd server in ram memory, it is useful for testing since once it is turned off the data is lost and you do not need a cloud or local server as such for the test environment.

In order to run the tests you must first install the dependencies:
````shell
npm install
````
Then run the tests
````shell
npm run test
````
