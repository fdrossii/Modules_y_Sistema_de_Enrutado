import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


//Creamos una clase de opciones de precarga 
// va a servir para definir las opciones que debe tener una ruta
//para precargar o no un módulo

export class PreloadingOptions{
  constructor(public routPath: string, public preload: boolean = true){

  }
}

/**
 * SERVICIO PERSONALIZADO QUE SE VA A ENCARGAR DE PRECARGAR O NO UN MÓDULO
 * DE LAS DIFERENTES RUTAS QUE HAYA EN EL MÓDULO DE ENRUTADO Y ESTEN ESPECIFICADAS
 * COMO CARGA PEREZOSA.
 * 
 * LA IDEA ES QUE A TRAVÉS DE UN EVENTE DEL USUARIO DEL DOM  (CLICK, HOVER, LONG PRESS...)
 * SE INICIE UNA PRECARGAR O NO DE MÓDULOS. POR LO QUE CONSEGUIRIAMOS ADELANTARNOS AL USUARIO
 * PRECARGANDO QUE PREDECIMOS QUE VA A NECESITAR.
 *  
 * CON ESTO SE CONSIGUE CONSEGUIR UNA MEJOR EXPERIENCIA DE USUARIO, AL EVITAR QUE LA APLICACIÓN
 * SE QUEDE CARGANDO CUANDO TENGA QUE DE MANERA PEREZOSA CARGAR UNA RUTA UN MÓDULO DE RUTAS 
 * 
 * POR EJEMPLO: SI UN USUARIO PASA EL CURSOR POR UN ELEMENTO DEL MENU AL QUE VA A NAVEGAR
 * PRECARGAMOS EL MÓDULO EN SEGUNDO PLANO PARA QUE LA NAVEGACIÓN SEA MAS FLUIDA
 * Y REDUCIR TIEMPOS DE CARGA
 */


@Injectable({
  providedIn: 'root'
})
export class PreloadingService {

  // Un Subject es un tipo de Observable que permite emitir valores 
  // a quien esé suscrito al mismo a través del método .next(nuevoValor)
  private _subject = new Subject<PreloadingOptions>;

  //Cualquier Subject puede ser tratado como un Observable y es el que tenemos
  //que hacer público.
  //Con él vamos a ofrecer las opciones de la ruta que desea ser precargada como un Observable
  public options$ = this._subject.asObservable();
  
  
  
  constructor() { }

  /**
   * Método encargado de iniciar una evaluación de precarga
   * @param routePath Ruta que se desea precargar
   */
  comenzarPrecarga(routePath: string){
    //Creamos unas opciones de precarga
    const opcionesPrecarga: PreloadingOptions = new PreloadingOptions(routePath, true);

    // Emitimos las opciones que desean ser precargadas
    // Esta información la va a escuchar la ESTRATEGIA DE PRECARGA ONDEMANDPRELOADING-STRATEGY
    // Para así evaluar si debe o no debe precargar la ruta
    this._subject.next(opcionesPrecarga);
  }

}
