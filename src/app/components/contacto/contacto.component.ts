import { Component, OnInit } from '@angular/core';
// para el mapa
const L = require('../../../assets/js/leaflet.js');
// jquery en angular
declare var $: any;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      // left: 100,
      // behavior: 'smooth'
    });
    this.mapaBienesRaices();
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
