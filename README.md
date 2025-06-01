REQUERIMIENTOS PARA PRUEBA TECNICA DEFONTANA

Requerimientos basicos
1 .- Angular 14 o superior.
2 .-Utilizar operadores de observables que demuestren optimización de las búsquedas realizadas.
3 .-Implementar un componente para resolver cada requerimiento de la prueba y demostrar concepto(s) de comunicación entre componentes.
4 .-Gestionar las subscripciones utilizadas para evitar errores de rendimiento.


Requerimientos

1 .- Se debe listar la información de todos los personajes, y mostrar los atributos name, status,species, type, gender y created  en una tabla. 

    a .- En esta tabla se deben agregar dos campos de búsquedas, en los que se pueda escribir el valor deseado y se integre con el api de listar y los filtros disponibles (dos filtros a escoger por el programador,al menos uno de los filtros implementados debe ser un campo de texto para escribir el valor deseado).
2 .- A partir de la vista principal de la tabla, al seleccionar un elemento, visualizar a la derecha los detalles asociados al mismo de la siguiente manera:
Mostrar la imagen del personaje.
    a .- Se debe obtener y mostrar la información de origen del personaje, y al menos un residente de esta localización, si es que posee, en caso contrario mostrar que no tiene.
    b .- Se debe obtener y mostrar la información de la localización del personaje, y al menos un residente de esta localización, si es que posee, en caso contrario mostrar que no tiene.
    c .- Se debe obtener la información de un solo episodio, si es que posee, si no, indicar que no tiene, puede ser cualquier episodio obtenido en el listado de episodios.
3 .- Un personaje se puede marcar como favorito a partir de la vista principal, se debe mostrar su nombre en la parte superior de la página, y al darle click, se debe mostrar la información básica del mismo.
4 .- En la parte inferior de la página se debe mostrar, a modo de totales, la cantidad de personajes contados por el atributo species y otra vista de totales contados por type.


Bonus

1 .- Angular Material.
2 .- Implementación de directivas, pipes o widgets personalizados.
3 .- Utilización de alguna implementación del patrón Redux para la solución de alguno de los requerimientos.
4 .- Implementación de carga de datos de forma progresiva.


Extra Bonus

1 .- Implementar integración con las dos APIs disponibles, REST y Graphql, y demostrar conceptos de manejo de inyección de dependencia para reutilizar componentes implementados.
2 .- Carga simultánea de los detalles del personaje (origen, location, episode) en REST o Graphql.














# TestDefontanaRym

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
