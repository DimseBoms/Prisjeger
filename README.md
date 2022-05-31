# prisjeger
Velkommen til prisjeger!

## installasjon
### Installere Node.JS og Git
- For å kjøre nettsiden lokalt er du nødt for å ha installert node på forhånd: [https://nodejs.org/en/]
- Git må også installeres dersom du du skal klone prosjektet programmatisk: [https://git-scm.com/downloads]
### Klone prosjektet
- Deretter kan du klone prosjektet: `git clone https://github.com/DimseBoms/prisjeger`
### Starte backend
- Deretter er du nødt for å åpne to terminalvinduer, en for backend og en for frontend.
- I den første navigerer du til backend: `cd backend`
- Installerer avhengigheter for backend ved hjelp av NPM: `npm i`
- og starter backend: `npm run devStart`
### Starte frontend
- I det andre terminalvinduet navigerer du deg til frontend: `cd frontend`
- Installerer avhengigheter for frontend ved hjelp av NPM: `npm i`
- Starter frontend: `npm start`
- Nettsiden skal nå åpne automatisk i nettleseren din.

For å kunne koble deg opp mot databasen er du nødt til å ha en `.env` fil liggende i /backend. Denne inneholder påloggingsinformasjonen til MongoDB og er ikke inkludert i GitHub versjonen av dette prosjektet. `.env` filen skal følge med i .ZIP versjonen av prosjektet som skal lastes opp til Canvas.

### Testbrukere
For å logge inn som administrator kan du logge inn med følgende bruker:
- mail: **admin@admin.com**  
- pw: **adminpassord**
#### Andre test-brukere:
- mail: **tore@mail.com** 
- pw: **passord**
- mail: **testbruker2@usn.no** 
- pw: **usnpassord**

# Webapplikasjon og API - Tilgjengelighet
- Ellers er webapplikasjonen tilgjengelig uten å måtte installere lokalt via denne lenken:
**http://prisjeger-app.duckdns.org:3000/**
- Og API kan nås gjennom denne lenken:
**http://prisjeger-app.duckdns.org:6969/api/**

## API
Eksempler på tilgjengelige API kall i prisAPI:
- Hent handlelister for en bruker:
`http://prisjeger-app.duckdns.org:6969/api/handlelister/testbruker@testmail.no`
- Hent alle prisdata for en vare:
`http://prisjeger-app.duckdns.org:6969/api/vare/Fish and Crips, Findus, 480 gram`
- Hent liste over varer:
`http://prisjeger-app.duckdns.org:6969/api/vareliste`
- Henter all prishistorikk:
`http://prisjeger-app.duckdns.org:6969/api/historikk`
- Hent liste over tilgjengelige butikker:
`http://prisjeger-app.duckdns.org:6969/api/butikkliste`
- Hent prisdata for en butikk:
`http://prisjeger-app.duckdns.org:6969/api/butikk/Meny`
- Hent alle data for en vare:
`http://prisjeger-app.duckdns.org:6969/api/vare/Fish and Crips, Findus, 480 gram`
- Hent alle data for en vare fra en dato:
`http://prisjeger-app.duckdns.org:6969/api/vare/Fish and Crips, Findus, 480 gram/2021-12-12`
- Hent alle data for en vare mellom to datoer:
`http://prisjeger-app.duckdns.org:6969/api/vare/Fish and Crips, Findus, 480 gram/2021-12-12/2022-01-30`
- Hent nyeste priser:
`http://prisjeger-app.duckdns.org:6969/api/siste`
- Hent handlelister for en bruker:
`http://prisjeger-app.duckdns.org:6969/api/handlelister/testbruker@testmail.no/liste1`
- Slett handleliste:
`http://prisjeger-app.duckdns.org:6969/api/handlelister/testbruker@testmail.com/liste3/remove`

## Webskraper for prisdata
Vi benyttet oss av en egenlaget webskraper for å hente inn initiell prisdata. Denne finner du her:
[https://github.com/DimseBoms/Prisjeger-Skraper](https://github.com/DimseBoms/Prisjeger-Skraper)
### Prosjektdeltakernes egen kode
I backend er alle filene skrevet av gruppemedlemmene. I frontend er mange filer gjenstående fra template, men mange filer er delvis eller fullstendig omskrevet:
```
Prisjeger
|
|___backend
|	  |___datamodeller
|	  |		|___brukerModell.js
|	  |		|___prisdataModell.js
|	  |		|___varelisteModell.js
|	  |
|	  |_____ruter
|	  |	    |___ruter.js
|	  |
|	  |___logger.js
|	  |___logger.js
|	  |___server.js
|	  |___start-backend.sh
|
|____frontend
	    |___src
	    |	   |___axios
	    |	   |	   |___axiosInit.js
	    |	   |	   |___axiosPostInit.js
	    |	   |	   |___backenApi.js
	    |	   |
	    |	   |___components
	    |	   |		|___navbars
	    |	   |			  |___dedmoNavbar.js (redigert)
	    |	   |						    
	    |	   |___layouts
	    |	   |	     |___admin.js (redigert)
	    |	   |
	    |	   |
 	    |	   |___variables
	    |	   |           |___sampledata.js
	    |	   |
	    |	   |___views
	    |		   |___addLanguage.js
	    |		   |___Dashborad.js
	    |		   |___HandleListe.js
	    |		   |___LoggFøring.js
	    |		   |___Login.js
	    |		   |___LogVisning.js
	    |		   |___Registrer.js
	    |		   |___Scanner.js
	    |		   |___User.js
	    |
	    |___routes.js (redigert)
```
