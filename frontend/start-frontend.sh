#!/bin/bash
echo Forsøker å starte frontend...
cd /home/pi/applikasjon/prisjeger/frontend
serve -s -C -n -p 3000 build
