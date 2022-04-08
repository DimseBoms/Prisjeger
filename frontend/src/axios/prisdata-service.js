import http from "./axios-init";

class PrisDataService {
    getAll() {
      return http.get('/historikk');
    }
    getVareliste() {
      return http.get('/vareliste');
    }
  }
  
  export default new PrisDataService();