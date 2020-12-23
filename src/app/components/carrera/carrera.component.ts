import { Component, OnInit } from '@angular/core';

// Servicios
import { HomeService } from '../../services/home.service';
// Servicios
import { AcercaService } from './../../services/acerca.service';

// Plugins
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@nomadreservations/ngx-gallery';

// Url de la pagina
import { global } from '../../services/global';
import { ActivatedRoute } from '@angular/router';

// formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Mostrar notifiaciones
import { ToastrService } from 'ngx-toastr';

// jquery en angular
declare var $: any;

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {
  public url: string;
  public urlImagen: string;
  public listaCarreras: any;
  public listaImagenes: any;
  public nuevaListaImagenes: any = [];
  public idCarrera: any;
  public listaAcerca: any;

  // Recapcha
  public siteKey: string;

  // para el formulario de contacto
  public formulario: FormGroup;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private homeServices: HomeService,
    private route: ActivatedRoute,
    private activateRoute: ActivatedRoute,
    private acercaServices: AcercaService,
    private formBuilder: FormBuilder, private toasterServices: ToastrService) {
    this.siteKey = '6LdTfdgZAAAAAPcTRnWFNs5UNET5TMOikXc-bjK9';
    this.url = global.url;
    this.urlImagen = global.urlImg;
    this.idCarrera = this.route.snapshot.paramMap.get('id');

    // Observando las activaciones con rutas con parametro
    this.activateRoute.params.subscribe(
      params => {
        window.scroll({
          top: 0,
          // left: 100,
          behavior: 'auto'
        });

        this.nuevaListaImagenes = [];
        this.indexImagenes(params.id);
        this.showCarreras(params.id);
      }

    );


  }

  ngOnInit(): void {
    this.crearFormulario();
    window.scroll({
      top: 0,
      // left: 100,
      behavior: 'smooth'
    });

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
    this.indexWeb();
  }
  /**
   * crearFormulario
   */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      recaptcha: ['', Validators.required],
      // recaptcha: [''],
      nombres: ['', [Validators.required, Validators.maxLength(30)]],
      celular: ['', [Validators.required, Validators.pattern(/^[1-9]\d{7,10}$/)]],
      // tslint:disable-next-line: max-line-length
      correo: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")])],
    });
  }
  // Validaciones para formulario
  get recaptcha() {
    return this.formulario.get('recaptcha');
  }
  get nombres() {
    return this.formulario.get('nombres');
  }

  get celular() {
    return this.formulario.get('celular');
  }
  get correo() {
    return this.formulario.get('correo');
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    console.log(this.formulario.value);

    const email = {
      nombres: this.formulario.value.nombres,
      celular: this.formulario.value.celular,
      correo: this.formulario.value.correo
    };

    this.homeServices.enviarCorreo(email).subscribe(
      response => {
        // console.log(response);
        this.toasterServices.success(response.message, 'Correcto');
        this.refrescarFormulario();

      },
      error => {

        // console.log(error);
        this.toasterServices.error(error.error.message, 'Incorrecto');

      }
    );

  }

  /**
   * indexInvitados Lista todos los registros de invitados
   */
  public indexImagenes(idCarrera) {

    this.homeServices.listaImagenesCarrera(idCarrera).subscribe(
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
  public showCarreras(idCarrera) {

    this.homeServices.showCarrera(idCarrera).subscribe(
      response => {
        // console.log(response);
        if (response.status === 'success') {
          this.listaCarreras = response.carrera;
          // console.log(this.listaCarreras);
          // this.listaCarreras.reverse();
          // console.log(this.listaCarreras.imagen);
        }
      },
      errors => {
        console.log(errors);
      }
    );

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
  /**
   * refrescarFormulario
   */
  public refrescarFormulario() {
    this.formulario.reset();
    // Limpia la imagen
  }

}


