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
import { HttpClientModule } from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import { TurnosSolicitudComponent } from './turnos-solicitud/turnos-solicitud.component';
import { NavbarComponent } from './navbar/navbar.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,      
    HttpClientModule,  
    SharedModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
