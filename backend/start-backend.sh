#!/bin/bash
# Skriptet som initialiserer backend. Dette skriptet startes
# av SystemD ved oppstart av maskinen og startes automatisk på
# nytt dersom det slutter å kjøre ved f.eks systemkræsj.
# Dmitriy Safiullin


echo -e "\nForsøker å starte backend...\n"
cd "$HOME/prisjeger/backend"
npm start
