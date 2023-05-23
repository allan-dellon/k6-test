import GetUsuario from './cenarios/Get-Usuario.js';
import {group , sleep} from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import load_test from './stress_test.js';
import stress_test from './stress_test.js';

export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }

export default () => {
   group('Endpoint Get Usuario - Controller Usuario - Usuario.Api', () => {
        GetUsuario();
    });
/*
    group('Endpoint Get Usuario - Controller Usuario - Usuario.Api', () => {
      stress_test();
  });
*/
    sleep(1);
}

