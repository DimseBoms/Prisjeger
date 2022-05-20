#!/bin/bash

# Et lite skript som henter nyeste versjon av prosjektet fra GitHub. Bygger det på nytt
# lokalt og sørger for å starte de nødvendige tjenestene på nytt

# Stopper tjenester
systemctl stop prisjeger-backend.service
systemctl stop prisjeger-frontend.service

# Henter nytt fra GitHub
cd /home/pi/applikasjon/prisjeger
git pull --force

# Bygger React prosjekt om igjen
cd /home/pi/applikasjon/prisjeger/frontend
npm run build

# Starter tjenester på nytt
systemctl daemon-reload
systemctl start prisjeger-backend.service
systemctl start prisjeger-frontend.service

