import { PreloadingStrategy, Route } from "@angular/router";
import { EMPTY, Observable } from 'rxjs';

export class OptInPreloadingStrategy implements PreloadingStrategy{
    /**
     * 
     * @param route La ruta recibida que debería cargar módulu
     * @param load el callback que carga el módulo. Función que devuelve un observable de tipo any
     * @returns Ejecuta el callback de carga del módulo o devuelve un observable vacío
     */
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        //Evaluación que determina:
        // 1. Si dentro de la ruta hay un valor llamado "data".
        // 2. Si dentro del valor "data" hay una clave llamada "preload" a "true".
        // Entonces, ejecuta el callback y carga el módulo.
        // Si no lo tiene, devuelve null.
        return route.data && route.data['preload'] ? load() : EMPTY; //EMPTY es observable de tipo null
    }
}