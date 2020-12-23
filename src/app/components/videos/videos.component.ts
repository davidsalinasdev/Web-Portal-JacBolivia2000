import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Servicios
import { global } from './../../services/global';
import { HomeService } from './../../services/home.service';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  public urlArchivos: string;
  public listaVideos: any = [];
  public listaVideosFinal: any = [];
  public datoVideo: any = [];
  constructor(
    private HomeServices: HomeService,
    private activateRoute: ActivatedRoute,
    private router: Router) {
    this.urlArchivos = global.urlImg;


    // Observando las activaciones con rutas con parametro
    this.activateRoute.params.subscribe(
      params => {
        window.scroll({
          top: 0,
          // left: 100,
          behavior: 'auto'
        });
        if (params.id === 'lista-videos' || params.id === 'educativos') {
          this.indexVideos();
        } else if (params.id === 'comercial') {
          this.indexComercial();
        } else {
          this.showVideos(params.id);
        }

      }

    );
  }



  ngOnInit(): void {
    // this.indexVideos();
  }

  /**
   * indexVideos
   */
  public indexVideos() {
    this.HomeServices.indexVideos().subscribe(
      resp => {

        this.listaVideos = [];
        this.listaVideosFinal = resp.videos.reverse();


        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < this.listaVideosFinal.length; index++) {
          if (this.listaVideosFinal[index].tipo === 'educativos') {
            this.listaVideos.push(this.listaVideosFinal[index]);
          }
          // if (this.listaVideosFinal[index].tipo === 'biblica' && this.listaVideosFinal[index].estado === 1) {
          //   this.listaReflexionBiblica.push(this.listaVideosFinal[index]);
          // }
        }

        // console.log(this.listaVideos);
        this.datoVideo = this.listaVideos[0];
      },
      err => {

      }
    );
  }

  /**
   * indexComercial
   */
  public indexComercial() {
    this.HomeServices.indexVideos().subscribe(
      resp => {

        this.listaVideos = [];
        this.listaVideosFinal = resp.videos.reverse();


        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < this.listaVideosFinal.length; index++) {
          if (this.listaVideosFinal[index].tipo === 'comerciales') {
            this.listaVideos.push(this.listaVideosFinal[index]);
          }
          // if (this.listaVideosFinal[index].tipo === 'biblica' && this.listaVideosFinal[index].estado === 1) {
          //   this.listaReflexionBiblica.push(this.listaVideosFinal[index]);
          // }
        }

        // console.log(this.listaVideos);
        this.datoVideo = this.listaVideos[0];
      },
      err => {

      }
    );
  }

  /**
   * educativos
   */
  public educativos() {
    this.router.navigate(['/videos', 'educativos']);
  }

  /**
   * comercial
   */
  public comercial() {
    this.router.navigate(['/videos', 'comercial']);
  }

  public showVideos(idVideo: number) {
    this.HomeServices.showVideos(idVideo).subscribe(
      resp => {
        this.datoVideo = resp.videos;
        // console.log(this.datoVideo);

      },
      err => {

      }
    );
  }

  /**
   * reproducir
   */
  public reproducir(idVideo: number, nameVideo: string) {
    // console.log(idVideo);
    // console.log(nameVideo);
    this.router.navigate(['/videos', idVideo]);
  }

}
