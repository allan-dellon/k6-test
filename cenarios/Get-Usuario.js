import http from 'k6/http';
import {sleep} from 'k6';
import {Trend, Rate, Counter} from "k6/metrics";
import { check, fail} from "k6";

export let GetUsuarioDuration = new Trend('get_usuario_duration'); //tempo de ms da requisição
export let GetUsuarioFailRate = new Rate('get_usuario_fail_rate'); // percentual de quanto deu falha
export let GetUsuarioSuccessRate = new Rate('get_usuario_success_rate'); // percentual de quanto deu sucesso
export let GetUsuarioReqs = new Rate('get_usuario_reqs'); // métricas de porcentagem de requisição

export default function(){
 //   let res = http.get('http://localhost:8083/usuario');
    let res = http.get('https://test.k6.io');

    GetUsuarioDuration.add(res.timings.duration);
    GetUsuarioReqs.add(1);
    GetUsuarioFailRate.add(res.status == 0 || res.status > 399); // status de falha
    GetUsuarioSuccessRate.add(res.status < 399); // status de sucesso

    let durationMsg = 'Max Duration ${1000/1000}s';

    if(!check (res, {
        'max duration': (r) => r.timings.duration < 1000,
    })){
        fail(durationMsg);
    }

    sleep(1);


}