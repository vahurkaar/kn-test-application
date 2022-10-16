FROM openjdk:17-jdk-slim-buster
COPY build/libs/backend-0.0.1-SNAPSHOT.jar backend.jar
ENTRYPOINT [ "java", "-jar", "/backend.jar" ]