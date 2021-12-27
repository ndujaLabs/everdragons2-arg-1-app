#!/usr/bin/env bash

docker stop neo-anti-dragons-guild-com
docker rm neo-anti-dragons-guild-com

docker run -d \
  --name neo-anti-dragons-guild-com \
  -p 6789 \
  --restart unless-stopped \
  -v $PWD:/usr/src/app \
  -v /vol/log/neo-anti-dragons-guild-com_app:/var/log/neo-anti-dragons-guild-com_app \
  -e NODE_ENV=production \
  -e VIRTUAL_HOST=neo-anti-dragons-guild.com,www.neo-anti-dragons-guild.com \
  -e LETSENCRYPT_HOST=neo-anti-dragons-guild.com,www.neo-anti-dragons-guild.com \
  -e LETSENCRYPT_EMAIL=neo-anti-dragons-guild@sullo.co \
  -w /usr/src/app node:16 npm run start

docker stop 2snogardreve-com
docker rm 2snogardreve-com

docker run -d \
  --name 2snogardreve-com \
  -p 6789 \
  --restart unless-stopped \
  -v $PWD:/usr/src/app \
  -v /vol/log/2snogardreve-com_app:/var/log/2snogardreve-com_app \
  -e NODE_ENV=production \
  -e VIRTUAL_HOST=2snogardreve.com,www.2snogardreve.com \
  -e LETSENCRYPT_HOST=2snogardreve.com,www.2snogardreve.com \
  -e LETSENCRYPT_EMAIL=2snogardreve@sullo.co \
  -w /usr/src/app node:16 npm run start
