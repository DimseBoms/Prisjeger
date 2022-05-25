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
    getVareFra(vare, fradato) {
      return http.get(`/vare/${vare}/${fradato}`)
    }
    // Metode for å vise all prisdata for en vare mellom to tidspunkt
    getVareFraTil(vare, fradato, tildato) {
      return http.get(`/vare/${vare}/${fradato}/${tildato}`)
    }
    // Metode for å vise all prisdata for en butikk
    getButikk(butikk) {
      return http.get(`/butikk/${butikk}`)
    }
    // Metode for å vise all prisdata for en butikk fra et tidspunkt
    getButikkFra(butikk, fradato) {
      console.log('henter varedata')
      return http.get(`/butikk/${butikk}/${fradato}`)
    }
    // Metode for å vise all prisdata for en butikk mellom to tidspunkt
    getButikkFraTil(butikk, fradato, tildato) {
      return http.get(`/butikk/${butikk}/${fradato}/${tildato}`)
    }
    getLogStatus(lvl, status){
      return http.get(`/logger/${lvl}/${status}`)
    }
    postRegistrer(postObjekt) {
      console.log("Startet registrering")
      http.post(`/test`, postObjekt).then(response => {
          console.log(response)
      });
    }
    postTest(postObjekt) {
      console.log("Startet postTest()")
      http.post(`/testpost`, postObjekt).then(response => {
          console.log(response)
      });
    } 

  async loginSjekk(postObjekt) {
      console.log("loginsjekker")
      http.post(`/login`, postObjekt).then(response => {
        console.log(response.data.bruker)
        if(response.data.melding === 'innlogget'){
          localStorage.setItem('token', response.data.bruker)  
          //window.location.href = '/dashboard'
        }
        return response;
      });
    } 


  }
  

  export default new BackendApi