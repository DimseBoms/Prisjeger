#!/bin/bash
# Dmitriy Safiullin

cd /home/pi/applikasjon/prisjeger/frontend

# Henter nvm
echo -e "\nHenter nvm...\n"
source /home/pi/.nvm/nvm.sh

echo -e "\nForsøker å starte frontend...\n"
nvm use system
/usr/bin/npm start
