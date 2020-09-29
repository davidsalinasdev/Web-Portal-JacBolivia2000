import { Component, OnInit } from '@angular/core';

// Url globales
import { global } from '../../services/global';

// Servicios
import { AcercaService } from '../../services/acerca.service';


@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {

  // Url de la aplicacion
  public url: string;

  // Lista todos los usuarios
  public listaAcerca: any;

  // Datos empresa
  public imagenEmpresa: string;
  public mision: string;
  public vision: string;
  public historia: string;

  constructor(private acercaServices: AcercaService) {
    this.url = global.url;
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      // left: 100,
      // behavior: 'smooth'
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

          this.listaAcerca = response.acerca;
          // console.log(this.listaAcerca);
          this.imagenEmpresa = this.listaAcerca[0].imagen;
          this.mision = this.listaAcerca[0].mision;
          this.vision = this.listaAcerca[0].vision;
          this.historia = this.listaAcerca[0].historia;
        }

      },
      error => {
        console.log(error.error);

      }
    );
  }


}
