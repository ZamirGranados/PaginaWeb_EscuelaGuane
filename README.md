# Institución Educativa Guane — Página web institucional

Sitio web one-page para la Institución Educativa Guane, colegio rural
oficial ubicado en el corregimiento de Guane, Barichara (Santander,
Colombia), con 4 sedes: Sede Principal Guane, Sede Butaregua, Sede
Carare y Sede Vereda Regadillo.

Construido con **HTML5, CSS3 y JavaScript vanilla** (sin frameworks ni
dependencias externas), pensado para ser liviano, fácil de mantener y
desplegable directamente en GitHub Pages.

## Estructura del proyecto

```
/index.html          → estructura de todas las secciones
/css/styles.css       → variables de color, layout, animaciones, responsive
/js/main.js           → menú móvil, animaciones de scroll, contador de cifras
/assets/img/logo.png  → logo institucional (debes colocarlo tú aquí)
/assets/img/README.txt → notas sobre imágenes pendientes (fotos de sedes)
```

## Cómo correr el proyecto en local

No requiere instalación de dependencias (no usa Node, npm, ni build tools).

**Opción 1 — Abrir directamente el archivo:**
Haz doble clic en `index.html` o ábrelo desde el navegador
(`Archivo > Abrir > index.html`).

**Opción 2 — Servidor local (recomendado):**
Usar un servidor evita problemas de rutas relativas en algunos navegadores.

Con la extensión **Live Server** de VS Code:
1. Abre la carpeta del proyecto en VS Code.
2. Clic derecho sobre `index.html` → "Open with Live Server".

O con Python (si lo tienes instalado):
```bash
python -m http.server 8000
```
Luego abre `http://localhost:8000` en el navegador.

## Cómo publicar en GitHub Pages

1. Confirma que el logo real esté en `assets/img/logo.png` y haz commit de todos los archivos:
   ```bash
   git add index.html css/styles.css js/main.js assets/img/logo.png assets/img/README.txt README.md
   git commit -m "Primera versión del sitio institucional I.E. Guane"
   git push origin main
   ```

2. En GitHub, entra al repositorio → pestaña **Settings**.

3. En el menú lateral, ve a **Pages**.

4. En "Build and deployment" → "Source", selecciona **Deploy from a branch**.

5. En "Branch", selecciona `main` y la carpeta `/ (root)`. Guarda.

6. Espera 1-2 minutos. GitHub mostrará la URL pública, normalmente:
   ```
   https://<tu-usuario-github>.github.io/<nombre-del-repositorio>/
   ```

7. Cada vez que hagas `git push` a `main`, el sitio se actualizará automáticamente.

## Pendientes conocidos (placeholders por reemplazar)

- Direcciones y teléfonos reales de las 4 sedes (marcados como
  `// Confirmar dirección exacta` / `// Confirmar teléfono` en el
  código de `index.html`, secciones "Nuestras sedes" y footer).
- Fotos reales de cada sede (reemplazar los recuadros grises
  "Imagen sede [nombre]").
- Testimonio real de un padre/estudiante de la comunidad (actualmente
  hay un testimonio de ejemplo marcado como placeholder).
- Enlaces reales de redes sociales en el footer (actualmente apuntan a `#`).
- Enlace real a la política de tratamiento de datos en el footer.
