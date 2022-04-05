import http from "./axios-init";

class PrisDataService {
    getAll() {
      return http.get('/findall');
    }
  }
  
  export default new PrisDataService();