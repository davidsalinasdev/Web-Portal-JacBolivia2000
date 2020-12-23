import { Component, OnInit } from '@angular/core';

// plugin
import * as moment from 'moment';

// Url de la pagina
import { global } from '../../services/global';

// Rutas
import { ActivatedRoute, Router } from '@angular/router';

// servicios
import { HomeService } from '../../services/home.service';
import { AcercaService } from '../../services/acerca.service';

// Formularios
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-defensas',
  templateUrl: './defensas.component.html',
  styleUrls: ['./defensas.component.css']
})
export class DefensasComponent implements OnInit {
  // Formulario
  public formulario: FormGroup;

  public url: string;
  public urlImagen: string;
  public listaNoticias: any;
  public nuevaListaNoticias: any = [];
  public buscarNoticias: boolean;
  public buscarSuccess: boolean;
  public intervaloSuccess: string;
  public intervalo: string;
  public listaSuccess: any;
  public estiloCerrar: any;
  public listaAcerca: any;
  public imagenWeb: string;
  constructor(
    private homeServices: HomeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private acercaServices: AcercaService
  ) {
    // window.scroll({
    //   top: 0,
    //   // left: 100,
    //   // behavior: 'smooth'
    // });
    this.crearFormulario();
    moment.locale('es');
    this.url = global.url;
    this.urlImagen = global.urlImg;
    this.buscarNoticias = false;
    this.buscarSuccess = false;
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      // left: 100,
      behavior: 'auto'
    });
    // window.onload = () => {
    //   // alert('Cargado la pagina');
    //   $('#onload').fadeOut();
    //   $('body').removeClass('hidden');
    //   $('#navegacion').removeClass('d-none');
    //   // alert('La pagina se cargo correctamente ');
    // };
    this.indexNoticias();
    this.indexWeb();
  }

  /**
   * crearFormulario
   */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      buscar: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }
  // Validacion de formulario
  get buscar() {
    return this.formulario.get('buscar');
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    // captura del parametro idInvitado
    const tipoNoticia = this.route.snapshot.paramMap.get('id');
    const buscar = {
      buscar: this.formulario.value.buscar,
      tipoNoticia: tipoNoticia
    };

    this.homeServices.showCarreraBuscar(buscar).subscribe(
      response => {
        this.listaSuccess = response.noticias;

        // console.log(this.listaSuccess);
        if (response.noticias.length === 0) {

          this.intervalo = "animated fadeIn fast";
          this.buscarNoticias = true;
          this.estiloCerrar = 'cerrar';

          // async await
          const getMensaje = () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                this.intervalo = 'animated fadeOut';
                resolve(this.intervalo);
              }, 6000);
            });
          };
          const getCerrar = () => {
            return new Promise((resolve, reject) => {

              setTimeout(() => {
                this.buscarNoticias = false;
                resolve(this.buscarNoticias);
              }, 2000);
            });
          };
          async function mensaje() {
            const mensajeFeched = await getMensaje();
            const cerrarFeched = await getCerrar();
          }
          mensaje();
        } else {

          this.intervaloSuccess = "animated fadeIn fast";
          this.buscarSuccess = true;
          this.estiloCerrar = 'abrir';

          // async await
          const getMensaje = () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                this.intervaloSuccess = 'animated fadeOut';
                resolve(this.intervaloSuccess);
              }, 6000);
            });
          };
          const getCerrar = () => {
            return new Promise((resolve, reject) => {

              setTimeout(() => {
                this.buscarSuccess = false;
                resolve(this.buscarSuccess);
              }, 2000);
            });
          };
          async function mensaje() {
            const mensajeFeched = await getMensaje();
            const cerrarFeched = await getCerrar();
          }
          mensaje();

        }

      },
      error => {

      }
    );

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
            if (element.estado === 1 && element.estado_noticias === 'D') {
              // console.log(element.fecha);

              element.fecha = moment(element.fecha).format(" Do [ de ] MMMM [ de ] YYYY");
              this.nuevaListaNoticias.push(element);
            }
          });
          this.nuevaListaNoticias = this.nuevaListaNoticias.reverse();
          // console.log(this.nuevaListaNoticias);


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


          // console.log(this.listaAcerca)
          this.imagenWeb = this.listaAcerca.img_defensa;
        }
      },
      error => {
        console.log(error.error);

      }
    );
  }

}
