# FpAlphaAssessment
Panel para gestionar clientes y notas con conexión a API, desarrollado como parte del assessment técnico para FP Alpha.

## Stack

- Angular 20
- TypeScript
- Angular Material
- RxJS
- SCSS

## Instrucciones para correr

```bash
npm install && ng serve
```

Una vez que el browser este corriendo, abrir en: `http://localhost:4200/`.

## Unit tests

Para correr las pruebas unitarias con [Karma](https://karma-runner.github.io) usar el siguiente comando:

```bash
ng test
```

## Funcionalidades
- Listado de clientes con búsqueda por nombre y paginación
- Vista de notas de cliente
- Agregar y eliminar notas con dialog de confirmación
- Crear nuevos clientes con validación de formulario
- Dark mode con botón flotante
- Filtrado ascendente y descendiente por nombre

## Decisiones técnicas
- Se utilizó 'BehaviorSubject' en el servicio para mantener el estado local de los clientes. Esto nos ayuda a poder seguir viendo los clientes creados al navegar entre vistas, ya que JSONPlaceholder no persiste datos.
- Las notas de cada cliente se almacenaron en un Map, para mantener las notas agregadas localmente por clientId.
- Todos los componentes son standalone y se cargan con lazy loading.

## Uso de IA
Se utilizó Claude como apoyo en las siguientes áreas:
- Estructura del proyecto: Definición de la arquitectura feature-based y organización de carpetas.
- Diseño SCSS: Sugerencias de estilos y diseños, adaptación al dark mode.
- Debug de errores: Apoyo para la detección y resolución de conflictos como el estado perdido de clentes al regresar.
- Testing: Estructura base de los unit tests para 'ClientService'