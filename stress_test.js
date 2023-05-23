import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }

//Init
export const options ={
    stages:[
        {duration: '30s', target: 2}, // Abaixo da carga normal
        {duration: '1m', target: 2}, 
        {duration: '30s', target: 4}, //carga load
        {duration: '1m', target: 4}, 
        {duration: '30s', target: 6}, //perto do ponto de stress
        {duration: '1m', target: 6}, 
        {duration: '30s', target: 8}, //além do ponto de stress
        {duration: '1m', target: 8},
        {duration: '1m', target: 0}, //ramp-down. Estádio de recuperação

    ]

}

//base function
export default function(){

 //   let res = http.get('http://localhost:8083/usuario');
//   let res = http.get('https://test.k6.io');
    //acontecem as execuções dos VUs
    http.get('https://test.k6.io');
    sleep(1);
}