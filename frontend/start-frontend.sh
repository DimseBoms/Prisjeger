#!/bin/bash
# Skriptet som initialiserer frontend. Dette skriptet startes
# av SystemD ved oppstart av maskinen og startes automatisk på
# nytt dersom det slutter å kjøre ved f.eks systemkræsj.
# Dmitriy Safiullin


echo -e "\nForsøker å starte frontend...\n"
cd "$HOME/prisjeger/frontend"
npm start
