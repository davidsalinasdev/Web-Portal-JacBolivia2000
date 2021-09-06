import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

// Mostrar notifiaciones
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

interface Ciudad {
  value: string;
  viewValue: string;
}

interface TipoDocumento {
  value: string;
  viewValue: string;
}

interface Carreras {
  value: string;
  viewValue: string;
}

// Interfas de que tipo de evento
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

// Servicios
import { global } from '../../../services/global';
import { AcercaService } from 'src/app/services/acerca.service';
import { HomeService } from '../../../services/home.service';
import { PuenteService } from '../../../services/puente.service';// Desde aqui Formulario-inscripcion a Gracias


// Formulaios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { AngularFileUploaderComponent } from 'angular-file-uploader';

// Rutas navegacion entre paginas
import { Router } from '@angular/router';



@Component({
  selector: 'app-formulario-inscripcion',
  templateUrl: './formulario-inscripcion.component.html',
  styleUrls: ['./formulario-inscripcion.component.css']
})
export class FormularioInscripcionComponent implements OnInit {

  ciudades: Ciudad[] = [
    { value: 'LP', viewValue: 'LP' },
    { value: 'SC', viewValue: 'SC' },
    { value: 'CB', viewValue: 'CB' },
    { value: 'TJ', viewValue: 'TJ' },
    { value: 'PT', viewValue: 'PT' },
    { value: 'CH', viewValue: 'CH' },
    { value: 'OR', viewValue: 'OR' },
    { value: 'BE', viewValue: 'BE' },
    { value: 'PD', viewValue: 'PD' }
  ];

  tiposDocumentos: TipoDocumento[] = [
    { value: 'CEDULA DE IDENTIDAD', viewValue: 'CEDULA DE IDENTIDAD' },
    { value: 'CARNET DE EXTRANJERO', viewValue: 'CARNET DE EXTRANJERO' },
    { value: 'PASAPORTE', viewValue: 'PASAPORTE' },
    { value: 'CARNET DE DIPLOMATICO', viewValue: 'CARNET DE DIPLOMATICO' },

  ];
  carreras: Carreras[] = [
    { value: 'ADMINISTRACIÓN DE EMPRESAS', viewValue: 'ADMINISTRACIÓN DE EMPRESAS' },
    { value: 'CONTABILIDAD GENERAL', viewValue: 'CONTABILIDAD GENERAL' },
    { value: 'SECRETARIADO EJECUTIVO', viewValue: 'SECRETARIADO EJECUTIVO' },
    { value: 'INGLES CONVERSACIONAL', viewValue: 'INGLES CONVERSACIONAL' },

  ];

  public listaAcerca: any;
  public imagenWeb: string;
  public tipoPago: string;
  public carreraElegida: string;
  public costoTotal: string;
  public descuento: string;
  public total: string;
  public detalle: string;
  public porcentaje: string;
  public anualSemestral: string;

  // Imagenes
  public anverso: File;
  public reverso: File;
  public titulo: File;
  public certificado: File;
  public pagoComprobante: File;
  public nameFileAnverso: string;
  public nameFileReverso: string;
  public nameFileCertificado: string;
  public nameFileTitulo: string;
  public nameFilePagoComprobante: string;
  public nameAnverso: string;
  public nameReverso: string;
  public nameCertificado: string;
  public nameTitulo: string;
  public namePagoComprobante: string;


  // Configuración para Optener el nombre de una archivo
  afuConfig = {
    multiple: false,
    // formatsAllowed: ".pdf,.docx",
    formatsAllowed: ".jpg, .png",
    maxSize: "500",
    uploadAPI: {
      url: global.url + 'correos/obtenerNameImagen',
      method: "POST",
      // headers: {
      //   'token-usuario': this.token
      // },
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Elija un archivo.',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };
  @ViewChild('fileUpload')
  private fileUpload: AngularFileUploaderComponent;

  // Formulario de inscripcion
  public formulario: FormGroup;

  // Recapcha
  public siteKey: string;

  // Alerta de inscripcion
  public alerta: string;

  // Boton de envia
  public botonEnviar: string;

  public esperandoInscripcion: string;

  constructor(
    private acercaServices: AcercaService,
    private formBuilder: FormBuilder,
    private homeServices: HomeService,
    private toasterServices: ToastrService,
    private router: Router,
    private puenteServices: PuenteService) {
    this.siteKey = '6LdTfdgZAAAAAPcTRnWFNs5UNET5TMOikXc-bjK9';
    this.tipoPago = 'd-none';
    this.detalle = 'd-none';
    this.anualSemestral = 'd-block';
    this.alerta = 'd-none';
    this.botonEnviar = 'd-block';

    // this.fileUpload.resetFileUpload();
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      // left: 100,
      behavior: 'auto'
    });
    this.crearFormulario();
    // this.indexWeb();
  }

  /**
   * crearFormulario
   */
  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      // Informacion Principal
      carnet: ['', [Validators.required, Validators.maxLength(15)]],
      ciudad: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      // tslint:disable-next-line: max-line-length
      nombres: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/)]],
      paterno: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/)]],
      materno: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/)]],
      celular: ['', [Validators.required, Validators.pattern(/^[1-9]\d{6,9}$/)]],
      // tslint:disable-next-line: max-line-length
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],

      //  Datos del padre/Madre o tutor
      nombresTutor: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/)]],
      profesion: ['', [Validators.required, Validators.maxLength(50)]],
      carnetPasaporte: ['', [Validators.required, Validators.maxLength(15)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[1-9]\d{6,9}$/)]],
      // tslint:disable-next-line: max-line-length
      emailTutor: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
      direccion: ['', [Validators.required]],
      zona: ['', [Validators.required]],
      // Informacion academica
      carrera: ['', [Validators.required]],

      turno: ['', [Validators.required]],
      pago: ['', [Validators.required]],
      // Recaptcha
      // recaptcha: ['', Validators.required],
    });
  }
  // Validaciones para formulario
  get carnet() {
    return this.formulario.get('carnet');
  }
  get ciudad() {
    return this.formulario.get('ciudad');
  }
  get tipoDocumento() {
    return this.formulario.get('tipoDocumento');
  }

  get nombres() {
    return this.formulario.get('nombres');
  }
  get paterno() {
    return this.formulario.get('paterno');
  }
  get materno() {
    return this.formulario.get('materno');
  }
  get celular() {
    return this.formulario.get('celular');
  }
  get email() {
    return this.formulario.get('email');
  }
  get nombresTutor() {
    return this.formulario.get('nombresTutor');
  }
  get profesion() {
    return this.formulario.get('profesion');
  }
  get carnetPasaporte() {
    return this.formulario.get('carnetPasaporte');
  }
  get telefono() {
    return this.formulario.get('telefono');
  }
  get emailTutor() {
    return this.formulario.get('emailTutor');
  }
  get direccion() {
    return this.formulario.get('direccion');
  }
  get zona() {
    return this.formulario.get('zona');
  }
  get carrera() {
    return this.formulario.get('carrera');
  }
  get turno() {
    return this.formulario.get('turno');
  }
  get pago() {
    return this.formulario.get('pago');
  }

  get recaptcha() {
    return this.formulario.get('recaptcha');
  }

  // public indexWeb() {
  //   this.acercaServices.indexAcerca().subscribe(
  //     response => {
  //       if (response.status === "success") {
  //         this.listaAcerca = response.acerca[0];

  //         this.imagenWeb = this.listaAcerca.img_inscribete;
  //         // console.log(this.listaAcerca);
  //       }
  //     },
  //     error => {
  //       console.log(error.error);

  //     }
  //   );
  // }

  /**
   * onSubmit
   */
  public onSubmit(event) {


    // 1 prioridad de ejecución
    let horaFechaActual = new Date();
    // convert date to a string in UTC timezone format:
    if (this.anverso && this.reverso && this.certificado && this.titulo && this.pagoComprobante) { // 2 Prioridad
      this.alerta = 'd-block';
      this.botonEnviar = 'd-none';
      // 3 Prioridad de ejecucion
      const datos: any = {
        carnet: this.carnet.value,
        carnetPasaporte: this.carnetPasaporte.value,
        carrera: this.carrera.value,
        celular: this.celular.value,
        ciudad: this.ciudad.value,
        direccion: this.direccion.value,
        email: this.email.value,
        emailTutor: this.emailTutor.value,
        materno: this.materno.value,
        nombres: this.nombres.value,
        nombresTutor: this.nombresTutor.value,
        pago: this.pago.value,
        paterno: this.paterno.value,
        profesion: this.profesion.value,
        telefono: this.telefono.value,
        tipoDocumento: this.tipoDocumento.value,
        turno: this.turno.value,
        zona: this.zona.value,
        anverso: this.nameAnverso,
        reverso: this.nameReverso,
        titulo: this.nameTitulo,
        certificado: this.nameCertificado,
        pagoComprobante: this.namePagoComprobante,
        costoTotal: this.costoTotal,
        descuento: this.descuento,
        total: this.total,
        porcentaje: this.porcentaje,
        fecha: horaFechaActual
      }

      const getDatos = () => {
        // Lo convertimos en una promesa
        return new Promise((resolve, reject) => {
          resolve(
            this.homeServices.storeInscripciones(this.anverso, this.reverso, this.certificado, this.titulo, this.pagoComprobante, JSON.stringify(datos)).subscribe(
              resp => {

                this.esperandoInscripcion = resp.status;
                this.puenteServices.datosNuevos = resp.datos;
              },
              err => {
                console.log(err);

              })
          );
        })
      }

      async function mostrarDatos() { // Esto es una funcion asincrona
        // Un await debe estar dentro de una funcion asincrona
        await getDatos();

      }

      // CallBack como ultima ejecucion
      setTimeout(() => {
        // 5 Prioridad de ejecucion
        this.alerta = 'd-none';
        // 6 Prioridad de ejecucion
        this.botonEnviar = 'd-block';
        // 7 Prioridad de ejecucion
        // Cambia a otra pagina
        this.router.navigate(['/gracias']);
        // 8 Prioridad de ejecucion
        Swal.fire({
          icon: 'success',
          title: 'Felicidades!!!',
          text: 'Su inscripción se ha realizado de forma correcta.',
          footer: 'Sistema de inscripciones Jac Bolivia 2000.',
          confirmButtonText: `Aceptar`,
        });
      }, 2000);

      // Ejecutamos el async
      mostrarDatos();

    } else {
      this.toasterServices.error('¡Todos los archivos son requeridos!', 'Sistema de inscripciones en linea');
    }

  }

  onChange(datos) {
    // console.log(datos.value); // Aquí iría tu lógica al momento de seleccionar algo
    this.tipoPago = 'd-block';
    this.detalle = 'd-none';
    this.pago.reset();

    // Logica del pago de inscripciones
    if (datos.value === 'ADMINISTRACIÓN DE EMPRESAS' || datos.value === 'CONTABILIDAD GENERAL' || datos.value === 'SECRETARIADO EJECUTIVO') {

      this.carreraElegida = datos.value;
      this.anualSemestral = 'd-block'

    } else {
      this.carreraElegida = datos.value;
      this.anualSemestral = 'd-none';
    }
  }

  /**
   * opcionesPagos
   */
  public opcionesPagos(options) {
    // console.log(options.value);
    this.detalle = 'd-block';
    // console.log(this.anualSemestral);

    if (this.anualSemestral === 'd-block') {
      switch (options.value) {
        case 'Total':
          this.costoTotal = '14.967 Bs.';
          this.descuento = '2.993,4 Bs.';
          this.total = '11.976,6 Bs.';
          this.porcentaje = '20%';
          break;
        case 'Anual':
          this.costoTotal = '4.989 Bs.';
          this.descuento = '498,9 Bs.';
          this.total = '4.490,1 Bs.';
          this.porcentaje = '10%';
          break;
        case 'Semestral':
          this.costoTotal = '2.694 Bs.';
          this.descuento = '137,7 Bs.';
          this.total = '2.559,3 Bs.';
          this.porcentaje = '5%';
          break;
        case 'Mensual':
          this.costoTotal = '399 Bs.';
          this.descuento = '0 Bs.';
          this.total = '399 Bs.';
          this.porcentaje = '0%';
          break;

        default:
          break;
      }

    } else {
      switch (options.value) {
        case 'Total':
          this.costoTotal = '1.394 Bs.';
          this.descuento = '139 Bs.';
          this.total = '1.255 Bs.';
          this.porcentaje = '10%';
          break;

        case 'Mensual':
          this.costoTotal = '199 Bs.';
          this.descuento = '0 Bs.';
          this.total = '199 Bs.';
          this.porcentaje = '0%';
          break;

        default:
          break;
      }

    }



  }

  // Manejo de imagenes
  /**
   * docUpload
   */
  public docUpload(evento) {
    console.log(evento);
  }

  /**
   * fileImagen
   */
  public onPhotoSelectedAnverso(evento: HtmlInputEvent) {

    if (evento.target.files) {
      this.anverso = <File>evento.target.files[0];
      // Nombre del archivo subido
      this.nameFileAnverso = this.anverso.name;

      this.homeServices.recuperarNamePhoto(this.anverso).subscribe(
        response => {
          // console.log(response.image);
          this.nameAnverso = response.image;
        },
        err => {
          console.log(err);

        }
      );
    }
  }

  /**
   * fileImagen
   */
  public onPhotoSelectedReverso(evento: HtmlInputEvent) {

    if (evento.target.files) {
      this.reverso = <File>evento.target.files[0];
      // Nombre del archivo subido
      this.nameFileReverso = this.reverso.name;

      this.homeServices.recuperarNamePhoto(this.reverso).subscribe(
        response => {
          // console.log(response.image);
          this.nameReverso = response.image;
        },
        err => {
          console.log(err);

        }
      );
    }
  }

  /**
   * fileImagen
   */
  public onPhotoSelectedCertificado(evento: HtmlInputEvent) {

    if (evento.target.files) {
      this.certificado = <File>evento.target.files[0];
      // Nombre del archivo subido
      this.nameFileCertificado = this.certificado.name;

      this.homeServices.recuperarNamePhoto(this.certificado).subscribe(
        response => {
          // console.log(response.image);
          this.nameCertificado = response.image;
        },
        err => {
          console.log(err);

        }
      );
    }
  }

  /**
   * fileImagen
   */
  public onPhotoSelectedTitulo(evento: HtmlInputEvent) {

    if (evento.target.files) {
      this.titulo = <File>evento.target.files[0];
      // Nombre del archivo subido
      this.nameFileTitulo = this.titulo.name;

      this.homeServices.recuperarNamePhoto(this.titulo).subscribe(
        response => {
          // console.log(response.image);
          this.nameTitulo = response.image;
        },
        err => {
          console.log(err);

        }
      );
    }
  }

  /**
   * fileImagen
   */
  public onPhotoSelectedPagoComprobante(evento: HtmlInputEvent) {

    if (evento.target.files) {
      this.pagoComprobante = <File>evento.target.files[0];
      // Nombre del archivo subido
      this.nameFilePagoComprobante = this.pagoComprobante.name;

      this.homeServices.recuperarNamePhoto(this.pagoComprobante).subscribe(
        response => {
          // console.log(response.image);
          this.namePagoComprobante = response.image;
        },
        err => {
          console.log(err);

        }
      );
    }
  }


}
