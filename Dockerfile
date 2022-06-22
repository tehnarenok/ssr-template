FROM node:16 as root 

WORKDIR /app

ENV PRJ_DIR=/app

COPY ["./package.json", "/app/package.json"]
COPY ["./yarn.lock", "/app/yarn.lock"]
COPY ["./tools/makefiles", "/app/tools/makefiles"]
COPY ["./Makefile", "/app/Makefile"]

RUN make deps

FROM root as builder

WORKDIR /app

ARG YENV=production

COPY [".", "/app"]

ENV NODE_ENV=$YENV
ENV PRJ_DIR=/app

RUN make webpack

FROM node:16 as app-root

WORKDIR /app

ARG YENV=production

ENV NODE_ENV=$YENV
ENV PRJ_DIR=/app

COPY ["./package.json", "/app/package.json"]
COPY ["./yarn.lock", "/app/yarn.lock"]
COPY ["./tools/makefiles", "/app/tools/makefiles"]
COPY ["./Makefile", "/app/Makefile"]

RUN make deps-trim

FROM node:16-alpine as app

ARG YENV=production
ARG PORT=3000

COPY --from=app-root /app/package.json /app/package.json
COPY --from=app-root /app/node_modules /app/node_modules
COPY --from=builder /app/build /app/build

ENV PRJ_DIR=/app
ENV NODE_ENV=$YENV
ENV LOGS_DIR=/app/logs
ENV NODE_PORT=$PORT

EXPOSE $PORT

CMD ["sh", "-c", "node ${PRJ_DIR}/build/server/app.js"]