#!/bin/bash

# Et lite skript som henter nyeste versjon av prosjektet fra GitHub.
# Bygger det på nytt lokalt og sørger for å starte de nødvendige
# tjenestene på nytt

# Stopper tjenester
systemctl stop prisjeger-backend.service
systemctl stop prisjeger-frontend.service

# Henter nytt fra GitHub. SKRIVER OVER ALLE LOKALE FILER
cd /home/pi/applikasjon/prisjeger
git stash --include-untracked
git reset --hard
git clean -fd
git config pull.rebase true
git pull

# Fikser rettigheter
sudo chown -R pi /home/pi/applikasjon/prisjeger

# Bygger React prosjekt om igjen
cd /home/pi/applikasjon/prisjeger
npm i
cd /home/pi/applikasjon/prisjeger/backend
npm i
cd /home/pi/applikasjon/prisjeger/frontend
npm i
npm run build

# Starter tjenester på nytt
systemctl daemon-reload
systemctl start prisjeger-backend.service
systemctl start prisjeger-frontend.service
