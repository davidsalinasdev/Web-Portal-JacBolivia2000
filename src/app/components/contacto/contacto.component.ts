import { Component, OnInit } from '@angular/core';
// para el mapa
import * as L from 'leaflet';
import "leaflet/dist/images/marker-shadow.png";

// jquery en angular
declare var $: any;

// Servicios
import { AcercaService } from './../../services/acerca.service';
// Servicios
import { HomeService } from '../../services/home.service';

// Url de la pagina
import { global } from '../../services/global';

// Mostrar notifiaciones
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  public listaAcerca: any;
  public imagenWeb: string;
  public url: string;
  public urlImagen: string;
  // Recapcha
  public siteKey: string;
  public formulario: FormGroup;
  constructor(
    private acercaServices: AcercaService,
    private toasterServices: ToastrService,
    private formBuilder: FormBuilder, private homeServices: HomeService) {
    this.siteKey = '6LdTfdgZAAAAAPcTRnWFNs5UNET5TMOikXc-bjK9';
    this.url = global.url;
    this.urlImagen = global.urlImg;
  }

  ngOnInit(): void {
    this.crearFormulario();
    window.scroll({
      top: 0,
      // left: 100,
      behavior: 'auto'
    });
    // this.mapaBienesRaices();
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

          this.imagenWeb = this.listaAcerca.img_contacto;
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

  }

}
