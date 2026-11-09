# Ramo de flores violetas

Una tarjeta con un botón «Abrir» que, al pulsarlo, hace crecer un ramo de flores violetas: el papel aparece, los tallos crecen, las flores se abren una a una, se ata el lazo y empiezan a caer pétalos.

Solo HTML, CSS y JavaScript, sin dependencias ni compilación.

## Estructura

- `index.html`: carga los estilos y el script; todo el contenido lo pinta `js/bouquet.js`.
- `css/tokens.css`: colores, fuentes y la línea de tiempo de la animación.
- `css/components/`: portada, ramo, estrellas y lluvia de pétalos.
- `js/bouquet.js`: textos y composición del ramo (tipo, color, ángulo, altura y retardo de cada flor).

## Personalizar

Los textos están al principio de `js/bouquet.js` (`TITLE`, `TEXT`, `COVER_TITLE`…). Para cambiar el ramo, edita `FLOWERS`.

## Probar en local

```bash
python3 -m http.server 8765
```

Y abre http://127.0.0.1:8765/.
