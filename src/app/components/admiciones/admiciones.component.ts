import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admiciones',
  templateUrl: './admiciones.component.html',
  styleUrls: ['./admiciones.component.css']
})
export class AdmicionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      // left: 100,
      // behavior: 'smooth'
    });
  }

}
