import { Component} from '@angular/core';
import {FormControl,FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../modelo/Usuario';
import { MatDialogRef } from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar.component';
import { Mascota } from '../modelo/Mascota';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    mascota: Mascota;
    mascCaracteristica : FormControl;
    mascRaza : FormControl;
    mascEdad: FormControl;
    mascNombre: FormControl;
    mascTamanio: FormControl;
    usuario : Usuario;
    apellido: FormControl;
    nombre: FormControl;
    dni: FormControl;
    tel:FormControl;
    email :  FormControl;
    contra : FormControl;
    
  
    constructor(private _formBuilder: FormBuilder,private _snackBar: MatSnackBar, private authService: AuthService,public dialogRef: MatDialogRef<RegisterComponent>) {
      this.mascota= new Mascota();
      
      this.usuario= new Usuario
      this.mascCaracteristica= new FormControl('',Validators.required);
      this.mascRaza= new FormControl('',Validators.required);
      this.mascEdad= new FormControl('',Validators.required);
      this.mascNombre= new FormControl('',Validators.required);
      this.mascTamanio= new FormControl('',Validators.required);
      this.nombre= new FormControl('',Validators.required);
      this.apellido= new FormControl('',Validators.required);
      this.dni= new FormControl('',Validators.required);
      this.tel =new FormControl('',Validators.required);
      this.email = new FormControl('', [Validators.required, Validators.email]);
      this.contra = new FormControl('',[Validators.required, Validators.minLength(4)])
    }
    
    
    validar(){

    }
    firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      apellido:['', Validators.required],
      dni: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      contra: ['', [Validators.required,Validators.minLength(4)]],
    });

    secondFormGroup = this._formBuilder.group({
      mascCaracteristica: ['',Validators.required],
      mascRaza: ['',Validators.required],
      mascEdad: ['',Validators.required],
      mascNombre: ['',Validators.required],
      mascTamanio: ['',Validators.required],
    });

    isLinear=true;




    openSnackBar(message: string, action: string) {
    
    }
  
    
    

    
    
  

    agregarMascota(){
     
      this.mascota.caracteristicas=this.mascCaracteristica.value;
      this.mascota.edad= this.mascEdad.value;
      this.mascota.nombre= this.mascNombre.value;
      this.mascota.raza= this.mascRaza.value;
      this.mascota.tamanio = this.mascTamanio.value;
      // this.authService.agregarMascota(this.mascota).subscribe(Rmascota=>
      //   {
      //     console.log(Rmascota)
      //     const mensaje ='Registro exitoso! ';
      //     if(Rmascota.id == -1) {// -1 porque el email ya existe en el sistema
      //       this._snackBar.open("El email ya esta registrado en el sistema", "Cerrar");
      //     }
      //     else{// distinto de -1 es que el usuario se registro correctamente
      //       //localStorage.setItem()
      //     }
      //     if(Rmascota.id != -2 && Rmascota.id != -1) {
      //       this._snackBar.open(mensaje,"Cerrar")
      //       localStorage.setItem('user',JSON.stringify(Rmascota))
      //       localStorage.setItem('rol',Rmascota.rol)
      //       localStorage.setItem('accessType',JSON.stringify(Rmascota.verificado))
      //       this.dialogRef.close()
            
      //     }
      //   }
      //   )
    }
    confirmarRegistro(){
    
     
      this.usuario.email = this.email.value;// porque hicimos esto??? no es un poco tedioso  todo? 
      this.usuario.password = this.contra.value;
      this.usuario.apellido= this.apellido.value;
      this.usuario.nombre= this.nombre.value;
      this.usuario.dni= this.dni.value;
      this.usuario.telefono= this.tel.value
      //Tenemos que agregar lo de las mascota?? quiza lo haga cuando termine esto
      this.authService.logIn(this.usuario).subscribe(Rusuario=>
        {
          console.log(Rusuario)
          const mensaje ='Registro exitoso! ';
          if(Rusuario.id == -1) {// -1 porque el email ya existe en el sistema
            this._snackBar.open("El email ya esta registrado en el sistema", "Cerrar");
          }
          else{// distinto de -1 es que el usuario se registro correctamente
            //localStorage.setItem()
          }
          if(Rusuario.id != -2 && Rusuario.id != -1) {
            this._snackBar.open(mensaje,"Cerrar")
            localStorage.setItem('user',JSON.stringify(Rusuario))
            localStorage.setItem('rol',Rusuario.rol)
            localStorage.setItem('accessType',JSON.stringify(Rusuario.verificado))
            this.dialogRef.close()
            
          }
        }
        )
    }
  }
  

