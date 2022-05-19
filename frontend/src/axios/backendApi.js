import http from "./axiosInit";

class BackendApi {
    getAll() {
      return http.get('/historikk');
    }
    getVareliste() {
      return http.get('/vareliste');
    }
    getButikkliste() {
      return http.get('/butikkliste');
    }
    getHandlelister(epost) {
      return http.get(`/handlelister/${epost}`)
    }
    getVare(vare) {
      return http.get(`/vare/${vare}`)
    }
    getVare(butikk) {
      return http.get(`/butikk/${butikk}`)
    }
    
  }
  
  export default new BackendApi
();