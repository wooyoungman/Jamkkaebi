FROM eclipse-temurin:17-alpine
ARG JAR_FILE=build/libs/*-SNAPSHOT.jar
COPY ${JAR_FILE} jamkkaebi_backend.jar
ENTRYPOINT ["java", "-Duser.timezone=Asia/Seoul", "-jar","/jamkkaebi_backend.jar"]