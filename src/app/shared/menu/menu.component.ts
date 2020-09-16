import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    this.inicio();
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
  }

  /**
   * anclajePaginas
   */
  public anclajePaginas() {

  }
}

