import { Injectable } from '@angular/core';
import { Usuario } from '../modelo/Usuario';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
//import { LoginComponent } from './login/login.component';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  url = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient, private router: Router) { }




logIn(user:Usuario){
  return this.http.post<Usuario>(`${this.url}/Login`,user)

  
}
registrar(user:Usuario){
  return this.http.post<Usuario>(`${this.url}/Registrar`,user)
}

editarPerfil(user: Usuario){
  return this.http.post<Usuario>(`${this.url}/editarPerfil`,user)
}




//Funciones del SISTEMA

getUserLogged():Usuario{
  return JSON.parse(localStorage.getItem('user')!);   
}


islogged() {
     // Verificar si tengo logeado a un usuario
     return localStorage.getItem('isLoggedIn') == 'true';
}

usertype() {
   // Tipo de usuario logeado en el sistema
   return localStorage.getItem('rol')!
}

logout(): void {
   localStorage.setItem('isLoggedIn', 'false');
   localStorage.removeItem('user');
}




}
