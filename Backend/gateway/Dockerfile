FROM openjdk:jdk-alpine
VOLUME ["/upload"]
COPY target/gateway.jar /deployments/
CMD java -jar -Dspring.profiles.active=qa /deployments/gateway.jar