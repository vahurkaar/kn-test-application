# KN Test Application

KN test application serves a paginated webpage of persons.
Persons data is read from the a CSV file and is imported into an
in-memory H2 database by default.

The technology stack contains React 18 and Spring Boot 2.7.4

## Running on your local machine

To build and run the backend server (was developed with JDK 17.0.3.1)
```bash
./gradlew bootRun
```

To build and run the frontend server (was developed with v16.9.1)
```bash
npm run start
```

### Tests

To run backend tests
```bash
./gradlew test
```

To run frontend tests with coverage
```bash
npm run test
```

## Docker setup

The project contains also a Docker setup, which consists of 4 containers
- Nginx proxy server
- Node container for the frontend
- Java container for the backend
- Database container for Postgres 14

To start the docker setup, please execute
```bash
docker-compose up
```
