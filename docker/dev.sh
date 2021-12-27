#!/usr/bin/env bash

docker run -it --rm \
  --name neo-anti-dragons-guild-com-dev \
  -p 6789 \
  -v $PWD:/usr/src/app \
  -v $PWD/log:/var/log/neo-anti-dragons-guild-com \
  -e NODE_ENV=development \
  -e VIRTUAL_HOST=neo-anti-dragons-guild.com.local,www.neo-anti-dragons-guild.com.local \
  -w /usr/src/app node:16 npm run start
