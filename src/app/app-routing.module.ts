import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes  de la rutas a realizar
import { HomeComponent } from './components/home/home.component';
import { AdmicionesComponent } from './components/admiciones/admiciones.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { InscribeteComponent } from './components/inscribete/inscribete.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, // Cuando inicia por primera vez
  { path: 'home', component: HomeComponent },
  { path: 'admicion', component: AdmicionesComponent },
  { path: 'acerca', component: AcercaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'inscribete', component: InscribeteComponent },
  { path: '**', component: HomeComponent }, // Cuando me equivoco de escribir la ruta.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
