import http from 'k6/http';
import { check } from 'k6';


export const options = {
    stages: [{ duration: '1m', target: 500 }, // Aumenta para 500 usuários em 1 minuto
    { duration: '3m', target: 1000 }, // Escala para 1.000 usuários em 3 minutos
    { duration: '2m', target: 1000 }, // Mantém 1.000 usuários por 2 minutos
    { duration: '1m', target: 0 }, // Reduz para 0 usuários em 1 minuto
    ],
    thresholds: {
        http_req_duration: [
            'p(95)<1000',  // 95% das requisições devem responder em até 1 segundo
            'p(99)<2000'   // 99% das requisições devem responder em até 2 segundos
        ],
        http_req_failed: ['rate<0.01'], // Menos de 1% de falhas aceitável
    },
};

export default function () {
    const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
    const res = http.get(BASE_URL);
    check(res, {
        'status é 200': (r) => r.status === 200,
    });
}