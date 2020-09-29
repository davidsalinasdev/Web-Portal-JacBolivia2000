import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-defensa',
  templateUrl: './defensa.component.html',
  styleUrls: ['./defensa.component.css']
})
export class DefensaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      // left: 100,
      // behavior: 'smooth'
    });
  }

}
