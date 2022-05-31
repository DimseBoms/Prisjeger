# prisjeger
Velkommen til prisjeger!

## installasjon
For å kunne kjøre nettsiden lokalt, er du nødt til å åpne prisjeger-mappen i en teksteditor og åpne to terminaler. 
I en av terminalene, og i prisjeger-mappen skriver du først: `npm i` for å intallere node package manager.

For å kunne koble deg opp mot databasen er du nødt til å ha en fil `.env` i backend. Denne fila følger med og skal ligge i zip-fila.
 
Deretter kan du manøvrere til backend-mappen `cd backend`.
Her skriver du: `npm run devStart` for å koble til databaseserver i backend.

I den andre terminalen kan du manøvrere til frontend-mappen `cd frontend`, og kjører kommandoen: 
`npm start`.

Nettsiden skal nå laste inn i nettleseren din. 

For å logge inn som administrator kan du logge inn med følgende bruker:
mail: **admin@admin.com**  
pw: **adminpassord**
Andre test-brukere:
mail: **tore@mail.com** 
pw: **passord**
mail: **testbruker2@usn.no** 
pw: **usnpassord**

Ellers er nettsiden tilgjengelig på denne lenken:
**http://prisjeger-app.duckdns.org:9090/**

## API
Eksempler på tilgjengelige API kalli prisAPI:
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
