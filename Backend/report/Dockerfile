FROM openjdk:jdk-alpine
COPY target/report.jar /deployments/
CMD java -Dspring.profiles.active=dev -jar /deployments/report.jar