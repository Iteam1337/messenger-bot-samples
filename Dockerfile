FROM kkarczmarczyk/node-yarn:7.4

WORKDIR /app

ADD . /app

RUN yarn
RUN yarn build

CMD yarn start
