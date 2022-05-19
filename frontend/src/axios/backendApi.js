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
  }
  
  export default new BackendApi
();