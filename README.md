# Casino Delfines

## Descripción
Casino Delfines es una plataforma web interactiva de entretenimiento diseñada exclusivamente para fines académicos. El sistema opera de manera simulada utilizando créditos virtuales, sin dinero real, permitiendo a los usuarios disfrutar de juegos de azar clásicos en un entorno seguro y controlado.

## Roles
El sistema contempla dos perfiles diferenciados:
* Jugador: Usuario estándar que puede registrarse, reclamar su bono inicial,  participar en juegos (Ruleta y Blackjack) y visualizar sus estadísticas y ranking.
* Administrador: Rol encargado de la supervisión y gestión general de la plataforma y los usuarios.

## Estado actual del proyecto (Entrega 1)
Esta entrega corresponde a las vistas de la interfaz de usuario con validación básica en el lado del cliente (DOM), sin persistencia en base de datos ni lógica de backend todavía (las funcionalidades completas se implementarán en entregas futuras).

## Información Académica
* Universidad: Universidad Diego Portales
* Carrera: Ingeniería Civil en Informática y Telecomunicaciones 
* Curso: CIT2308, Sección 02 - Desarrollo Web
* Integrantes del Grupo:
  * Felipe Miranda
  * Matias Muñoz
  * Diego Miranda

## Infraestructura y Despliegue
* Servidor: AWS EC2
* IP Pública: 
* Servidor Web: Nginx sirviendo las vistas estáticas en la raíz .

## Vistas / Rutas Implementadas
* /index.html — Página principal con el resumen de créditos y accesos directos.
* /Login.html — Vista de inicio de sesión y registro de cuentas con validación nativa y de DOM.
* /Creditos.html — Sección para reclamar el bono de créditos iniciales.
* /historial.html — Vista de historial de apuestas y balance del usuario.
* /Ranking.html — Tabla de clasificación con el Top de jugadores.
* /admin.html — Panel de control del administrador para gestionar juegos, auditar usuarios y revisar las estadísticas generales del casino.