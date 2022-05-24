#!/bin/bash

# Henter nvm
echo -e "\nHenter nvm...\n"
source $HOME/.nvm/nvm.sh

echo -e "\nForsøker å starte backend...\n"
cd /home/pi/applikasjon/prisjeger/backend
nvm use 16.15.0
npm run devStart
