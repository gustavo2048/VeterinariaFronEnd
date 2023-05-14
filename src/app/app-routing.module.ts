import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TurnosSolicitudComponent } from './turnos-solicitud/turnos-solicitud.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component:  PerfilComponent },
  { path: 'registrar', component: RegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'perfil' },
  { path: 'turnos', component: TurnosSolicitudComponent }]
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
