import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';


// Componentes Angular Material
import { PerfilComponent } from './perfil/perfil.component';

import {SharedModule} from './shared/shared.module';
import { TurnosSolicitudComponent } from './turnos-solicitud/turnos-solicitud.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';


import { CloseSesionComponent } from './close-sesion/close-sesion.component';
import { DetalleMascotaComponent } from './detalle-mascota/detalle-mascota.component';
import { AdopcionComponent } from './adopcion/adopcion.component';
import { AgregarMascotaComponent } from './agregar-mascota/agregar-mascota.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,  
    PerfilComponent,
    TurnosSolicitudComponent,
    NavbarComponent,    
    CloseSesionComponent, DetalleMascotaComponent, AdopcionComponent, AgregarMascotaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 


  ngOnInit(){
    localStorage.setItem("userType", "NOCLIENTE")
  }
}
