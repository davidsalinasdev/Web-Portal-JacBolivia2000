import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agasajo',
  templateUrl: './agasajo.component.html',
  styleUrls: ['./agasajo.component.css']
})
export class AgasajoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      // left: 100,
      // behavior: 'smooth'
    });
  }

}
