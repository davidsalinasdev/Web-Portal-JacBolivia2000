import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

// Servicios
import { AcercaService } from './../../services/acerca.service';
import { global } from './../../services/global';

// jquery en angular
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public listaAcerca: any;
  public url: string;
  public urlImagen: string;
  public imagenUno: string;
  public imagenDos: string;
  public imagenTres: string;
  public tituloUno: string;
  public tituloDos: string;
  public tituloTres: string;


  constructor(private acercaServices: AcercaService) {
    this.url = global.url;
    this.urlImagen = global.urlImg;
  }

  ngOnInit(): void {
    this.indexWeb();
    this.carrusel();
  }

  /**
   * carrusel
   */
  public carrusel() {
    $('.carousel').carousel({
      interval: 6000
    });
  }

  public indexWeb() {
    this.acercaServices.indexAcerca().subscribe(
      response => {
        if (response.status === "success") {
          this.listaAcerca = response.acerca[0];
          this.imagenUno = this.listaAcerca.imagen_uno;
          this.imagenDos = this.listaAcerca.imagen_dos;
          this.imagenTres = this.listaAcerca.imagen_tres;
          this.tituloUno = this.listaAcerca.titulo_uno;
          this.tituloDos = this.listaAcerca.titulo_dos;
          this.tituloTres = this.listaAcerca.titulo_tres;
          // console.log(this.listaAcerca);
        }
      },
      error => {
        console.log(error.error);

      }
    );
  }

}
