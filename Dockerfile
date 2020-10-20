FROM node:latest AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm install pkg -g
RUN npm run prepack
RUN pkg -t node13-linux-x64 .

FROM cypress/browsers:latest

WORKDIR /st

COPY --from=builder app/smoketest app/cypress.json app/package*.json ./

COPY --from=builder app/smoketest ../bin

RUN npm install

# CMD ["sleep", "infinity"]

ENTRYPOINT ["smoketest"]