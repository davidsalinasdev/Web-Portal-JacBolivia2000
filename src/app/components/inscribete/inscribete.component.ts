import { Component, OnInit } from '@angular/core';

// Servicios
import { AcercaService } from './../../services/acerca.service';
import { HomeService } from '../../services/home.service';
import { global } from './../../services/global';

// formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Mostrar notifiaciones
import { ToastrService } from 'ngx-toastr';

// jquery en angular
declare var $: any;

@Component({
  selector: 'app-inscribete',
  templateUrl: './inscribete.component.html',
  styleUrls: ['./inscribete.component.css']
})
export class InscribeteComponent implements OnInit {
  public listaAcerca: any;
  public url: string;
  public urlImagen: string;
  public imagenWeb: string;

  // Recapcha
  public siteKey: string;

  // para el formulario de contacto
  public formulario: FormGroup;
  constructor(
    private acercaServices: AcercaService,
    private formBuilder: FormBuilder,
    private toasterServices: ToastrService, private homeServices: HomeService) {
    this.siteKey = '6LdTfdgZAAAAAPcTRnWFNs5UNET5TMOikXc-bjK9';
    this.urlImagen = global.urlImg;
  }

  ngOnInit(): void {
    this.crearFormulario();
    window.scroll({
      top: 0,
      // left: 100,
      // behavior: 'smooth'
    });
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

  /**
   * refrescarFormulario
   */
  public refrescarFormulario() {
    this.formulario.reset();
    // Limpia la imagen
  }

}
