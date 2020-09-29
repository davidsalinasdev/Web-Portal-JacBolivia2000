import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// librerias
// Rutas
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AdmicionesComponent } from './components/admiciones/admiciones.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { InscribeteComponent } from './components/inscribete/inscribete.component';

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
        InscribeteComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
