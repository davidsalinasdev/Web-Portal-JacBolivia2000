
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { PuenteService } from '../../../services/puente.service';


@Component({
  selector: 'app-gracias',
  templateUrl: './gracias.component.html',
  styleUrls: ['./gracias.component.css']
})
export class GraciasComponent implements OnInit {

  public nombres: string;
  public paterno: string;
  public datosInscribete: any;


  constructor(
    private puenteServices: PuenteService,
    private router: Router
  ) {
    window.scroll({
      top: 0,
      // left: 100,
      behavior: 'auto'
    });
  }

  ngOnInit(): void {


    // Recibiendo datos del componente hermano 1
    if (this.puenteServices.datosNuevos) {
      this.datosInscribete = this.puenteServices.datosNuevos;

      // Guardando datos en le localStorage
      localStorage.setItem("nombres", this.datosInscribete.nombres);
      localStorage.setItem("paterno", this.datosInscribete.paterno);
    }


    this.nombres = localStorage.getItem("nombres");
    this.paterno = localStorage.getItem("paterno");

  }
  /**
   * inicio
   */
  public inicio() {
    localStorage.removeItem("nombres");
    localStorage.removeItem("paterno");
    // Cambia a otra pagina
    this.router.navigate(['/home']);

  }
}
