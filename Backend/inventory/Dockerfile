FROM openjdk:jdk-alpine
COPY target/inventory.jar /deployments/
CMD java -Dspring.profiles.active=prod -jar /deployments/inventory.jar