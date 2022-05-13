import http from "./axios-init";

class PrisDataService {
    getAll() {
      return http.get('/historikk');
    }
    getVareliste() {
      return http.get('/vareliste');
    }
    getButikkliste() {
      return http.get('/butikkliste');
    }
  }
  
  export default new PrisDataService();