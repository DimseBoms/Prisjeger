#!/bin/bash
echo Forsøker å starte backend...
cd /home/pi/applikasjon/prisjeger/backend
nvm use 16.15.0
npm run devStart
