import { Component, OnInit } from '@angular/core';

// Servicios
import { HomeService } from '../../services/home.service';

// Plugins
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@nomadreservations/ngx-gallery';
import * as moment from 'moment';

// Url de la pagina
import { global } from '../../services/global';
import { ActivatedRoute } from '@angular/router';

// jquery en angular
declare var $: any;

@Component({
  selector: 'app-home-noticias',
  templateUrl: './home-noticias.component.html',
  styleUrls: ['./home-noticias.component.css']
})

export class HomeNoticiasComponent implements OnInit {
  public url: string;
  public urlImg: string;
  public listaCarreras: any;
  public listaImagenes: any;
  public nuevaListaImagenes: any = [];
  public idCarrera: any;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private homeServices: HomeService, private route: ActivatedRoute, private activateRoute: ActivatedRoute) {
    // window.scroll({
    //   top: 0,
    //   // left: 100,
    //   // behavior: 'smooth'
    // });
    // window.onload = () => {
    //   // alert('Cargado la pagina');
    //   $('#onload').fadeOut();
    //   $('body').removeClass('hidden');
    //   $('#navegacion').removeClass('d-none');
    //   // alert('La pagina se cargo correctamente ');
    // };

    this.url = global.url;
    this.urlImg = global.urlImg;
    this.idCarrera = this.route.snapshot.paramMap.get('id');

    // Observando las activaciones con rutas con parametro
    this.activateRoute.params.subscribe(
      params => {

        // window.onload = () => {
        //   // alert('Cargado la pagina');
        //   $('#onload').fadeOut();
        //   $('body').removeClass('hidden');
        //   $('#navegacion').removeClass('d-none');
        //   alert('La pagina se cargo correctamente ');
        // };
        moment.locale('es');

        this.nuevaListaImagenes = [];
        this.indexNoticias(params.id);
        this.showNoticias(params.id);
        window.scroll({
          top: 0,
          // left: 100,
          behavior: 'smooth'
        });
      }

    );


  }

  ngOnInit(): void {

    this.galleryOptions = [
      {
        breakpoint: 5000,
        width: '550px',
        height: '490px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageInfinityMove: true,
        preview: false,
        // previewZoomMin: 0.5,
        // image: false,
      },

      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
        preview: false
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      },

      { imageAnimation: "slide" },
      { thumbnailsMoveSize: 4 },
      // { imageAutoPlay: true },
      { imageInfinityMove: true },
      { imageSize: 'contain' }

    ];

    this.galleryImages = [


      {

        small: './../../../assets/img/estuden2.jpg',
        medium: './../../../assets/img/estuden2.jpg',
        big: './../../../assets/img/estuden2.jpg',

      },
      {

        small: './../../../assets/img/estuden2.jpg',
        medium: './../../../assets/img/estuden2.jpg',
        big: './../../../assets/img/estuden2.jpg',

      },
      {

        small: './../../../assets/img/estuden2.jpg',
        medium: './../../../assets/img/estuden2.jpg',
        big: './../../../assets/img/estuden2.jpg',

      },
      {
        small: './../../../assets/img/estuden2.jpg',
        medium: './../../../assets/img/estuden2.jpg',
        big: './../../../assets/img/estuden2.jpg',

      },
    ];

  }

  /**
   * indexInvitados Lista todos los registros de invitados
   */
  public indexNoticias(idNoticias) {

    this.homeServices.listaImagenesNoticias(idNoticias).subscribe(
      response => {
        // console.log(response);
        if (response.status === 'success') {
          this.listaImagenes = response.imagenes;
          // console.log(this.listaImagenes);

          this.listaImagenes.forEach(element => {

            this.nuevaListaImagenes.push(element);

          });
          this.nuevaListaImagenes = this.nuevaListaImagenes.reverse();
          // console.log(this.nuevaListaImagenes);

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
  public showNoticias(idNoticias) {

    this.homeServices.showNoticias(idNoticias).subscribe(
      response => {
        // console.log(response);
        if (response.status === 'success') {
          this.listaCarreras = response.carrera;
          // console.log(this.listaCarreras);
          // this.listaCarreras.reverse();

          this.listaCarreras.fecha = moment(this.listaCarreras.fecha).format(" Do [ de ] MMMM [ de ] YYYY");
          console.log(this.listaCarreras);
        }
      },
      errors => {
        console.log(errors);
      }
    );

  }

}


