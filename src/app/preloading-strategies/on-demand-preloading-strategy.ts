import { Injectable } from "@angular/core";
    import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of, EMPTY, mergeMap } from 'rxjs';
import { PreloadingOptions, PreloadingService } from "../services/preloading.service";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class OnDemandPreloadingStrategy implements PreloadingStrategy{
    
    private _preloadingDemandOptions$: Observable<PreloadingOptions>
    
    constructor(private _preloadingService: PreloadingService){
        //Inicializamos las opciones desde el Observable del servicio
        this._preloadingDemandOptions$ = this._preloadingService.options$;
    }

    private decidirSiprecargar(route: Route, preloadingOptions: PreloadingOptions): boolean{
        //Si:
        // * 1. Si la ruta tiene una propiedad llamda "data"
        // * 2. Si la ruta tiene dentro de "data" una clave llamada "preload" a "true"
        // * 3. Si las opciones incluyen una ruta que esta incluida en un array de rutas que queremos precargar
        // * 4. Si las opciones tiene preload a true
        // * Aquí podemos añadir mas condiciones totalmente personalizadas *
        return (
            route.data && 
            route.data['preload'] && 
            [route.path, '*'].includes(preloadingOptions.routPath) &&
            preloadingOptions.preload //true
        )
    }
    
    preload(route: Route, load: ()=> Observable<any>): Observable<any> {
        //Estamos escuchando a los valores de opciones de precarga emitidos por el next() del servicio
        return this._preloadingDemandOptions$.pipe(
            //Iteramos por cada valor recibido desde el servicion con el next()
            mergeMap((preloadingOptions: PreloadingOptions) => {
                //Comprobamos si se deben cargar o no bajo esas opciones
                const precargar: boolean = this.decidirSiprecargar(route, preloadingOptions);
                //Mostramos por consola si se precarga o no el módulo
                console.log(`${precargar ? '' : 'no'} se precarga el módulo de la ruta ${route.path}`)
                //Devolvemos la ejecución del callback load() o nada
                return precargar ? load() : EMPTY; 
            })
        );        
    }
}