import { Component, OnInit } from '@angular/core';

// Servicios
import { HomeService } from './../../services/home.service';
import { AcercaService } from './../../services/acerca.service';

// Url de la pagina
import { global } from '../../services/global';

// jquery en angular
declare var $: any;

@Component({
  selector: 'app-reflexiones',
  templateUrl: './reflexiones.component.html',
  styleUrls: ['./reflexiones.component.css']
})
export class ReflexionesComponent implements OnInit {
  public listaReflexion: any = [];
  public listaReflexionBiblica: any = [];
  public urlImagen: string;
  public url: string;
  public listaWeb: any;
  public listaPerlitas: any = [];
  constructor(private homeServices: HomeService, private acercaServices: AcercaService) {
    this.urlImagen = global.urlImg;
    this.url = global.url;
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      // left: 100,
      behavior: 'auto'
    });
    $('.carousel').carousel({
      interval: 100000
    });
    this.indexReflexiones();
    this.listaIndexReflexiones();
    this.indexPerlitas();
  }

  /**
   * indexReflexiones
   */
  public indexReflexiones() {
    this.homeServices.indexReflexion().subscribe(
      response => {

        // console.log(response.carrera);

        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < response.carrera.length; index++) {
          if (response.carrera[index].tipo === 'reflexion' && response.carrera[index].estado === 1) {
            this.listaReflexion.push(response.carrera[index]);
          }
          if (response.carrera[index].tipo === 'biblica' && response.carrera[index].estado === 1) {
            this.listaReflexionBiblica.push(response.carrera[index]);
          }
        }

        this.listaReflexion.reverse();
        this.listaReflexionBiblica.reverse();
        // console.log(this.listaReflexion);
        // console.log(this.listaReflexionBiblica);

      }
    );

  }

  public listaIndexReflexiones() {
    this.acercaServices.indexWeb().subscribe(
      response => {
        // console.log(response.web);

        this.listaWeb = response.web[0];
        // console.log(this.listaWeb);

      }
    );

  }

  /**
   * indexPerlitas
   */
  public indexPerlitas() {
    this.homeServices.indexPerlitas().subscribe(
      resp => {
        this.listaPerlitas = resp.perlitas;
      },
      err => {
      }
    );
  }

  /**
   * descargar
   */
  public descargar(perlitas) {
    window.location.href = this.urlImagen + perlitas;
  }

  /**
   * reflexion
   */
  public reflexion() {
    const reflexion = document.querySelector('.reflexion');
    const biblica = document.querySelector('.biblica');
    const perlita = document.querySelector('.perlitas');

    reflexion.classList.remove('d-none');
    biblica.classList.add('d-none');
    perlita.classList.add('d-none');

  }
  /**
   * biblica
   */
  public biblica() {
    const biblica = document.querySelector('.biblica');
    const reflexion = document.querySelector('.reflexion');
    const perlita = document.querySelector('.perlitas');
    biblica.classList.remove('d-none');
    reflexion.classList.add('d-none');
    perlita.classList.add('d-none');

  }

  /**
   * perlitas
   */
  public perlitas() {

    const perlita = document.querySelector('.perlitas');
    const reflexion = document.querySelector('.reflexion');
    const biblica = document.querySelector('.biblica');
    perlita.classList.remove('d-none');
    biblica.classList.add('d-none');
    reflexion.classList.add('d-none');
  }

}
