#!/bin/bash

# Define expected images and containers
declare -A services=(
  ["postgres:alpine"]="postgres-alpine"
  ["front"]="front"
  ["back"]="back"
)

# # Check if images exist
# echo "Checking Docker images..."
# for image in "${!services[@]}"; do
#   if [[ "$(docker images -q $image 2> /dev/null)" == "" ]]; then
#     echo "[-] Image $image does not exist."
#   else
#     echo "[+] Image $image exists."
#   fi
# done

# Check if containers are running
echo -e "\nChecking Docker containers..."
for container in "${services[@]}"; do
  if [[ "$(docker ps -q -f name=$container)" == "" ]]; then
    echo "[-] Container $container is not running."
  else
    echo "[+] Container $container is running."
  fi
done

# Check if front-end is running on 127.0.0.1:80
echo -e "\nChecking if front-end is running on 127.0.0.1:80..."
if curl -s --head http://127.0.0.1:80 | grep "HTTP" > /dev/null; then
  echo "[+] Front-end is running on 127.0.0.1:80."
else
  echo "[!] Front-end is NOT running on 127.0.0.1:80."
fi

# Check if back-end is running on 127.0.0.1:3001
echo -e "\nChecking if back-end is running on 127.0.0.1:3001..."
if curl -s --head http://127.0.0.1:3001 | grep "HTTP" > /dev/null; then
  echo "[+] Back-end is running on 127.0.0.1:3001."
else
  echo "[!] Back-end is NOT running on 127.0.0.1:3001."
fi

