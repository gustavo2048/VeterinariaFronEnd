import { Injectable } from '@angular/core';
import { Usuario } from '../modelo/usuario';
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















logink(email: string, password:string) {
//     ///Modificar a usuario y contraseña no solo email

     return this.http.get<Usuario>(`${this.url}/existe/` + email).subscribe(
       usuario => {
         let encontrado = usuario;
         //Definir un tipo de llegada al front como el tipo de salida del BACKEND
         if (true) {
           // Verificar respuesta del backend
           // En caso correcto hacer el registro en el navegador del usuario que se logeo con los datos necesarios
          
           //localStorage.setItem('edad', this.calcularEdad(this.encontrado.fechaNacimiento) + "");
           ///console.log(encontrado.email);

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
     return localStorage.getItem('rol')!
   }


   logout(): void {
     localStorage.setItem('isLoggedIn', 'false');
     localStorage.removeItem('user');
   }

 }

// login(email: string, contrasenia: string): Observable<string> {
//   return this.http.get<Usuario[]>(`${this.url}?email=${email}&contrasenia=${contrasenia}`)
//     .pipe(
//       map(usuarios => {
//         if (usuarios.length > 0) {
//           return usuarios[0].email;
//         } else {
//           throw new Error('Email o contraseña invalida');
//         }
//       })
//     );
// }
 