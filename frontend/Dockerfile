FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y
RUN apt-get update -y && \
    apt-get install -y curl build-essential unzip pkg-config libglib2.0-dev libexpat1-dev && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs


WORKDIR /frontend
RUN rm -f *.env*
ENV NEXT_PUBLIC_API_URL http://localhost:4005
COPY ./package*.json ./

RUN npm install
RUN npm cache clean -f

COPY ./ ./
RUN npm run build

EXPOSE 3000
ENV PORT 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run", "start", "--", "--port", "3000"]
