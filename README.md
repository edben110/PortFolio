# 💼 Portfolio - Edwar Alexander Benito Basante

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🚀 Descripción

Portfolio personal moderno con diseño temático verde estilo hacker/tech. Presenta un efecto de lluvia de caracteres estilo Matrix en el fondo, diseño responsivo y animaciones fluidas.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con tema verde tecnológico
- 🌧️ **Efecto Matrix**: Animación de lluvia de caracteres en el fondo usando Canvas API
- 📱 **Responsive**: Totalmente adaptable a dispositivos móviles, tablets y desktop
- ⚡ **Rendimiento**: Optimizado para carga rápida y animaciones suaves
- 🎯 **Secciones Completas**:
  - Hero con presentación personal
  - Sobre mí con intereses
  - Habilidades técnicas categorizadas
  - Portafolio de proyectos
  - Experiencia
  - Contacto con enlaces funcionales
  - Footer con redes sociales

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Flexbox, Grid, Animaciones
- **JavaScript**: Módulos ES6, Canvas API, IntersectionObserver
- **Font Awesome**: Iconografía
- **Google Fonts**: Poppins y Fira Code

## 📂 Estructura del Proyecto

```
PortFolio/
├── index.html           # Estructura principal
├── styles.css           # Estilos completos
├── script.js            # Funcionalidad general
├── matrix.js            # Controlador principal del efecto Matrix
├── matrix-effect.js     # Clase Effect para el efecto Matrix
├── matrix-symbol.js     # Clase Symbol para caracteres individuales
└── .nojekyll           # Configuración para GitHub Pages
```

## 🚀 Despliegue

### GitHub Pages

Este portfolio está configurado para desplegarse automáticamente en GitHub Pages:

1. Ve a `Settings` > `Pages` en tu repositorio
2. En `Source`, selecciona la rama `main`
3. Guarda los cambios
4. Tu sitio estará disponible en: `https://edben110.github.io/PortFolio/`

### Ejecución Local

Para ejecutar el proyecto localmente (necesario para módulos ES6):

```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js
npx serve .

# Opción 3: PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

## 🎨 Personalización

### Colores

Los colores se definen en las variables CSS al inicio de `styles.css`:

```css
:root {
    --primary-color: #00ff41;
    --primary-dark: #00cc33;
    --primary-light: #39ff14;
    /* ... más colores */
}
```

### Contenido

- **Información personal**: Edita las secciones en `index.html`
- **Habilidades**: Modifica las skill cards en la sección `#skills`
- **Proyectos**: Actualiza las portfolio cards en la sección `#portfolio`
- **Enlaces de contacto**: Cambia las URLs en las tarjetas de contacto y footer

### Efecto Matrix

Puedes ajustar el efecto Matrix en `matrix.js`:

```javascript
const fps = 30; // Frames por segundo (más bajo = mejor rendimiento)
const matrixColor = "#00ff41"; // Color de los caracteres
```

Y en `styles.css`:

```css
#matrixCanvas {
    opacity: 0.15; /* Opacidad del efecto (0.1 - 0.3 recomendado) */
}
```

## 📞 Contacto

- **Email**: edben1407@gmail.com
- **GitHub**: [@edben110](https://github.com/edben110)
- **LinkedIn**: [edben](https://linkedin.com/in/edben)

## 📄 Licencia

MIT License - Siéntete libre de usar este código para tu propio portfolio.

---

⭐ Si te gustó este proyecto, ¡no olvides darle una estrella!
