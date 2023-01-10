#!/bin/bash

npm install
cd back
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
cd ..
npm start

BLUE='\033[0;34m'
BOLD='\033[1;37m'
NC='\033[0m'

printf "\n\n"
printf "${BLUE}##############################################\n"
printf "${NC} ${BOLD}Frontend${NC} is running on ${BOLD}http://localhost:8080${NC} ${BLUE}\n"
printf "${NC} ${BOLD}Backend${NC} is running on ${BOLD}http://localhost:80${NC}       ${BLUE}\n"  
printf "##############################################${NC}\n"