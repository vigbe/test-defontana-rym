A continuación detallo el codigo y el cumplimiento de los requerimientos solicitados

REQUERIMIENTOS BÁSICOS


Angular 14 o superior
"Utilicé Angular 17 en el proyecto, como se ve en mi package.json con "@angular/core": "^17.0.0". 

Operadores RxJS para optimizar búsquedas
"En el componente characters-list, implementé un sistema de búsqueda reactiva usando debounceTime(400) y distinctUntilChanged(). Esto evita peticiones excesivas a la API al esperar 400ms después de que el usuario deja de escribir y solo actúa si el valor cambió."

typescript
// Ejemplo de mi código
this.searchControl.valueChanges.pipe(
  debounceTime(400),
  distinctUntilChanged()
).subscribe((name) => {
  this.loadCharacters();
});
Componentes separados y comunicación
"Dividí la app en componentes como characters-list, characters-details y favorites. Para comunicarlos, usé @Output() en la lista para emitir el personaje seleccionado y @Input() en los detalles para recibirlo."

typescript
// En characters-list.component.ts
@Output() characterSelected = new EventEmitter<any>();

selectCharacter(character: any) {
  this.characterSelected.emit(character);
}
Gestión de subscripciones
"En NgRx, usé take(1) al despachar acciones para evitar fugas de memoria. También usé async pipe en el HTML para gestionar automáticamente las suscripciones."

typescript
// Uso de take(1) en NgRx
this.favorites$.pipe(take(1)).subscribe(...);
REQUERIMIENTOS FUNCIONALES

Listado de personajes en tabla
"La tabla muestra todas las propiedades requeridas usando mat-table. Los filtros de nombre (texto) y especie (select) están conectados a la API."

xml
<!-- Fragmento de mi template -->
<input [formControl]="searchControl" placeholder="Buscar por nombre">
<select [(ngModel)]="filters.species">
  <option *ngFor="let s of speciesList" [value]="s">{{ s }}</option>
</select>
Detalles al seleccionar
"Al hacer clic en un personaje, el componente characters-details muestra su imagen, origen, ubicación y un episodio. Si no hay datos, muestra 'Desconocido'."

xml
<!-- Detalles del personaje -->
<img [src]="gqlCharacter.image" [alt]="gqlCharacter.name">
<p>{{ gqlCharacter.origin?.name || 'Desconocido' }}</p>
Favoritos
"Los usuarios pueden marcar favoritos desde la tabla. Estos se almacenan en el store de NgRx y se muestran en la sección superior con su nombre."

typescript
// Método para marcar favoritos
markAsFavorite(character: any) {
  this.store.dispatch(addFavorite({ character }));
}
Totales por especie y tipo
"En el componente totals, calculo y muestro los recuentos usando los datos de la lista. Los totales se actualizan dinámicamente al aplicar filtros."

typescript
// Cálculo de totales
calculateTotals() {
  this.typeTotals = this.groupBy(this.characters, 'type');
}
BONUS

Angular Material
"Usé mat-table para la lista, mat-card para los detalles y mat-paginator para la paginación, dando un look profesional."

Pipe personalizado
"Creé el pipe capitalize para asegurar que textos como 'alive' se muestren como 'Alive'."

typescript
@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value[0].toUpperCase() + value.slice(1) : '';
  }
}
NgRx para estado global
"Implementé un store de NgRx para gestionar favoritos, con acciones claras y un reducer que actualiza el estado."

typescript
// Reducer de favoritos
on(addFavorite, (state, { character }) => [...state, character]),
Paginación
"La paginación se maneja con mat-paginator, cargando nuevos datos al cambiar de página."

xml
<mat-paginator [pageSize]="20" (page)="onPageChange($event)"></mat-paginator>
EXTRA BONUS

Integración REST/GraphQL
"Desarrollé servicios separados para REST y GraphQL. Los componentes pueden alternar entre ellos usando inyección de dependencias."

typescript
// Ejemplo de servicio GraphQL
getCharacter(id: string) {
  return this.apollo.query({ query: GET_CHARACTER, variables: { id } });
}
Carga simultánea de detalles
"Usé forkJoin en GraphQL para cargar origen, ubicación y episodio en paralelo, mejorando el rendimiento."

typescript
forkJoin([getOrigin(), getLocation(), getEpisode()]).subscribe(...);
Conclusión
"El proyecto cumple todos los requisitos técnicos y funcionales, usando Angular 17, NgRx, y buenas prácticas de desarrollo. Los componentes son reutilizables, el código está optimizado, y la UI es responsive gracias a Angular Material."

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







