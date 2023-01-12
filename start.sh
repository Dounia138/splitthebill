#!/bin/bash

set -e

# load ./back/.env file
export $(grep -v '^#' ./back/.env | xargs)

# Install root dependencies
docker run --rm -v $(pwd):/app -w /app node:16-alpine npm install

# Setup back
cd back
docker run --rm -v $(pwd):/app -w /app composer:latest \
  composer install
docker run --rm -v $(pwd):/app -w /app node:16-alpine \
  npm install
docker run --rm -v $(pwd):/app -w /app php:8.1-cli-alpine \
  php artisan key:generate
cd ..

# Start back (Laravel + MariaDB) and front containers
npm start

# Migrate database
cd back
docker run --rm -v $(pwd):/app -w /app php:8.1-cli-alpine \
  docker-php-ext-install mysqli pdo pdo_mysql && \
  DB_HOST=$DB_ARTISAN_HOST php artisan migrate
cd ..

BLUE='\033[0;34m'
BOLD='\033[1;37m'
NC='\033[0m'

printf "\n\n"
printf "${BLUE}##############################################\n"
printf "${NC} ${BOLD}Frontend${NC} is running on ${BOLD}http://localhost:8080${NC} ${BLUE}\n"
printf "${NC} ${BOLD}Backend${NC} is running on ${BOLD}http://localhost:80${NC}       ${BLUE}\n"  
printf "##############################################${NC}\n"
