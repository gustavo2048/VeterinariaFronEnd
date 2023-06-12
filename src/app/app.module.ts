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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { CloseSesionComponent } from './close-sesion/close-sesion.component';
import { DetalleMascotaComponent } from './detalle-mascota/detalle-mascota.component';
import { AdopcionComponent } from './adopcion/adopcion.component';
import { AgregarMascotaComponent } from './agregar-mascota/agregar-mascota.component';
import { PaseadorComponent } from './paseador/paseador.component';
import { DetalleAdopcionComponent } from './detalle-adopcion/detalle-adopcion.component';
import { AgregarAdopcionComponent } from './agregar-adopcion/agregar-adopcion.component';
import { DetallePaseadorComponent } from './detalle-paseador/detalle-paseador.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { AgregarPaseadorComponent } from './agregar-paseador/agregar-paseador.component';
import { ClinicaYSanitariaComponent } from './clinica-ysanitaria/clinica-ysanitaria.component';
import { CuidadosCaninosComponent } from './cuidados-caninos/cuidados-caninos.component';
import { PeridosEncontradosComponent } from './perdidos-encontrados/peridos-encontrados.component';
import { AgregarPerdidoComponent } from './agregar-perdido/agregar-perdido.component';
import { AgregarEncontradoComponent } from './agregar-encontrado/agregar-encontrado.component';
import { TurnosGestionComponent } from './turnos-gestion/turnos-gestion.component';
import { TurnosConfirmacionComponent } from './turnos-confirmacion/turnos-confirmacion.component';
import { DetalleEncontradoComponent } from './detalle-encontrado/detalle-encontrado.component';
import { DetallePerdidoComponent } from './detalle-perdido/detalle-perdido.component';
import { ContactoComponent } from './contacto/contacto.component';
import { NgxSpinnerModule } from 'ngx-spinner'
import { InterceptorService } from './service/interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,  
    PerfilComponent,
    TurnosSolicitudComponent,
    NavbarComponent,       
    CloseSesionComponent, DetalleMascotaComponent,
     AdopcionComponent, AgregarMascotaComponent, PaseadorComponent, 
     DetalleAdopcionComponent, DetallePaseadorComponent, MisTurnosComponent,
    AgregarAdopcionComponent,
    AgregarPaseadorComponent,
    ClinicaYSanitariaComponent,
    CuidadosCaninosComponent,
    PeridosEncontradosComponent,
    AgregarPerdidoComponent,
    AgregarEncontradoComponent,
    TurnosGestionComponent,
    TurnosConfirmacionComponent,
    DetalleEncontradoComponent,
    DetallePerdidoComponent,
    ContactoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,  
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [{
     provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { 


  ngOnInit(){
    localStorage.setItem("userType", "NOCLIENTE")
  }
}
