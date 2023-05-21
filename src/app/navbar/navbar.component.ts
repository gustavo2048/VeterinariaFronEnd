import { Component, Renderer2,HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CloseSesionComponent } from '../close-sesion/close-sesion.component';
import { Usuario } from '../modelo/Usuario';
import { NavbarService } from '../service/navbar.service';

// import { Route } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title = 'ohMyDog';
  constructor(private navbarService: NavbarService,public dialog: MatDialog,public authService:AuthService,private renderer: Renderer2) {}

  onPaseadoresButtonClick() {
    this.navbarService.triggerPaseadoresButtonClick();
  }
  onAdopcionesButtonClick(){
    this.navbarService.triggerAdopcionesButtonClick();
  }
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
       //Me tiene que llevar al home
      });

    }
  
  mostrar(roles: string[]){
    return ( roles.includes(this.authService.usertype()));
  }
  isLogged(){
    return this.authService.islogged();
  }
  isVerificado(){
    return this.authService.getUserLogged();

  } 
  //scrollToSection() {
  //   const element = this.renderer.selectRootElement('#ultimas-publicaciones', true);
  //   element.scrollIntoView({ behavior: 'smooth' });
  // }



}
