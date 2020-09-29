import { Injectable } from '@angular/core';

// Para utilizar los metodos de Http get post put delete etc
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Observable
import { Observable } from 'rxjs'; // permite recoger los datos q nos devuelve el api




// Url globales
import { global } from '../services/global';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  public url: string; // guarda la url de la API
  public identity: object;
  public token: object;
  public status: string;

  // Metodo constructor
  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  // Lista  de todos los usuarios de la base de datos.
  public indexPromocion(): Observable<any> {

    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // la cabecera de conexion

    const headers = new HttpHeaders({
      // 'token-usuario': token,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // retornamos respuestas de El APIRESTFUL
    return this.http.get(this.url + 'promocion', { headers: headers });
  }

  // Lista  de todos los usuarios de la base de datos.
  public indexCarrera(): Observable<any> {

    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // la cabecera de conexion

    const headers = new HttpHeaders({
      // 'token-usuario': token,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // retornamos respuestas de El APIRESTFUL
    return this.http.get(this.url + 'carrera', { headers: headers });
  }

  /**
   *  // SHOW metodo para mostrar una solo Invitado en concreto
   */
  public showCarrera(idCarrera): Observable<any> {

    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // la cabecera de conexion
    // retornamos respuestas de El APIRESTFUL
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'token-usuario': token // Si es un archivo mandar solo el token
    });

    return this.http.get(this.url + 'carrera/' + idCarrera, { headers: headers });

  }

}
