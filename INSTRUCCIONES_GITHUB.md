# Instrucciones para Subir el Portfolio a GitHub

## 📝 Pasos a Seguir:

### 1. Crear el Repositorio en GitHub

1. Ve a [github.com](https://github.com) y haz login
2. Click en el botón **"+"** (arriba derecha) → **"New repository"**
3. Configura el repositorio:
   - **Repository name**: `portfolio-cv`
   - **Description**: "Portfolio personal profesional con efectos interactivos y sistema multiidioma"
   - **Visibility**: ✅ Public
   - **NO** marques "Initialize this repository with a README" (ya lo tenemos)
4. Click en **"Create repository"**

### 2. Conectar y Subir el Código

GitHub te mostrará instrucciones. Usa estas (ya tenemos el repo inicializado):

```bash
cd "/Users/lic.ing.jesusolvera/Documents/PROYECTOS PERSONALES/portfolio-cv"

# Agregar el remote de GitHub (reemplaza 'jjho05' con tu usuario si es diferente)
git remote add origin https://github.com/jjho05/portfolio-cv.git

# Cambiar el nombre de la rama a main (si es necesario)
git branch -M main

# Subir el código
git push -u origin main
```

### 3. Activar GitHub Pages

1. En tu repositorio, ve a **Settings** (⚙️)
2. En el menú lateral, click en **Pages**
3. En **Source**, selecciona:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click en **Save**
5. Espera 1-2 minutos

### 4. ¡Listo! 🎉

Tu portfolio estará disponible en:
```
https://jjho05.github.io/portfolio-cv/
```

---

## 📊 Estado Actual del Repositorio

✅ Git inicializado
✅ Todos los archivos agregados
✅ Commit inicial creado
✅ README actualizado con nuevas características

### Archivos incluidos:
- `index.html` - Página principal
- `css/` - Estilos (styles.css, components.css, animations.css)
- `js/` - Scripts (main.js, i18n.js, interactive.js, deepwiki.js)
- `data/` - Traducciones (translations.json)
- `README.md` - Documentación completa

---

## 🔄 Comandos Útiles para el Futuro

### Hacer cambios y subirlos:
```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

### Ver el estado:
```bash
git status
```

### Ver el historial:
```bash
git log --oneline
```

---

## 💡 Tip

Una vez que esté en GitHub Pages, puedes compartir el link:
- En tu CV
- En LinkedIn
- En tu perfil de GitHub (README.md de tu perfil)
- En tus redes sociales
