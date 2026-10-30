# Casino Delfines

## Descripción
Casino Delfines es una plataforma web interactiva de entretenimiento diseñada exclusivamente para fines académicos. El sistema opera de manera simulada utilizando créditos virtuales.

## Estado actual del proyecto (Entrega 2)
Esta entrega corresponde a un Frontend dinámico y Aplicación Web Progresiva (PWA).

## Información Académica
* Universidad: Universidad Diego Portales
* Curso: CIT2308, Sección 02 - Desarrollo Web
* Integrantes: Felipe Miranda, Matias Muñoz, Diego Miranda

## Infraestructura y Despliegue
* IP Elástica (Pública): 34.234.232.163
* Cómo ejecutar: La aplicación está desplegada en un servidor AWS EC2 con Nginx. Solo debe ingresar la IP en el navegador.

## Mapa de Dominios (Arquitectura MVC)
* **Dominio Usuarios:** 
  * Vista: index.html, Login.html, Creditos.html, Ranking.html
  * Controlador: js/usuario.controller.js
  * Servicio: js/usuario.service.js
  * Repositorio: js/usuario.repository.js
* **Dominio Apuestas:**
  * Vista: historial.html
  * Controlador: js/apuestas.controller.js
  * Servicio: js/apuestas.service.js
  * Repositorio: js/apuestas.repository.js
* **Dominio Admin & Juegos:**
  * Vista: admin.html, ruleta.html, blackjack.html
  * Controlador: js/Dominio_Admin/ (metricas, movimientos, usuarios), js/Dominio_Juego/
  * Servicio: js/Dominio_Admin/admin_service.js, js/Dominio_Juego/juego_service.js
  * Repositorio: Reutiliza usuario y apuestas; js/Dominio_Juego/storage_repositorio.js
* **Composition Root:** js/main.js

## Presentación del Proyecto
[Haz clic aquí para ver el video de presentación del Casino](https://drive.google.com/drive/folders/1dI90wrrXkXyvcuCQLv-0AaWPj17T8V5-?usp=sharing)
