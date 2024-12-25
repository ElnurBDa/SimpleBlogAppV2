#!/bin/sh

# Check if there are running Docker containers
if [ "$(sudo docker ps -q)" ]; then
    echo "Stopping and removing existing containers..."
    # Stop and remove all containers, images, volumes, and orphan containers
    docker compose  --env-file .env.deploy -f docker-compose.deploy.yml down --rmi all --volumes --remove-orphans || true
else
    echo "No existing containers to remove."
fi
