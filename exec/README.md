# 빌드 및 배포 가이드
## 사용된 프레임워크 및 버전 정보
### EC2 인스턴스에서 작동하는 서비스
1. Docker
    - v27.3.1
2. Docker Compose
    - v2.29.7

### Docker Container로 작동하는 서비스
1. [Caddy Docker Proxy](https://github.com/lucaslorentz/caddy-docker-proxy)
    - Nginx를 대체하여 작동하는 프록시 서버
    - Image: `lucaslorentz/caddy-docker-proxy:2.9.1-alpine`
2. MySQL
    - Image: `mysql:8.0-debian`
3. MongoDB
    - Image: `mongodb/mongodb-community-server:7.0.15-ubuntu2204`
4. FastAPI
    - Base Image: `thenoface/jamkkaebi_python312_base:latest`
    - Image: `thenoface/jamkkaebi_analysis:latest`
        - 이미지 빌드 시간을 줄이기 위해 베이스 이미지를 기반으로 빌드됨
5. SpringBoot
    - Image: `thenoface/jamkkaebi_backend:latest`
6. Vite + React on Nginx
    - Base Image:
        - Build: `node:lts-alpine`
        - Deploy: `nginx:stable-alpine`
    - Image: `thenoface/jamkkaebi_frontend:latest`

### 사용된 IDE
1. VSCode
2. Intellij IDEA Ultimate

### 사용된 외부 API
- [TMAP API](https://tmapapi.tmapmobility.com/)

## 빌드 환경변수
- 각 프로젝트 최상위 디렉토리에 `.env` 생성
- 필요한 변수명 작성

### SpringBoot (`backend`)
```
SERVER_PORT=
SPRING_DATA_MONGODB_HOST=
SPRING_DATA_MONGODB_PORT=
SPRING_DATA_MONGODB_DATABASE=
SPRING_DATA_MONGODB_USERNAME=
SPRING_DATA_MONGODB_PASSWORD=
SPRING_DATASOURCE_URL=jdbc:mysql://{DATABASE_HOST}/jamkkaebi?useSSL=false&useUnicode=true&serverTimezone=Asia/Seoul&allowPublicKeyRetrieval=true
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=!!
JWT_SECRET=
JWT_ACCESS_EXPIRATION=
JWT_REFRESH_EXPIRATION=
LOGGING_LEVEL_ROOT=INFO
SPRING_JPA_SHOWSQL=
SPRING_JPA_HIBERNATE_DDLAUTO=
TMAP_APPKEY=
SPRING_RABBITMQ_HOST=
SPRING_RABBITMQ_PORT=
SPRING_RABBITMQ_USERNAME=
SPRING_RABBITMQ_PASSWORD=
```

### Vite + React (`frontend`)
```
VITE_APP_API_URL=
VITE_TMAP_API_KEY=
```

## 서비스별 컨테이너 배포
- Caddy Docker Proxy 구현 특성 상 각 서비스별 리버스 프록시 정보는 `docker run` 에 `-l` 옵션으로 설정
    - `caddy=k11c106.p.ssafy.io` 구문을 서비스할 주소에 맞춰 수정
- 다음의 순서로 배포

### Infra Deploy
- 다음 명령어 사용: `docker compose -f infra/docker/docker-compose.yml up -d`
- 포함되어 실행되는 컨테이너
    - Caddy Proxy Server
    - Portainer Management Console
    - Jenkins
    - MySQL
    - MongoDB
    - RabbitMQ
- 다음 환경변수는 상황에 맞춰 직접 설정 필요
    - MongoDB
        ```
        MONGO_INITDB_ROOT_PASSWORD: 
        MONGO_INITDB_ROOT_USERNAME: 
        ```
    - MySQL
        ```
        MYSQL_USER: 
        MYSQL_PASSWORD: 
        MYSQL_ROOT_PASSWORD: 
        ```

### Backend Deploy
```
docker run --name jamkkaebi_backend \
    -d --net caddy --expose 8080 \
    --env-file {ENVFILE_LOCATION} \
    -l caddy=k11c106.p.ssafy.io \
    -l caddy.0_handle=/api* \
    -l caddy.0_handle.reverse_proxy="{{upstreams 8080}}" \
    -l caddy.1_handle=/swagger-ui* \
    -l caddy.1_handle.reverse_proxy="{{upstreams 8080}}" \
    -l caddy.2_handle=/ws* \
    -l caddy.2_handle.reverse_proxy="{{upstreams 8080}}" \
    -v /etc/localtime:/etc/localtime:ro \
    --restart=unless-stopped \
    thenoface/jamkkaebi_backend:latest
```

### Frontend Deploy
```
docker run --name jamkkaebi_frontend \
    -d --net caddy --expose 80 \
    -l caddy=k11c106.p.ssafy.io \
    -l caddy.handle=/* \
    -l caddy.handle.reverse_proxy="{{upstreams 80}}" \
    -v /etc/localtime:/etc/localtime:ro \
    --restart=unless-stopped \
    thenoface/jamkkaebi_frontend:latest
```

### FastAPI Deploy
```
docker run --name jamkkaebi_analysis \
    -d --net caddy \
    -e FASTAPI_PORT=8000 -e FASTAPI_HOST=0.0.0.0 \
    -l caddy=k11c106.p.ssafy.io \
    -l caddy.0_handle_path=/fastapi* \
    -l caddy.0_handle_path.reverse_proxy="{{upstreams 8000}}" \
    -l caddy_1=localhost:35552 \
    -l caddy_1.reverse_proxy="{{upstreams 9000}}" \
    -p 35552:9000 \
    -v /etc/localtime:/etc/localtime:ro \
    --restart=unless-stopped \
    thenoface/jamkkaebi_fastapi:latest
```