#!/bin/bash

# Henter nvm
echo -e "\nHenter nvm...\n"
source /home/pi/.nvm/nvm.sh

echo -e "\nForsøker å starte frontend...\n"
cd /home/pi/applikasjon/prisjeger/frontend
nvm use system
serve -s -C -n -p 80 build
