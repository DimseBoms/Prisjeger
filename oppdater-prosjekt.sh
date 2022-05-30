#!/bin/bash

# Et lite skript som henter nyeste versjon av prosjektet fra GitHub.
# Bygger det på nytt lokalt og sørger for å starte de nødvendige
# tjenestene på nytt
# Dmitriy Safiullin

# Henter nvm
source /home/pi/.nvm/nvm.sh

# Stopper tjenester
echo -e "\nStopper bakgrunnstjenester...\n"
sudo systemctl stop prisjeger-backend.service
sudo systemctl stop prisjeger-frontend.service

# Henter nytt fra GitHub. SKRIVER OVER ALLE LOKALE FILER
echo -e "\nHenter nytt fra GitHub...\n"
cd /home/pi/applikasjon/prisjeger
git stash --include-untracked
git reset --hard
git clean -fd
git config pull.rebase true
git pull

# Gjenoppretter systemlenker
echo -e "\nGjenoppretter systemlenker...\n"
rm /home/pi/applikasjon/prisjeger/frontend/public/locales/available_languages.js
ln -s /home/pi/applikasjon/prisjeger/frontend/src/assets/available_languages.js /home/pi/applikasjon/prisjeger/frontend/public/locales/available_languages.js

# Fikser rettigheter
echo -e "\nReparerer rettigheter...\n"
sudo chown -R pi /home/pi/applikasjon/prisjeger

# Bygger React prosjekt om igjen
echo -e "\nSjekker avhengigheter...\n"
nvm use 16.15.0
cd /home/pi/applikasjon/prisjeger
npm i
cd /home/pi/applikasjon/prisjeger/backend
npm i
nvm use system
cd /home/pi/applikasjon/prisjeger/frontend
npm i
#npm run build

# Starter tjenester på nytt
echo -e "\nStarter tjenester på nytt...\n"
sudo systemctl daemon-reload
sudo systemctl start prisjeger-backend.service
sudo systemctl start prisjeger-frontend.service
