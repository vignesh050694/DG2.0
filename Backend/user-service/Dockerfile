FROM maven:3.8-openjdk-11 as build
WORKDIR /app
COPY . .
RUN mvn clean install

FROM openjdk:jdk-alpine
COPY target/user.jar /deployments/
CMD java -jar /deployments/user.jar