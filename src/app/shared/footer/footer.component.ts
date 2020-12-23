import { Component, OnInit } from '@angular/core';

// Servicios
import { AcercaService } from './../../services/acerca.service';
import { global } from './../../services/global';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public url: any;
  public listaAcerca: any;
  constructor(private acercaServices: AcercaService) {

    this.url = global.url;
  }

  ngOnInit(): void {
    this.indexWeb();
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
