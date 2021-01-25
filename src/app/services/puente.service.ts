
// Este es un sevicio de puente para comunicación entre componentes
import { Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PuenteService {
  // Salida de datos a traves del ServicioPuente
  // @Output() disparadorPuente: EventEmitter<any> = new EventEmitter();
  public datosNuevos: any;
  constructor() {

  }
}
