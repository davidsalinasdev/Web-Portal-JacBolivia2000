import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscribete',
  templateUrl: './inscribete.component.html',
  styleUrls: ['./inscribete.component.css']
})
export class InscribeteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      // left: 100,
      // behavior: 'smooth'
    });
  }

}
