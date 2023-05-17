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
import { DialogOverviewExampleDialog } from './perfil/perfil.component';
import {SharedModule} from './shared/shared.module';
import { TurnosSolicitudComponent } from './turnos-solicitud/turnos-solicitud.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CloseSesionComponent } from './close-sesion/close-sesion.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DialogOverviewExampleDialog,
    PerfilComponent,
    TurnosSolicitudComponent,
    NavbarComponent,
    CloseSesionComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 


  ngOnInit(){
    localStorage.setItem("userType", "NOCLIENTE")
  }
}
