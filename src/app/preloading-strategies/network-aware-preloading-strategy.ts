import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, EMPTY } from "rxjs";


export declare var navigator: any;

@Injectable(
    { 
        providedIn: 'root' 
    }
)
export class NetworkAwarePreloadStrategy implements PreloadingStrategy{
    /**
     * 
     * @param route La ruta recibida que debería cargar módulu
     * @param load el callback que carga el módulo. Función que devuelve un observable de tipo any
     * @returns Ejecuta el callback de carga del módulo o devuelve un observable vacío
     */
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        // Comprueba que el usuario tiene buena conexión
        // * 1. En caso de que la función un true, carga el módulo
        // * 2. En caso de que la función devuelva un false, no carga el módulo
        return this.hasGoodConnection() ? load() : EMPTY;
    }

    /**
     * Función que decide si el módulo se carga o no
     * Comprobando si el usuario tiene una conexión aceptable a internet 
     * @returns {boolean} si puede o no cargar el módulo
     */
    hasGoodConnection(): boolean{
        //Obtenemos la conexión del usuario
        const conn = navigator.connection;

        //En caso de que tengamos conexión
        if (conn){
            //Comprobamos si el usuario tiene habilitados la reserva de datos
            //En ese caso, no cargamos el módulo
            if(conn.saveData){
                return false; //save data mode is enable, so dont preload
            }

            //Lista de conexiones no validas para precargar un módulo
            const avoidTheseConnections = ['slow-2g', '2g' /*, '3g', '4g' */ ];

            //Obtenemos el tipo de conexión que tiene el usuario
            const effectiveType = conn.effectiveType || '';

            //Comprobamos si la conexión del usuario esta en la lista de conexiones a evitar
            //En caso de que sea así no precarga el módulo
            if (avoidTheseConnections.includes(effectiveType)){
                return false
            }
        }

        //Si la conexión es estable y buena, se precarga el módulo
        return true
    }
}