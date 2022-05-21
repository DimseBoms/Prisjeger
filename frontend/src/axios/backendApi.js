import http from "./axiosInit";

class BackendApi {
    // returnerer all prishistorikk
    getAll() {
      return http.get('/historikk');
    }
    // returnerer vareliste
    getVareliste() {
      return http.get('/vareliste');
    }
    // returnerer butikkliste
    getButikkliste() {
      return http.get('/butikkliste');
    }
    // henter handlelister for en epost/bruker
    getHandlelister(epost) {
      return http.get(`/handlelister/${epost}`)
    }
    // Metode for å vise all prisdata for en vare
    getVare(vare) {
      return http.get(`/vare/${vare}`)
    }
    // Metode for å vise all prisdata for en vare fra et tidspunkt
    getVare(vare, fradato) {
      return http.get(`/vare/${vare}/${fradato}`)
    }
    // Metode for å vise all prisdata for en vare mellom to tidspunkt
    getVare(vare, fradato, tildato) {
      return http.get(`/vare/${vare}/${fradato}/${tildato}`)
    }
    // Metode for å vise all prisdata for en butikk
    getButikk(butikk) {
      return http.get(`/butikk/${butikk}`)
    }
    // Metode for å vise all prisdata for en butikk fra et tidspunkt
    getButikk(butikk, fradato) {
      return http.get(`/butikk/${butikk}/${fradato}`)
    }
    // Metode for å vise all prisdata for en butikk mellom to tidspunkt
    getButikk(butikk, fradato, tildato) {
      return http.get(`/butikk/${butikk}/${fradato}/${tildato}`)
    }

    // Post metoder
    postTest(postObjekt) {
      console.log("Startet postTest()")
      http.post('/testpost', postObjekt).then(response => {
          console.log(response)
      });
    }
  }
  

  export default new BackendApi