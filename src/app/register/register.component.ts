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
    
    
    firstFormGroup = this._formBuilder.group({
      Nombre: new FormControl ('', Validators.required),
      Apellido:new FormControl ('', Validators.required),
      Dni: new FormControl ('', Validators.required),
      Tel: new FormControl ('', Validators.required),
      Email: new FormControl('', [Validators.required,Validators.email]),
      Contra: new FormControl('', [Validators.required,Validators.minLength(4)]),
    });

    secondFormGroup = this._formBuilder.group({
      mascCaracteristica: [''],
      mascRaza: [''],
      mascEdad: [''],
      mascNombre: [''],
      mascTamanio: [''],
    });

    isLinear=true;
  
    constructor(private _formBuilder: FormBuilder,private _snackBar: MatSnackBar, private authService: AuthService,public dialogRef: MatDialogRef<RegisterComponent>) {
      this.mascota= new Mascota();
      
      this.usuario= new Usuario
      this.mascCaracteristica= new FormControl('',Validators.required);
      this.mascRaza= new FormControl('',Validators.required);
      this.mascEdad= new FormControl('',Validators.required);
      this.mascNombre= new FormControl('',Validators.required);
      this.mascTamanio= new FormControl('',Validators.required);
      // this.nombre= new FormControl('',Validators.required);
      // this.apellido= new FormControl('',Validators.required);
      // this.dni= new FormControl('',Validators.required);
      // this.tel =new FormControl('',Validators.required);
      // this.email = new FormControl('', [Validators.required, Validators.email]);
      // this.contra = new FormControl('',[Validators.required, Validators.minLength(4)])
    }
    
    
    
    




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
  
      this.mascota.caracteristicas=this.mascCaracteristica.value;
      this.mascota.edad= this.mascEdad.value;
      this.mascota.nombre= this.mascNombre.value;
      this.mascota.raza= this.mascRaza.value;
      this.mascota.tamanio = this.mascTamanio.value;
      // this.authService.agregarMascota(this.mascota).subscribe(Rmascosta=>
      //   {
      //     if(this.Rmascota == null)
      //     this._snackBar.open("Recorda que para utilizar los servicios de la veterinaria tendras que registrar un perro", "Cerrar");
        
      //   }
      // )
      const emailValue = this.firstFormGroup.get('Email')?.value;
      this.usuario.email=  emailValue != undefined ? emailValue: '';
      
      const nombreValue = this.firstFormGroup.get('Nombre')?.value;
      this.usuario.nombre=  nombreValue != undefined ? nombreValue: '';

      const apellidoValue = this.firstFormGroup.get('Apellido')?.value;
      this.usuario.apellido=  apellidoValue != undefined ? apellidoValue: '';

      const contraValue = this.firstFormGroup.get('Contra')?.value;
      this.usuario.password=  contraValue != undefined ? contraValue: '';

      const telValue = this.firstFormGroup.get('Tel')?.value;
      this.usuario.telefono=  telValue != undefined ? parseInt(telValue,10):NaN;

      const dniValue = this.firstFormGroup.get('Dni')?.value;
      this.usuario.dni=  dniValue != undefined ? parseInt(dniValue,10): NaN;
      console.log(this.usuario);
      //Tenemos que agregar lo de las mascota?? quiza lo haga cuando termine esto
      this.authService.registrar(this.usuario).subscribe(Rusuario=>
        {
          // console.log(Rusuario);
          const mensaje ='Registro exitoso! ';
          if(Rusuario.id == -1) {// -1 porque el email ya existe en el sistema
            this._snackBar.open("El DNI ya esta registrado en el sistema", "Cerrar");
          }
          if (Rusuario.id == -2 )
              this._snackBar.open("El Email ya esta registrado en el sistema", "Cerrar");
          if(Rusuario.id == -3 )
            this._snackBar.open("El Usuario ya esta registrado en el sistema", "Cerrar");
          if(Rusuario.id !=-1 && Rusuario.id !=-2 && Rusuario.id !=-3) {
            this._snackBar.open(mensaje,"Cerrar")
            
            
          }
          this.dialogRef.close()
        }
        )
    }
  }
  

