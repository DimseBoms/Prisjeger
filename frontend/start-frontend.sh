#!/bin/bash
# Skriptet som initialiserer backend. Dette skriptet startes
# av SystemD ved oppstart av maskinen og startes automatisk på
# nytt dersom det slutter å kjøre ved f.eks systemkræsj.
# Dmitriy Safiullin

cd /home/pi/applikasjon/prisjeger/frontend

# Henter nvm
echo -e "\nHenter nvm...\n"
source /home/pi/.nvm/nvm.sh

echo -e "\nForsøker å starte frontend...\n"
nvm use system
/usr/bin/npm start
