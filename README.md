# LONG XING — sitio web

Sitio estático y responsivo de LONG XING, listo para subir a un repositorio o a un hosting convencional.

## Estructura

- `dist/index.html`: portada.
- `dist/menu.html`: menú interactivo por categorías.
- `dist/marcas.html`: familia de marcas.
- `dist/unete.html`: contacto para formar parte del equipo.
- `dist/styles.css`: estilos, animaciones y diseño responsivo.
- `dist/script.js`: navegación móvil y pestañas del menú.
- `dist/assets/`: logos, platillos, bebidas, mascota y decoraciones PNG.

## Publicación

Configura la carpeta pública del hosting como `dist`. No requiere compilación ni dependencias.

## Vista previa local

Con Node.js instalado:

```powershell
node dev-server.mjs
```

Abre `http://127.0.0.1:46731`.

## Datos pendientes

Los precios de los platillos 1 y 3, así como los precios de las bebidas, se muestran como información por confirmar para no inventar datos.
