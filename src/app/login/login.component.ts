import { Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../modelo/Usuario';
import { MatDialogRef } from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  usuario : Usuario;
  email :  FormControl;
  contra : FormControl;
  hide=true;
  constructor(private _snackBar: MatSnackBar, private authService: AuthService,public dialogRef: MatDialogRef<LoginComponent>, private router: Router) {
    this.usuario= new Usuario
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.contra = new FormControl('',[Validators.required, Validators.minLength(4)])
  }
  
  openSnackBar(message: string, action: string) {
   // this._snackBar.open(message, action);
  }

  desabilitarBoton(){
    return !this.email.valid || !this.contra.valid
  }

  Login(){
    
    this.usuario.email = this.email.value;
    this.usuario.password = this.contra.value;
   
    this.authService.logIn(this.usuario).subscribe(Rusuario=>
      {
        console.log(Rusuario)
        const mensaje =`Bienvenido, ${Rusuario.nombre}`;
        if(Rusuario.id == -1) {
          this._snackBar.open("Alguno de los datos es invalido", "Cerrar");
              
        }
        if (Rusuario.id == -2){
         
          this._snackBar.open("Alguno de los datos es invalido","Cerrar")

        }
        if(Rusuario.id != -2 && Rusuario.id != -1) {
          // this._snackBar.open(mensaje,"Cerrar")
          localStorage.setItem('user',JSON.stringify(Rusuario))
          localStorage.setItem('isLoggedIn','true')
          localStorage.setItem('rol',Rusuario.rol)
          localStorage.setItem('accessType',JSON.stringify(Rusuario.verificado))
          this.router.navigate(['/home']),
          this.dialogRef.close()
          
        }
      }
      )
  }
  
}
