import { Component, OnInit } from '@angular/core';

interface Ciudad {
  value: string;
  viewValue: string;
}

interface TipoDocumento {
  value: string;
  viewValue: string;
}


// Servicios
import { global } from '../../../services/global';
import { AcercaService } from 'src/app/services/acerca.service';
import { HomeService } from '../../../services/home.service';

// Formulaios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  public listaAcerca: any;
  public imagenWeb: string;

  // Configuración para subir archivos
  afuConfig = {
    multiple: false,
    formatsAllowed: ".pdf,.docx",
    maxSize: "500",
    uploadAPI: {
      url: global.url + 'perlitas/upload',
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

  // Formulario de inscripcion
  public formulario: FormGroup;

  // Recapcha
  public siteKey: string;
  constructor(
    private acercaServices: AcercaService,
    private formBuilder: FormBuilder) {
    this.siteKey = '6LdTfdgZAAAAAPcTRnWFNs5UNET5TMOikXc-bjK9';
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.indexWeb();
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
      nombres: ['', [Validators.required, Validators.maxLength(20), Validators.pattern("^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$")]],
      paterno: ['', [Validators.required, Validators.maxLength(20), Validators.pattern("/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/")]],
      Materno: ['', [Validators.required, Validators.maxLength(20), Validators.pattern("/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/")]],
      celular: ['', [Validators.required, Validators.pattern(/^[1-9]\d{7,10}$/)]],
      // tslint:disable-next-line: max-line-length
      email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")])],

      //  Datos del padre/Madre o tutor
      nombresTutor: ['', [Validators.required, Validators.maxLength(30), Validators.pattern("/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/")]],
      profesion: ['', [Validators.required, Validators.maxLength(20), Validators.pattern("/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/")]],
      carnetPasaporte: ['', [Validators.required, Validators.maxLength(15)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[1-9]\d{7,10}$/)]],
      // tslint:disable-next-line: max-line-length
      emailTutor: ['', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")])],
      direccion: ['', [Validators.required]],
      zona: ['', [Validators.required]],

      // Informacion academica
      carrera: ['', [Validators.required]],
      // Recaptcha
      recaptcha: ['', Validators.required],
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

  get recaptcha() {
    return this.formulario.get('recaptcha');
  }


  public indexWeb() {
    this.acercaServices.indexAcerca().subscribe(
      response => {
        if (response.status === "success") {
          this.listaAcerca = response.acerca[0];

          this.imagenWeb = this.listaAcerca.img_inscribete;
          // console.log(this.listaAcerca);
        }
      },
      error => {
        console.log(error.error);

      }
    );
  }

}
