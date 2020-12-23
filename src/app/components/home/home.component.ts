import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from "@angular/common";

// para el mapa
import * as L from 'leaflet';
import "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

// Servicios
import { HomeService } from '../../services/home.service';
import { AcercaService } from '../../services/acerca.service';

// Url de la pagina
import { global } from '../../services/global';

// Para utilizar Arreglos que facilitan la vida del programador jeje
import * as _ from 'lodash';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';


// jquery en angular
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  public listaOferta: any;
  public listaCarreras: any;
  public listaNoticias: any;
  public url: string;
  public urlImagen: string;
  public nuevaLista: any = [];
  public nuevaListaCarreras: any = [];
  public nuevaListaMas: any = [];
  public nuevaListaNoticias: any = [];
  public listaTres: any = [];
  public contadorNoticias: number;
  public listaAcerca: any;

  constructor(
    private homeServices: HomeService,
    private acercaServices: AcercaService,
    private activateRoute: ActivatedRoute,
    private router: Router, private location: Location
  ) {
    moment.locale('es');
    this.url = global.url;
    this.urlImagen = global.urlImg;
  }
  // tslint:disable-next-line: use-lifecycle-interface
  // ngAfterViewInit() {
  //   $('#onload').fadeOut();
  //   $('body').removeClass('hidden');
  //   $('#navegacion').removeClass('d-none');
  // }

  ngOnInit(): void {

    // this.location.subscribe((ev: PopStateEvent) => {
    //   this.lastPoppedUrl = ev.url;
    // });
    // this.router.events.subscribe((ev: any) => {
    //   if (ev instanceof NavigationStart) {
    //     // tslint:disable-next-line: triple-equals
    //     if (ev.url != this.lastPoppedUrl) {
    //       this.yScrollStack.push(window.scrollY);
    //     }
    //   } else if (ev instanceof NavigationEnd) {
    //     // tslint:disable-next-line: triple-equals
    //     if (ev.url == this.lastPoppedUrl) {
    //       this.lastPoppedUrl = undefined;
    //       window.scrollTo(0, this.yScrollStack.pop());
    //     } else {
    //       window.scrollTo(0, 0);
    //     }
    //   }
    // });
    window.scroll({
      top: 0,
      // left: 100,
      behavior: 'auto'
    });

    this.indexPromo();
    this.indexCarreras();
    this.indexNoticias();
    this.indexWeb();
    // this.mapaBienesRaices();
  }

  /**
   * indexInvitados Lista todos los registros de invitados
   */
  public indexNoticias() {

    this.homeServices.indexNoticias().subscribe(
      response => {
        // console.log(response);
        if (response.status === 'success') {
          this.listaNoticias = response.carrera;
          // console.log(this.listaNoticias);

          this.listaNoticias.forEach((element, index) => {
            // console.log(element);
            if (element.estado === 1) {
              // console.log(element.fecha);

              element.fecha = moment(element.fecha).format(" Do [ de ] MMMM [ de ] YYYY");
              this.nuevaListaNoticias.push(element);
            }
          });
          this.nuevaListaNoticias = this.nuevaListaNoticias.reverse();
          this.contadorNoticias = this.nuevaListaNoticias.length / 3;
          // console.log(this.nuevaListaNoticias);

          if (Number.isInteger(this.contadorNoticias)) {
            this.contadorNoticias = this.contadorNoticias;
          } else {
            this.contadorNoticias = Math.trunc(this.contadorNoticias) + 1;
          }
          this.listaTres = _.chunk(this.nuevaListaNoticias, 3);
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
  public indexCarreras() {

    this.homeServices.indexCarrera().subscribe(
      response => {
        // console.log(response);
        if (response.status === 'success') {
          this.listaCarreras = response.carrera;
          // console.log(this.listaCarreras);

          this.listaCarreras.forEach(element => {
            // console.log(element);
            if (element.estado === 1 && element.tipo === 'carrera') {
              this.nuevaListaCarreras.push(element);
            }
            if (element.estado === 1 && element.tipo === 'webPages') {
              this.nuevaListaMas.push(element);
            }
          });
          this.nuevaListaCarreras = this.nuevaListaCarreras.reverse();
          this.nuevaListaMas = this.nuevaListaMas.reverse();
          // console.log(this.nuevaListaCarreras);

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

  public indexWeb() {
    this.acercaServices.indexAcerca().subscribe(
      response => {
        if (response.status === "success") {
          this.listaAcerca = response.acerca[0];


          // console.log(this.listaAcerca);
        }
      },
      error => {
        console.log(error.error);

      }
    );
  }

}
