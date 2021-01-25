import { Component, OnInit } from '@angular/core';

// Url globales
import { global } from '../../services/global';

// Servicios
import { AcercaService } from '../../services/acerca.service';
// jquery en angular
declare var $: any;

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {

  // Url de la aplicacion
  public url: string;
  public urlImagen: string;

  // Lista todos los usuarios
  public listaAcerca: any;

  // Datos empresa
  public imagenEmpresa: string;
  public mision: string;
  public vision: string;
  public historia: string;
  public imagenWeb: string;
  public objetivo: string;


  constructor(private acercaServices: AcercaService) {
    this.url = global.url;
    this.urlImagen = global.urlImg;
  }

  ngOnInit(): void {
    // window.onload = () => {
    //   // alert('Cargado la pagina');
    //   $('#onload').fadeOut();
    //   $('body').removeClass('hidden');
    //   $('#navegacion').removeClass('d-none');
    //   // alert('La pagina se cargo correctamente ');
    // };
    // window.scroll({
    //   top: 0,
    //   // left: 100,
    //   // behavior: 'smooth'
    // });
    window.scroll({
      top: 0,
      // left: 100,
      behavior: 'auto'
    });
    this.indexWeb();

  }

  /**
   * // INDEX sirve para sacar todos los registros del usuario  de la base de datos
   */
  public indexWeb() {
    this.acercaServices.indexAcerca().subscribe(
      response => {
        if (response.status === "success") {

          this.listaAcerca = response.acerca[0];
          this.imagenWeb = this.listaAcerca.imagen;
          this.objetivo = this.listaAcerca.img_objetivo;
          this.historia = this.listaAcerca.imagen_contenido;
          this.mision = this.listaAcerca.img_mision;
          this.vision = this.listaAcerca.img_vision;


          // this.imagenWeb = this.listaAcerca.imagen_contenido;
          // console.log(this.imagenWeb);


          // console.log(this.listaAcerca);
        }

      },
      error => {
        console.log(error.error);

      }
    );
  }


}
