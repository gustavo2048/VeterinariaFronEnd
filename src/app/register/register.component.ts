import { Component} from '@angular/core';
import {FormControl,FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../modelo/Usuario';
import { MatDialogRef } from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar.component';
import { Mascota } from '../modelo/Mascota';
import { VeterinariaService } from '../service/veterinaria.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    // mascota: Mascota;
    usuario : Usuario;
    
    hide= true;
    firstFormGroup = this._formBuilder.group({
      Nombre: new FormControl ('', Validators.required),
      Apellido:new FormControl ('', Validators.required),
      Dni: new FormControl ('', Validators.required),
      Tel: new FormControl ('', Validators.required),
      Email: new FormControl('', [Validators.required,Validators.email]),
      Contra: new FormControl('', [Validators.required,Validators.minLength(4)]),
    });

    // secondFormGroup = this._formBuilder.group({
    //   mascCaracteristica: new FormControl(''),
    //   mascRaza: new FormControl(''),
    //   mascEdad: new FormControl(''),
    //   mascNombre: new FormControl(''),
    //   mascTamanio: new FormControl(''),
    // });

    isLinear=true;
  
    constructor(private VeterinariaService:VeterinariaService,private _formBuilder: FormBuilder,private _snackBar: MatSnackBar, private authService: AuthService,public dialogRef: MatDialogRef<RegisterComponent>) {
      // this.mascota= new Mascota();
      
      
      this.usuario= new Usuario();
      // this.mascCaracteristica= new FormControl('',Validators.required);
      // this.mascRaza= new FormControl('',Validators.required);
      // this.mascEdad= new FormControl('',Validators.required);
      // this.mascNombre= new FormControl('',Validators.required);
      // this.mascTamanio= new FormControl('',Validators.required);
      // // this.nombre= new FormControl('',Validators.required);
      // this.apellido= new FormControl('',Validators.required);
      // this.dni= new FormControl('',Validators.required);
      // this.tel =new FormControl('',Validators.required);
      // this.email = new FormControl('', [Validators.required, Validators.email]);
      // this.contra = new FormControl('',[Validators.required, Validators.minLength(4)])
    }
    
    
    
    




    openSnackBar(message: string, action: string) {
    
    }
  
    confirmarRegistro(){
      if(this.firstFormGroup.get('Nombre')?.valid && this.firstFormGroup.get('Email')?.valid && this.firstFormGroup.get('Apellido')?.valid && this.firstFormGroup.get('Dni')?.valid && this.firstFormGroup.get('Contra')?.valid && this.firstFormGroup.get('Tel')?.valid){
      
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
          let mensaje ='Registro exitoso! ';
          if(Rusuario.id == -1) {// -1 porque el email ya existe en el sistema
            this._snackBar.open("El DNI ya esta registrado en el sistema", "Cerrar");
          }
          if (Rusuario.id == -2 )
              this._snackBar.open("El email ya esta registrado en el sistema", "Cerrar");
          if(Rusuario.id == -3 )
            this._snackBar.open("El Usuario ya esta registrado en el sistema", "Cerrar");
          if(Rusuario.id !=-1 && Rusuario.id !=-2 && Rusuario.id !=-3) {
            
            this._snackBar.open(mensaje,"Cerrar")
            this.dialogRef.close()
              
            
            }
          
          });
        }
        


      
      //  
    }
  }
  

