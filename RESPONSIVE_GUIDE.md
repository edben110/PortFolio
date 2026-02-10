# 📱 Guía de Responsividad del Portfolio

## 🎯 Resumen de Mejoras Implementadas

Se ha añadido una capa completa de responsividad al portfolio manteniendo los tamaños fijos en pantallas de escritorio y adaptándose de manera progresiva a dispositivos más pequeños.

## 📐 Breakpoints Implementados

### Breakpoints Principales
- **Extra pequeño (XS)**: < 360px
- **Móvil pequeño**: 360px - 480px
- **Móvil mediano**: 480px - 640px
- **Móvil grande / Tablet pequeña**: 640px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Pantallas anchas**: > 1440px
- **Ultra anchas**: > 1920px

## 🎨 Tamaños Fijos Preservados (Desktop)

Los siguientes elementos mantienen sus tamaños fijos en dispositivos de escritorio:

### Elementos con Tamaños Fijos
- **Logo**: 50px × 50px (escritorio)
- **Imagen de perfil**: 300px × 300px (escritorio)
- **Botón WhatsApp**: 65px × 65px (escritorio)
- **Skill cards en carrusel**: 150px × 140px (escritorio)
- **Iconos de tecnología**: Tamaños específicos preservados

### Adaptaciones Móviles
- **Logo móvil**: 42px → 38px → 35px (según breakpoint)
- **Imagen de perfil móvil**: 280px → 250px → 220px → 200px
- **WhatsApp móvil**: 55px → 50px → 45px
- **Skill cards móvil**: 145px → 140px → 130px → 120px

## 🔧 Características de Responsividad Implementadas

### 1. **Media Queries Progresivas**
- 8 breakpoints específicos para una adaptación suave
- Ajustes de `font-size` base (16px → 13px en móvil)
- Variables CSS dinámicas para espaciado

### 2. **Orientación Landscape**
```css
/* Optimización especial para móviles en horizontal */
@media (max-height: 600px) and (orientation: landscape)
```
- Grid de 2 columnas en hero
- Reducción de alturas
- Ajuste automático de navegación

### 3. **Touch Gestures**
```javascript
class TouchGestureHandler
```
- Swipe lateral para carruseles
- Distancia mínima de swipe: 50px
- Soporte para eventos táctiles nativos

### 4. **Manejador de Responsividad Dinámico**
```javascript
class ResponsiveHandler
```
- Detección de cambios de breakpoint
- Actualización de viewport height (móviles)
- Manejo de cambios de orientación
- Recálculo automático de layouts

### 5. **Optimizaciones de Rendimiento**
- `will-change` para animaciones suaves
- GPU acceleration con `translateZ(0)`
- Debounce en eventos de resize (250ms)
- Lazy loading de imágenes

### 6. **Safe Area Insets**
```css
@supports (padding: env(safe-area-inset-left))
```
- Soporte para dispositivos con notch
- Ajuste automático de padding
- Compatibilidad con iPhone X y superiores

### 7. **Mejoras de Accesibilidad**
```javascript
class FocusManager
```
- Indicadores visuales para navegación por teclado
- Trap focus en menú móvil
- Touch targets mínimos de 44px
- Soporte para `prefers-reduced-motion`

## 📱 Adaptaciones por Componente

### Header/Navegación
- **Desktop**: Navegación horizontal inline
- **Tablet/Móvil**: Menú hamburguesa full-screen
- **Transición**: Smooth slide-in desde la izquierda
- **Altura dinámica**: 70px fijo

### Hero Section
- **Desktop**: Grid 2 columnas (texto | imagen)
- **Tablet**: Reducción de gaps
- **Móvil**: Stack vertical centrado
- **Landscape móvil**: Mantiene 2 columnas compactas

### Imagen de Perfil
| Breakpoint | Tamaño |
|------------|--------|
| Desktop (1024px+) | 300px × 300px |
| Tablet (768px-1024px) | 280px × 280px |
| Móvil grande (640px-768px) | 250px × 250px |
| Móvil mediano (480px-640px) | 220px × 220px |
| Móvil pequeño (<480px) | 200px × 200px |

### Skills Carousel
- **Desktop**: 4-5 cards visibles
- **Tablet**: 3-4 cards visibles
- **Móvil**: 2-3 cards visibles con ajuste automático
- **Touch**: Swipe gestures habilitados
- **Keyboard**: Flechas izquierda/derecha

### Portfolio Cards
- **Desktop**: Carousel centrado 600px
- **Tablet**: 90% del ancho
- **Móvil**: 100% con padding lateral
- **Transición**: Scale y opacity animados

### Timeline (Experiencia)
- **Desktop**: Línea vertical izquierda, contenido derecha
- **Tablet/Móvil**: Línea compacta, contenido apilado
- **Iconos**: Reducción progresiva 60px → 40px

### Footer
- **Desktop**: Grid 3 columnas
- **Tablet**: Grid 2 columnas
- **Móvil**: Stack vertical centrado

## 🎯 Touch Device Optimizations

### Eliminación de Efectos Hover
```css
@media (hover: none) and (pointer: coarse)
```
- Deshabilitado profile card glow/shine
- Reemplazo con efectos `:active`
- Touch targets aumentados a 44px mínimo

### Tap Highlight
```css
-webkit-tap-highlight-color: rgba(0, 255, 65, 0.2);
```

### Prevención de Zoom en Inputs
```css
input { font-size: 16px !important; }
```

## 🚀 Funcionalidades Adicionales

### 1. **Viewport Height Dinámico**
```javascript
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
```
- Soluciona problema de 100vh en móviles
- Actualización en resize y orientación

### 2. **Performance Monitor**
```javascript
class PerformanceMonitor
```
- Medición de tiempo de carga
- Log en desarrollo (localhost)
- Métricas de DOM ready

### 3. **Lazy Loading de Imágenes**
```javascript
class LazyImageLoader
```
- IntersectionObserver API
- Preload con rootMargin: 50px
- Fallback para navegadores antiguos

### 4. **Reducción de Datos**
```css
@media (prefers-reduced-data: reduce)
```
- Deshabilitación de Matrix canvas
- Eliminación de animaciones costosas

## 🎨 Variables CSS Responsive

### Espaciado Adaptativo
```css
/* Desktop */
--spacing-xl: 6rem;
--spacing-lg: 4rem;

/* Tablet */
--spacing-xl: 4rem;
--spacing-lg: 3rem;

/* Móvil */
--spacing-xl: 3rem;
--spacing-lg: 2rem;
```

### Tipografía Fluida
```css
/* Base font-size */
Desktop: 16px
Tablet: 15px → 14px
Móvil: 14px → 13px → 12px
```

## ✅ Testing Recomendado

### Dispositivos de Prueba
- ✓ iPhone SE (375px)
- ✓ iPhone 12/13/14 (390px)
- ✓ iPhone 12/13/14 Pro Max (428px)
- ✓ iPad Mini (768px)
- ✓ iPad Pro (1024px)
- ✓ Samsung Galaxy S21 (360px)
- ✓ Samsung Galaxy Tab (800px)

### Orientaciones
- ✓ Portrait (vertical)
- ✓ Landscape (horizontal)
- ✓ Cambio dinámico de orientación

### Navegadores
- ✓ Chrome Mobile
- ✓ Safari Mobile
- ✓ Firefox Mobile
- ✓ Samsung Internet

## 🔍 Herramientas de Desarrollo

### Chrome DevTools
1. Abrir DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Probar diferentes dispositivos
4. Modificar orientación
5. Simular conexión lenta

### Lighthouse Audit
```bash
npm install -g lighthouse
lighthouse http://localhost:port --view
```

## 📝 Notas de Mantenimiento

### Añadir Nuevos Breakpoints
```css
@media (max-width: XXXpx) {
    /* Tus estilos */
}
```

### Añadir Nuevos Touch Gestures
```javascript
const myCarousel = new MyCarousel();
new TouchGestureHandler(myCarousel);
```

### Modificar Tamaños Fijos
Los tamaños fijos se encuentran en:
- `styles.css` - Líneas específicas por componente
- Buscar comentarios `/* Mantener tamaños fijos */`

## 🎉 Resultado Final

El portfolio ahora es:
- ✅ Completamente responsive
- ✅ Optimizado para touch
- ✅ Accesible por teclado
- ✅ Performante en móviles
- ✅ Compatible con notch/safe areas
- ✅ Adaptado a orientación landscape
- ✅ Con tamaños fijos preservados en desktop

## 🐛 Resolución de Problemas

### El menú móvil no cierra
- Verificar que `menuToggle` y `nav` existan
- Comprobar eventos click en `script.js`

### Carruseles no responden a swipe
- Verificar inicialización de `TouchGestureHandler`
- Comprobar que `.carousel-track` existe

### Elementos desalineados en móvil
- Revisar `overflow-x: hidden` en body
- Verificar `max-width: 100%` en containers

### Viewport height incorrecta en iOS
- Verificar que `ResponsiveHandler` esté inicializado
- Comprobar custom property `--vh`

---

**Última actualización**: Febrero 2026  
**Versión**: 2.0 Responsive
