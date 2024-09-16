FROM maven:3.9.8-eclipse-temurin-21 as build

ENV PROJECT_HOME /usr/src/whatsappcloneapp-backend
ENV JAR_NAME whatsappcloneapp.jar

RUN mkdir -p $PROJECT_HOME
WORKDIR $PROJECT_HOME

COPY . .

RUN mvn clean package -DskipTests

RUN mv $PROJECT_HOME/target/$JAR_NAME $PROJECT_HOME/

ENV SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL}
ENV SPRING_DATASOURCE_USERNAME=${SPRING_DATASOURCE_USERNAME}
ENV SPRING_DATASOURCE_PASSWORD=${SPRING_DATASOURCE_PASSWORD}
ENV PASSWORD_SECRET_KEY=${PASSWORD_SECRET_KEY}

RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz && \
    rm dockerize-linux-amd64-v0.6.1.tar.gz

ENTRYPOINT ["dockerize", "-wait", "tcp://mysqldb:3306", "-timeout", "60s", "java", "-jar", "-Dspring.profiles.active=prod", "whatsappcloneapp.jar"]
