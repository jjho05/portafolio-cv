# 🌐 Portfolio CV - Jesús Olvera

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Portfolio personal multiidioma (Español/Inglés) con diseño moderno, efectos glassmorphism y animaciones suaves. Especializado en mostrar proyectos de **Inteligencia Artificial**, **Python** y **Análisis de Datos**.

## 🎮 Demo en Vivo

**¡Visita mi portfolio!** 👉 [https://jjho05.github.io/portfolio-cv/](https://jjho05.github.io/portfolio-cv/)

## ✨ Características

### 🌍 Multiidioma (i18n)
- **Detección automática** del idioma del navegador
- **Toggle manual** entre Español e Inglés
- **Persistencia** de preferencia en localStorage
- Traducciones completas de todo el contenido

### 🎨 Diseño Moderno
- **Dark mode** con paleta de colores vibrante
- **Glassmorphism** en tarjetas y componentes
- **Gradientes animados** en títulos y botones
- **Animaciones suaves** con scroll reveal
- **Responsive design** para todos los dispositivos

### 🎮 Funcionalidades Interactivas
- ✨ **Barra de Progreso de Scroll** - Indicador visual del progreso de lectura
- 🎨 **50 Partículas Animadas** - Fondo dinámico en la sección hero
- 🎯 **Efectos 3D en Tarjetas** - Transformaciones tilt al hacer hover
- 🧲 **Botones Magnéticos** - Botones que "siguen" el cursor
- 💫 **Efectos Ripple** - Ondas al hacer click
- 🌊 **Blobs Morphing** - Formas orgánicas animadas de fondo
- 📚 **Integración DeepWiki** - Enlaces directos a documentación AI de cada proyecto
- 🔝 **Scroll to Top** - Botón flotante para volver arriba

### 📱 Secciones Incluidas
1. **Hero** - Presentación con nombre y especialización
2. **Sobre Mí** - Biografía y estadísticas
3. **Proyectos** - 6 proyectos destacados de IA y Python
4. **Juegos** - 5 juegos web interactivos con enlaces a GitHub Pages
5. **Habilidades** - 8 categorías de tecnologías
6. **Contacto** - Email, GitHub e Instagram

### 🚀 Proyectos Destacados

#### Inteligencia Artificial
- **BRAINY2** - Laboratorio de Álgebra Lineal con IA
- **VEXEL** - Visualizaciones científicas 3D con Gemini
- **AURA APP** - Asistente emocional con IA
- **PROMPTS IA** - Generador de prompts con Gemini

#### Juegos Web (GitHub Pages)
- **Son Carreras, No Carreritas** - Endless runner 3D
- **Esfera 3D** - Neon runner cyberpunk
- **Block Builder** - Constructor LEGO 3D
- **Windows 95** - Simulador nostálgico
- **Tetris** - Clásico en Python

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos con variables CSS y glassmorphism
- **JavaScript ES6+** - Lógica e interactividad
- **Google Fonts** - Inter y Poppins
- **Font Awesome 6** - Iconografía

## 📁 Estructura del Proyecto

```
portfolio-cv/
├── index.html              # Página principal
├── css/
│   ├── styles.css         # Sistema de diseño y estilos base
│   ├── components.css     # Estilos de componentes
│   └── animations.css     # 20+ efectos y animaciones avanzadas
├── js/
│   ├── i18n.js           # Sistema de internacionalización
│   ├── main.js           # Lógica principal e interactividad
│   ├── interactive.js    # Efectos interactivos (partículas, 3D, ripple)
│   └── deepwiki.js       # Integración automática con DeepWiki
├── data/
│   └── translations.json  # Traducciones ES/EN
└── README.md             # Este archivo
```

## 🚀 Instalación y Uso

### Opción 1: Abrir Directamente
```bash
# Simplemente abre index.html en tu navegador
open index.html
```

### Opción 2: Servidor Local
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve

# Luego visita: http://localhost:8000
```

### Opción 3: GitHub Pages

1. **Sube el código a GitHub**
2. **Activa GitHub Pages**:
   - Ve a Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/root`
   - Save
3. **Accede a**: `https://TU-USUARIO.github.io/portfolio-cv/`

## 🎨 Personalización

### Cambiar Colores
Edita las variables CSS en `css/styles.css`:

```css
:root {
  --primary: hsl(210, 100%, 60%);
  --secondary: hsl(280, 100%, 65%);
  --accent: hsl(340, 100%, 60%);
  /* ... más colores */
}
```

### Añadir/Editar Traducciones
Modifica `data/translations.json`:

```json
{
  "es": {
    "nav": {
      "about": "Sobre Mí"
    }
  },
  "en": {
    "nav": {
      "about": "About"
    }
  }
}
```

### Agregar Proyectos
Edita `index.html` en la sección de proyectos:

```html
<div class="project-card card">
  <div class="project-icon">
    <i class="fas fa-icon-name"></i>
  </div>
  <h3>Nombre del Proyecto</h3>
  <p>Descripción...</p>
  <div class="project-tags">
    <span class="tag">Tecnología</span>
  </div>
  <div class="project-links">
    <a href="URL" class="btn btn-primary btn-sm">Ver Demo</a>
  </div>
</div>
```

## 🎯 Características Técnicas

### Sistema de Internacionalización
- Detección automática con `navigator.language`
- Fallback a español si no es inglés
- Actualización dinámica del DOM sin recargar
- Soporte para atributos `data-i18n`, `data-i18n-placeholder`, `data-i18n-title`

### Animaciones
- **Scroll reveal** con Intersection Observer
- **Parallax effect** en hero section
- **Counter animation** en estadísticas
- **Hover effects** en tarjetas
- **Typing effect** en subtítulo (opcional)

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px
- Menú hamburger en móvil
- Grid adaptativo con `auto-fit`

### SEO
- Meta tags optimizados
- Open Graph tags
- Atributo `lang` dinámico
- Estructura semántica HTML5

## 🌟 Características Especiales

- **Easter Egg**: Código Konami (↑↑↓↓←→←→BA)
- **Console Art**: Mensajes de bienvenida en consola
- **Smooth Scroll**: Navegación suave entre secciones
- **Active Link**: Resaltado de sección actual
- **Scroll to Top**: Botón para volver arriba (opcional)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Jesús Olvera**
- GitHub: [@jjho05](https://github.com/jjho05)
- Email: jjho.reivaj05@gmail.com
- Instagram: [@jesus_117z](https://instagram.com/jesus_117z)

## 🙏 Agradecimientos

- Inspirado en portfolios modernos de desarrolladores
- Diseño basado en tendencias de glassmorphism y dark mode
- Fuentes de Google Fonts
- Iconos de Font Awesome

---

<div align="center">

**¿Te gustó? ⭐ Dale una estrella al repo!**

*Hecho con ❤️ y mucho código*

</div>
