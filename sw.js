const VERSION = 'casino-delfines-v2';
const ALPINE_CDN = 'https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js';

const SHELL = [
    './', 'index.html', 'Login.html', 'Creditos.html', 'historial.html',
    'Ranking.html', 'admin.html', 'ruleta.html', 'blackjack.html', 'manifest.json',
    'ccs_front/Admin.css', 'ccs_front/Creditos.css', 'ccs_front/Historial.css',
    'ccs_front/Inicio.css', 'ccs_front/Ranking.css', 'ccs_front/login.css',
    'js/main.js',
    'js/apuestas.controller.js', 'js/apuestas.repository.js', 'js/apuestas.service.js',
    'js/usuario.controller.js', 'js/usuario.repository.js', 'js/usuario.service.js',
    'js/Dominio_Juego/juego_controller.js',
    'js/Dominio_Juego/juego_formulario_controller.js', 'js/Dominio_Juego/juego_repositorio.js',
    'js/Dominio_Juego/juego_service.js', 'js/Dominio_Juego/storage_repositorio.js',
    'js/Dominio_Admin/admin_service.js', 'js/Dominio_Admin/admin_metricas_controller.js',
    'js/Dominio_Admin/admin_usuarios_controller.js', 'js/Dominio_Admin/admin_movimientos_controller.js',
    'imagenes/delfincasino.jpg', 'imagenes/Fondo_Login.jpg',
    'imagenes/images_007_d-RH.jpg', 'imagenes/blackjack-logo-with-green-ribbon-and-on-a-green-backgro_BQog.jpg',
    'imagenes/icon-192.png', 'imagenes/icon-512.png',
    ALPINE_CDN
];

self.addEventListener('install', (evento) => {
    evento.waitUntil(
        caches.open(VERSION).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (evento) => {
    evento.waitUntil(
        caches.keys()
            .then((claves) => Promise.all(claves.filter((c) => c !== VERSION).map((c) => caches.delete(c))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (evento) => {
    if (evento.request.method !== 'GET') return;
    evento.respondWith(
        caches.match(evento.request, { ignoreSearch: true })
            .then((guardado) => {
                if (guardado) {
                    return guardado;
                }
                return fetch(evento.request).catch(() => {
                    if (evento.request.mode === 'navigate') {
                        return caches.match('index.html');
                    }
                });
            })
    );
});