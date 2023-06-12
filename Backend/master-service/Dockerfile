FROM openjdk:jdk-alpine
VOLUME ["/upload"]
COPY target/master.jar /deployments/
ENTRYPOINT ["sh", "-c", "java -jar /deployments/master.jar"]
# CMD java -Dspring.profiles.active=dev -jar /deployments/master.jar