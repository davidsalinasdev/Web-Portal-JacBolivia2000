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

  // Lista  de todos los usuarios de la base de datos.
  public indexNoticias(): Observable<any> {

    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // la cabecera de conexion

    const headers = new HttpHeaders({
      // 'token-usuario': token,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // retornamos respuestas de El APIRESTFUL
    return this.http.get(this.url + 'noticias', { headers: headers });
  }


  // Lista  de todos los usuarios de la base de datos.
  public indexReflexion(): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // la cabecera de conexion

    // retornamos respuestas de El APIRESTFUL
    return this.http.get(this.url + 'reflexion', { headers: headers });
  }

  // Lista  de todos las perlitas de la base de datos.
  public indexPerlitas(): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // la cabecera de conexion

    // retornamos respuestas de El APIRESTFUL
    return this.http.get(this.url + 'perlitas', { headers: headers });
  }

  // Lista  de todos las perlitas de la base de datos.
  public indexVideos(): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // la cabecera de conexion

    // retornamos respuestas de El APIRESTFUL
    return this.http.get(this.url + 'videos', { headers: headers });
  }

  /**
   *  // SHOW metodo para mostrar una solo Invitado en concreto
   */
  public showVideos(idVideo): Observable<any> {

    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // la cabecera de conexion
    // retornamos respuestas de El APIRESTFUL
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'token-usuario': token // Si es un archivo mandar solo el token
    });

    return this.http.get(this.url + 'videos/' + idVideo, { headers: headers });

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

  // listar imagenes por carrera
  // Lista de las imagenes  de todos los usuarios de la base de datos.
  public listaImagenesCarrera(idImagen): Observable<any> {

    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // la cabecera de conexion
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    // retornamos respuestas de El APIRESTFUL
    // return this.http.get(this.url + 'carrera/listar/imagenes', { headers: headers });
    return this.http.get(this.url + 'carrera/imagenes/porCarrera/' + idImagen, { headers: headers });
  }

  public showNoticias(idNoticia): Observable<any> {

    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // la cabecera de conexion
    // retornamos respuestas de El APIRESTFUL
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'token-usuario': token // Si es un archivo mandar solo el token
    });

    return this.http.get(this.url + 'noticias/' + idNoticia, { headers: headers });

  }

  // listar imagenes por carrera
  // Lista de las imagenes  de todos los usuarios de la base de datos.
  public listaImagenesNoticias(idNoticia): Observable<any> {

    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // la cabecera de conexion
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    // retornamos respuestas de El APIRESTFUL
    // return this.http.get(this.url + 'carrera/listar/imagenes', { headers: headers });
    return this.http.get(this.url + 'noticias/imagenes/porCarrera/' + idNoticia, { headers: headers });
  }



  /**
   *  // SHOW metodo  Buscar por fecha en la base de datos
   */
  public showCarreraBuscar(fecha): Observable<any> {
    // console.log(fecha);


    const json = JSON.stringify(fecha); // convertimos el objeto a json.
    const params = 'json=' + json; // La varible con la que recibe el parametro. en el API
    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); // la cabecera de conexion
    // retornamos respuestas de El APIRESTFUL
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'token-usuario': token // Si es un archivo mandar solo el token
    });

    return this.http.post(this.url + 'noticias/buscar', params, { headers: headers });

  }

  /**
   * Envia datos datos de formulario a correo
   */
  public enviarCorreo(correo: any): Observable<any> {
    // console.log(carrera);
    const json = JSON.stringify(correo); // convertimos el objeto a json.
    const params = 'json=' + json; // La varible con la que recibe el parametro. en el API.
    // console.log(params);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // retornamos respuestas de El APIRESTFUL
    return this.http.post(this.url + 'message/correo', params, { headers: headers });
  }




}
