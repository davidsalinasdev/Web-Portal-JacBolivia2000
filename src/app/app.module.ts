import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// Formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// librerias
import { NgxGalleryModule } from '@nomadreservations/ngx-gallery';

// Rutas
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// para editar
import { QuillModule } from 'ngx-quill';

// Recapcha para formulario
import { NgxCaptchaModule } from 'ngx-captcha';

// Mensajes de notificacion
import { ToastrModule } from 'ngx-toastr';

// Para subir archivos
import { AngularFileUploaderModule } from "angular-file-uploader";

// Angular material
import { MaterialModule } from './material/material.module';


import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AdmicionesComponent } from './components/admiciones/admiciones.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { InscribeteComponent } from './components/inscribete/inscribete.component';
import { HomeCarreraComponent } from './components/home-carrera/home-carrera.component';
import { CarreraComponent } from './components/carrera/carrera.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeNoticiasComponent } from './components/home-noticias/home-noticias.component';
import { DefensasComponent } from './components/defensas/defensas.component';
import { AgasajosComponent } from './components/agasajos/agasajos.component';
import { SanitizeHtmlPipe } from './pipes/SanitizeHtmlPipe.pipe';
import { ReflexionesComponent } from './components/reflexiones/reflexiones.component';
import { VideosComponent } from './components/videos/videos.component';
import { FormularioInscripcionComponent } from './components/inscribete/formulario-inscripcion/formulario-inscripcion.component';
import { GraciasComponent } from './components/inscribete/gracias/gracias.component';




@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        AdmicionesComponent,
        AcercaComponent,
        ContactoComponent,
        InscribeteComponent,
        HomeCarreraComponent,
        CarreraComponent,
        HomeNoticiasComponent,
        DefensasComponent,
        AgasajosComponent,
        SanitizeHtmlPipe,
        ReflexionesComponent,
        VideosComponent,
        FormularioInscripcionComponent,
        GraciasComponent

    ],
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxGalleryModule,
        FormsModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        NgxCaptchaModule,
        ToastrModule.forRoot(), // ToastrModule added
        AngularFileUploaderModule,
        MaterialModule,


    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
    bootstrap: [AppComponent],

})
export class AppModule { }
