FROM openjdk:jdk-alpine
COPY target/procurement.jar /deployments/
CMD java -Dspring.profiles.active=dev -jar /deployments/procurement.jar