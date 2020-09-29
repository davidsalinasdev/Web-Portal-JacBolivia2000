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
export class AcercaService {

  public url: string; // guarda la url de la API
  public identity: object;
  public token: object;
  public status: string;

  // Metodo constructor
  constructor(private http: HttpClient) {
    this.url = global.url;
  }

  // Lista  de todos los usuarios de la base de datos.
  public indexAcerca(): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // la cabecera de conexion

    // retornamos respuestas de El APIRESTFUL
    return this.http.get(this.url + 'acerca', { headers: headers });
  }

  /**
   * updateUsuario
   */
  public updateAcerca(acerca: any, token: any): Observable<any> {
    console.log(acerca);

    const json = JSON.stringify(acerca); // convertimos el objeto a json.
    const params = 'json=' + json; // La varible con la que recibe el parametro. en el API.


    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization:Bearer', token); // la cabecera de conexion
    // console.log(params);

    // retornamos respuestas de El APIRESTFUL
    return this.http.put(this.url + 'acerca/' + acerca.id, params, { headers: headers });
  }


  /**
   * recuperarPhoto
   */
  public recuperarGuardaPhoto(file: File, token: any): Observable<any> {

    const fd = new FormData();
    fd.append('file0', file);

    const headers = new HttpHeaders().set('Authorization', token); // la cabecera de conexion
    // console.log(params);

    // retornamos respuestas de El APIRESTFUL
    return this.http.post(this.url + 'acerca/upload', fd, { headers: headers });
  }

  /**
   * destroyImagen elimina imagen de la base de datos
   */
  public destroyImagenAnterior(nameImag: any, token: any): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') // la cabecera de conexion
      .set('Authorization', token); // la cabecera de conexion
    // retornamos respuestas de El APIRESTFUL
    return this.http.get(this.url + 'acerca/destroyImagen/' + nameImag, { headers: headers });

  }


}
