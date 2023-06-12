FROM openjdk:jdk-alpine
COPY target/farmer.jar /deployments/
CMD java -Dspring.profiles.active=prod -jar /deployments/farmer.jar