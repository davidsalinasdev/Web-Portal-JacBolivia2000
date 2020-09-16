import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

// jquery en angular
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    this.carrusel();
  }

  /**
   * carrusel
   */
  public carrusel() {
    $('.carousel').carousel({
      interval: 4000
    });
  }

}
