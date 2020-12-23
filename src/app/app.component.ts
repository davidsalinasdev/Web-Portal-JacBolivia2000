import { AfterViewInit, Component, OnInit } from '@angular/core';
// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'academia';
  ngOnInit(): void {

    window.onload = () => {
      // alert('Cargado la pagina');
      $('#onload').fadeOut();
      $('body').removeClass('hidden');
      $('#navegacion').removeClass('d-none');
      // alert('La pagina se cargo correctamente ');

    };
  }
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
