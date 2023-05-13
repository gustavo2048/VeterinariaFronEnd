import { Injectable } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  url = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient, private router: Router) { }



  login(email: string) {
    ///Modificar a usuario y contraseña no solo email

    return this.http.get<Usuario>(`${this.url}/existe/` + email).subscribe(
      usuario => {
        let encontrado = usuario;
        //Definir un tipo de llegada al front como el tipo de salida del BACKEND
        if (true) {
          // Verificar respuesta del backend
          // En caso correcto hacer el registro en el navegador del usuario que se logeo con los datos necesarios
          // this.authService.authLogin(this.model);
          // localStorage.setItem('idUsuario', encontrado.id + "");
          // localStorage.setItem('token', encontrado.email);

          //localStorage.setItem('edad', this.calcularEdad(this.encontrado.fechaNacimiento) + "");
          ///console.log(encontrado.email);

          //Registrar que tipo de usuario se logeo y almacenar
          localStorage.setItem('userType', "[Veterinario,UsuarioNormal]");

          //Registrar si es un usuario de acceso completo o no, se verifica con los datos del back
          localStorage.setItem('accessType', "[Total,Parcial]");

          // Almacenar si el usuario esta logeado 
          localStorage.setItem('isLoggedIn', "true");

          // Redireccionar a la siguente vista luego de Logearse
          this.router.navigate(['Home']);

        }
        else {

          // if (this.encontrado.token != this.token)
          //   this.tokenIncorrecto = false;
          // else
          //   this.aproved = false;
        }
      })


  }

  islogged() {
    // Verificar si tengo logeado a un usuario
    return localStorage.getItem('isLoggedIn') == "true";
  }

  usertype() {
    // Tipo de usuario logeado en el sistema
    return localStorage.getItem('userType')!
  }


  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
  }

}
