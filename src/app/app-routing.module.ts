import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TurnosSolicitudComponent } from './turnos-solicitud/turnos-solicitud.component';
import { AdopcionComponent } from './adopcion/adopcion.component';
import { PaseadorComponent } from './paseador/paseador.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { ClinicaYSanitariaComponent } from './clinica-ysanitaria/clinica-ysanitaria.component';
import { CuidadosCaninosComponent } from './cuidados-caninos/cuidados-caninos.component';
import { PeridosEncontradosComponent } from './perdidos-encontrados/peridos-encontrados.component';
import { TurnosGestionComponent } from './turnos-gestion/turnos-gestion.component';
import { TurnosConfirmacionComponent } from './turnos-confirmacion/turnos-confirmacion.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'registrar', component: RegisterComponent },
  { path: 'paseadores', component: PaseadorComponent },
  { path: 'turnos', component: MisTurnosComponent },
  { path: 'perdidosyencontrados', component: PeridosEncontradosComponent },
  { path: 'cuidados', component: CuidadosCaninosComponent },
  { path: 'canino', component: ClinicaYSanitariaComponent },
  { path: 'adopciones', component: AdopcionComponent },
  { path: 'paseadores', component: PaseadorComponent },
  { path: 'gestionTurnos', component: TurnosGestionComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
