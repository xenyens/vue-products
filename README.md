# Gestor de Productos Vue.js 3

Una aplicación web desarrollada con Vue.js 3 que permite gestionar un inventario de productos y llevar el control de compras realizadas.

## 🚀 Características

- **Registro de productos**: Añade nuevos productos con nombre, categoría y precio
- **Listado de productos**: Visualiza todos los productos registrados en una cuadrícula responsive
- **Sistema de compras**: Marca productos como comprados y gestiona cantidades
- **Cálculo automático**: Calcula el precio total de los productos comprados
- **Persistencia de datos**: Los datos se guardan automáticamente en localStorage
- **Formato de moneda**: Muestra precios formateados en USD
- **Interfaz responsive**: Diseño adaptable para móviles, tablets y escritorio

## 🛠️ Tecnologías Utilizadas

- **Vue.js 3** con Composition API
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos
- **localStorage** para persistencia de datos
- **Vite** (implícito en el setup)

## 📋 Funcionalidades Detalladas

### Gestión de Productos
- Formulario para registrar nuevos productos
- Campos: nombre, categoría y precio
- Conversión automática a mayúsculas para nombre y categoría
- Validación básica de campos

### Lista de Productos
- Visualización en cuadrícula responsive (1-3 columnas según pantalla)
- Botón "BUY" para añadir a la lista de compras
- Botón "DELETE" para eliminar del inventario
- Precios formateados como moneda

### Carrito de Compras
- Lista de productos comprados
- Control de cantidad editable para cada producto
- Botón para remover productos del carrito
- Cálculo automático del precio total

## 🏗️ Estructura del Código

### Interfaces
```typescript
interface Product {
  name: string;
  price: number;
  category: string;
  quantity: number;
}
```

### Estados Reactivos
- `products`: Lista de productos disponibles (persistente)
- `buyedProducts`: Lista de productos comprados (persistente)
- `newProduct`: Formulario para nuevo producto
- `totalPrice`: Precio total calculado automáticamente

### Funciones Principales
- `handleRegisterProduct()`: Registra un nuevo producto
- `handleBuyedProducts()`: Añade producto al carrito
- `removeItem()`: Elimina producto del inventario
- `removeBuyedItem()`: Elimina producto del carrito
- `formatCurrency()`: Formatea números como moneda
- `resetFields()`: Limpia el formulario

## 🎨 Diseño y UX

- **Tema oscuro**: Fondo gris oscuro (#343434)
- **Colores de acento**: Verde esmeralda para elementos positivos
- **Diseño responsive**: Grid adaptable según tamaño de pantalla
- **Feedback visual**: Efectos hover en botones
- **Tipografía**: Texto en mayúsculas para títulos principales

## 💾 Persistencia de Datos

La aplicación utiliza un composable personalizado `useLocalStorage` que:
- Guarda automáticamente los cambios en localStorage
- Mantiene la reactividad de Vue.js
- Persiste los datos entre sesiones del navegador

## 📱 Responsive Design

| Breakpoint | Columnas |
|------------|----------|
| Móvil      | 1        |
| Tablet     | 2        |
| Desktop    | 3        |

## 🔧 Instalación y Uso

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 📝 Notas Técnicas

- Utiliza `ref()` y `computed()` de Vue 3 Composition API
- Implementa watchers reactivos para transformación de datos
- Manejo de eventos con `@submit.prevent` y `@click`
- Directivas v-model con modificadores (.trim, .number)
- Renderizado condicional con v-for y keys únicas

## 🔮 Posibles Mejoras

- Implementar categorías predefinidas con selector
- Añadir búsqueda y filtros
- Implementar validación de formularios más robusta
- Añadir confirmación antes de eliminar
- Soporte para múltiples monedas
- Exportar/importar datos
- Añadir imágenes a los productos