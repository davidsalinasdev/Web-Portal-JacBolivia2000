import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes  de la rutas a realizar
import { HomeComponent } from './components/home/home.component';
import { AdmicionesComponent } from './components/admiciones/admiciones.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { InscribeteComponent } from './components/inscribete/inscribete.component';
import { HomeCarreraComponent } from './components/home-carrera/home-carrera.component';
import { CarreraComponent } from './components/carrera/carrera.component';
import { HomeNoticiasComponent } from './components/home-noticias/home-noticias.component';
import { DefensasComponent } from './components/defensas/defensas.component';
import { AgasajosComponent } from './components/agasajos/agasajos.component';
import { ReflexionesComponent } from './components/reflexiones/reflexiones.component';
import { VideosComponent } from './components/videos/videos.component';
import { FormularioInscripcionComponent } from './components/inscribete/formulario-inscripcion/formulario-inscripcion.component';
import { GraciasComponent } from './components/inscribete/gracias/gracias.component';



const routes: Routes = [
  { path: '', component: HomeComponent }, // Cuando inicia por primera vez
  { path: 'home', component: HomeComponent },
  { path: 'admicion', component: AdmicionesComponent },
  { path: 'acerca', component: AcercaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'inscribete', component: InscribeteComponent },
  { path: 'inscripcion', component: FormularioInscripcionComponent },
  { path: 'gracias', component: GraciasComponent },
  { path: 'reflexiones', component: ReflexionesComponent },
  { path: 'videos/:id', component: VideosComponent },

  { path: 'defensas/:id', component: DefensasComponent },
  { path: 'carreras/:id', component: CarreraComponent },
  { path: 'homeNoticias/:id', component: HomeNoticiasComponent },
  { path: 'agasajos/:id', component: AgasajosComponent },
  { path: '**', component: HomeComponent }, // Cuando me equivoco de escribir la ruta.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
