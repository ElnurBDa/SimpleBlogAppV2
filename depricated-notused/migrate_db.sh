#!/bin/bash
#docker exec -it $(docker ps --filter "name=back" --filter "status=running" -q) bun prisma migrate dev --name dev
docker exec  $(docker ps --filter "name=back" --filter "status=running" -q) bun prisma migrate dev --name dev
