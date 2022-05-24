#!/bin/bash
echo Forsøker å starte frontend...
cd /home/pi/applikasjon/prisjeger/frontend
nvm use system
serve -s -C -n -p 3000 build
