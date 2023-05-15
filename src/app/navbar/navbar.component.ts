import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(private router: Router, private authService: AuthService) { }


  logedUser = localStorage.getItem('isLoggedIn') == "true";
  //typeUserCli = localStorage.getItem('rol') =='Cliente';
  //typeUserVet = localStorage.getItem('rol') =='Veterinario';
  ngOnInit(): void {
    this.logedUser = localStorage.getItem('isLoggedIn') == "true";
    //this.typeUserCli = localStorage.getItem('rol') =='Cliente';
    //this.typeUserVet = localStorage.getItem('rol') =='Veterinario';
  }

  logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  mostrar(roles: string[]) {
    return (this.authService.islogged() && roles.includes(this.authService.usertype()));
  }
  

  listar() {
    console.log(localStorage.getItem('isLoggedIn') === "true");
    this.router.navigate(["lista-vacunas"]);
  }



}
