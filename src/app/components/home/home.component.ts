import { Component, OnInit } from '@angular/core';

// para el mapa
const L = require('../../../assets/js/leaflet.js');

// Servicios
import { HomeService } from '../../services/home.service';

// Url de la pagina
import { global } from '../../services/global';



// jquery en angular
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listaOferta: any;
  public listaCarreras: any;
  public url: string;
  public nuevaLista: any = [];
  public nuevaListaCarreras: any = [];

  constructor(private homeServices: HomeService) {
    this.url = global.url;
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      // left: 100,
      // behavior: 'smooth'
    });
    this.mapaBienesRaices();
    this.indexPromo();
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
          console.log(this.listaCarreras);

          this.listaCarreras.forEach(element => {
            // console.log(element);
            if (element.estado === 1) {
              this.nuevaListaCarreras.push(element);
            }
          });
          this.nuevaListaCarreras = this.nuevaListaCarreras.reverse();
          console.log(this.nuevaListaCarreras);

        }
      },
      errors => {
        console.log(errors);
      }
    );

  }

  /**
   * indexInvitados Lista todos los registros de invitados
   */
  public indexPromo() {

    this.homeServices.indexPromocion().subscribe(
      response => {
        // console.log(response);
        if (response.status === 'success') {
          this.listaOferta = response.oferta;

          this.listaOferta.forEach(element => {
            // console.log(element);
            if (element.estado === 1) {
              this.nuevaLista.push(element);
            }

          });
          this.nuevaLista = this.nuevaLista.reverse();
        }
      },
      errors => {
        console.log(errors);
      }
    );

  }

  /**
   * mapaEvento
   */
  public mapaBienesRaices() {
    // utilizamos jquery para validar
    // saber sin in id o class existe en el DOM
    if ($('#mapa').length) {

      const map = L.map('mapa').setView([-17.399904, -66.153306], 18);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([-17.399904, -66.153306]).addTo(map)
        // tslint:disable-next-line: max-line-length
        .bindPopup('<center> <img src="../../../assets/img/imgenLogo.png" alt="" style="width: 100px;"><br>Jac Bolivia 2000<br> Avenida San Martin esquina Brasil Ciudad Cochabamba, Bolivia.</center>')
        .openPopup();
      // .binTooltip('Conferencias')
      // .openTooltip();
    }
  }
}
