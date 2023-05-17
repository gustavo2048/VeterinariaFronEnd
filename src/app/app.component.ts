import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from './service/auth.service';
import { RegisterComponent } from './register/register.component';
import { CloseSesionComponent } from './close-sesion/close-sesion.component';
import { PerfilComponent } from './perfil/perfil.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ohMyDog';
  constructor(public dialog: MatDialog,public authService:AuthService) {}

  ngOnInit(){
    if (!this.authService.islogged()) {
      localStorage.setItem("rol","NOCLIENTE")
    }
  }
  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent);
  

    dialogRef.afterClosed().subscribe(result => {
     console.log(`Dialog result: ${result}`);
    });
  }
    openRegistrar() {
      const dialogRef = this.dialog.open(RegisterComponent);
    
  
      dialogRef.afterClosed().subscribe(result => {
       console.log(`Dialog result: ${result}`);
      });

    }
    closeSesion() {
      const dialogRef = this.dialog.open(CloseSesionComponent);
    
  
      dialogRef.afterClosed().subscribe(result => {
       console.log(`Dialog result: ${result}`);
      });

    }
  
  mostrar(roles: string[]){
    return ( roles.includes(this.authService.usertype()));
  }
  isLogged(){
    return this.authService.islogged();
  }
  }
