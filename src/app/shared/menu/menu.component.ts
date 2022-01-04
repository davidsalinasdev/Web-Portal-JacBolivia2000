import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';



// jquery en angular
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public inicioDom: any;
  public admicionesDom: any;
  public acercaDom: any;
  public reservacionesDom: any;
  public contactoDom: any;
  public cajaDiv: any;
  public scrollHeith: any;
  public defensaDom: any;
  public agasajoDom: any;

  public listaCarreras: any;
  public nuevaListaCarreras: any = [];
  public nuevaListaWebPages: any = [];

  constructor(private homeServices: HomeService) { }

  ngOnInit(): void {
    this.inicio();
    // this.ajustarTamaño();
    this.indexCarreras();

  }

  /**
   * indexInvitados Lista todos los registros de invitados
   */
  public indexCarreras() {

    this.homeServices.indexCarrera().subscribe(
      response => {
        // console.log(response);
        if (response.status === 'success') {
          this.listaCarreras = response.carrera;
          // console.log(this.listaCarreras);

          this.listaCarreras.forEach(element => {
            // console.log(element);
            if ((element.estado === '1' || element.estado === 1) && element.tipo === 'carrera') {
              this.nuevaListaCarreras.push(element);
            }
            if ((element.estado === '1' || element.estado === 1) && element.tipo === 'webPages') {
              this.nuevaListaWebPages.push(element);
            }
          });
          this.nuevaListaCarreras = this.nuevaListaCarreras.reverse();

          const chunksize = 4;
        }
      },
      errors => {
        console.log(errors);
      }
    );

  }

  // logica del menu
  /**
   * inicio
   */
  public inicio() {
    this.elementosDom();
    this.inicioDom.classList.add('linea-activada');
    this.admicionesDom.classList.remove('linea-activada');
    this.acercaDom.classList.remove('linea-activada');
    this.contactoDom.classList.remove('linea-activada');
    this.reservacionesDom.classList.remove('linea-activada');
    this.reservacionesDom.classList.remove('linea-activada');
    this.defensaDom.classList.remove('linea-activa');
  }
  /**
   * Admiciones
   */
  public admiciones() {
    this.elementosDom();
    this.inicioDom.classList.remove('linea-activada');
    this.admicionesDom.classList.add('linea-activada');
    this.acercaDom.classList.remove('linea-activada');
    this.contactoDom.classList.remove('linea-activada');
    this.reservacionesDom.classList.remove('linea-activada');
    this.reservacionesDom.classList.remove('linea-activada');
    this.defensaDom.classList.remove('linea-activa');
  }
  /**
   * Acerca
   */
  public acerca() {
    this.elementosDom();
    this.inicioDom.classList.remove('linea-activada');
    this.admicionesDom.classList.remove('linea-activada');
    this.acercaDom.classList.add('linea-activada');
    this.contactoDom.classList.remove('linea-activada');
    this.reservacionesDom.classList.remove('linea-activada');
    this.reservacionesDom.classList.remove('linea-activada');
    this.defensaDom.classList.remove('linea-activa');
  }

  /**
   * Contacto
   */
  public contacto() {
    this.elementosDom();
    this.inicioDom.classList.remove('linea-activada');
    this.admicionesDom.classList.remove('linea-activada');
    this.acercaDom.classList.remove('linea-activada');
    this.contactoDom.classList.add('linea-activada');
    this.reservacionesDom.classList.remove('linea-activada');
    this.reservacionesDom.classList.remove('linea-activada');
    this.defensaDom.classList.remove('linea-activa');
  }
  /**
   * reservaciones
   */
  public reservaciones() {
    this.elementosDom();
    this.inicioDom.classList.remove('linea-activada');
    this.admicionesDom.classList.remove('linea-activada');
    this.acercaDom.classList.remove('linea-activada');
    this.contactoDom.classList.remove('linea-activada');
    this.reservacionesDom.classList.add('linea-activada');
    this.reservacionesDom.classList.remove('linea-activada');
    this.defensaDom.classList.remove('linea-activa');
  }

  /**
   * defensa
   */
  public defensa() {
    this.elementosDom();
    this.inicioDom.classList.remove('linea-activada');
    this.admicionesDom.classList.remove('linea-activada');
    this.acercaDom.classList.remove('linea-activada');
    this.contactoDom.classList.remove('linea-activada');
    this.reservacionesDom.classList.remove('linea-activada');
    this.defensaDom.classList.add('linea-activa');
  }

  /**
   * agasajo
   */
  public agasajo() {
    this.elementosDom();
    this.inicioDom.classList.remove('linea-activada');
    this.admicionesDom.classList.remove('linea-activada');
    this.acercaDom.classList.remove('linea-activada');
    this.contactoDom.classList.remove('linea-activada');
    this.reservacionesDom.classList.remove('linea-activada');
    this.defensaDom.classList.remove('linea-activa');
    this.agasajoDom.classList.add('linea-activa');
  }

  // dom
  /**
   * elementosDom
   */
  public elementosDom() {
    this.inicioDom = document.querySelector('.inicio') as HTMLElement;
    this.admicionesDom = document.querySelector('.admiciones') as HTMLElement;
    this.acercaDom = document.querySelector('.acerca') as HTMLElement;
    this.contactoDom = document.querySelector('.contacto') as HTMLElement;
    this.reservacionesDom = document.querySelector('.reservaciones') as HTMLElement;
    this.defensaDom = document.querySelector('.defensa') as HTMLElement;
    this.agasajoDom = document.querySelector('.agasajo') as HTMLElement;
  }


}

