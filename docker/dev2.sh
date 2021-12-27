#!/usr/bin/env bash

docker run -it --rm \
  --name 2snogardreve-com-dev \
  -p 6789 \
  -v $PWD:/usr/src/app \
  -v $PWD/log:/var/log/2snogardreve-com \
  -e NODE_ENV=development \
  -e VIRTUAL_HOST=2snogardreve.com.local,www.2snogardreve.com.local \
  -w /usr/src/app node:16 npm run start
