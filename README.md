# Lagunas de Magallanes vistas desde el espacio

Visor web de cuatro casos de estudio con imágenes Sentinel-2 y datos climáticos ERA5-Land, temporadas 2017-2018 a 2025-2026:

1. Laguna Blanca (cuenca completa)
2. Zona de plantación de Salicornia magellanica, Laguna Blanca
3. Laguna Los Palos
4. Laguna Ana, Parque Nacional Pali Aike

Proyecto 503780-25, INIA, convenio de colaboración con la Municipalidad de Laguna Blanca.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub, por ejemplo `lagunas-magallanes`.
2. Sube todo el contenido de esta carpeta a la raíz del repositorio (botón "Add file" y luego "Upload files", o con git).
3. En el repositorio, entra a Settings, luego Pages.
4. En "Build and deployment", elige "Deploy from a branch", rama `main` y carpeta `/ (root)`. Guarda.
5. En uno o dos minutos el sitio queda en `https://TU-USUARIO.github.io/lagunas-magallanes/`.

El sitio es estático: no necesita compilación ni servidor. Para verlo en tu computador, abre una terminal en esta carpeta y ejecuta `python3 -m http.server`, luego entra a `http://localhost:8000`.

## Contenido

| Archivo o carpeta | Qué es |
|---|---|
| `index.html` | Página principal con textos de cada caso |
| `estilos.css` | Estilos (modo claro y oscuro) |
| `app.js` | Visor de mapas, selector de temporada y gráficos |
| `datos.js` | Series por temporada de cada caso y datos de clima |
| `img/` | Capas de mapa por caso, capa y temporada |
| `informe/` | Informe técnico completo en PDF |
| `vendor/leaflet/` | Biblioteca Leaflet 1.9.4 (licencia BSD-2) |

## Fuentes de datos

- Capas de mapa de Laguna Ana, Laguna Los Palos y la zona de plantación: GeoTIFF exportados desde Google Earth Engine (Sentinel-2 SR Harmonized con máscara Cloud Score+), reproyectados a Web Mercator.
- Laguna Blanca completa: mapas y cifras del informe técnico.
- Clima: ERA5-Land diario (ECMWF), por temporada de noviembre a marzo.
- Imagen de fondo de los mapas: Esri World Imagery.

Contiene datos modificados de Copernicus Sentinel-2 (2017-2026).
