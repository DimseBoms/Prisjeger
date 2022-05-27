import backendApi from "../axios/backendApi";
console.log('hei')

backendApi.hentLogg().then(response => {
    console.log(response)   
})

