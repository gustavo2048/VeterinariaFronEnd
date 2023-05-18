import { Component, TrackByFunction, Inject} from '@angular/core';
import { Usuario } from '../modelo/Usuario';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { VeterinariaService } from '../service/veterinaria.service';
import { Mascota } from '../modelo/Mascota';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


import { DetalleMascotaComponent } from '../detalle-mascota/detalle-mascota.component';




@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})


export class PerfilComponent {

    
  usuario = new Usuario(); 
  mascotas: Mascota[] = [];
  deshabilitado = true; 

  nom: FormControl;
  ape: FormControl;
  tel: FormControl;
  dn: FormControl;
 
  
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private veteriariaService: VeterinariaService, private authService: AuthService) {
      
    this.usuario = JSON.parse(localStorage.getItem('user')!);    
    
    this.nom = new FormControl({value: this.usuario.nombre, disabled: true}, [Validators.required]);
    this.ape = new FormControl({value: this.usuario.apellido, disabled: true},[Validators.required]);
    this.tel = new FormControl({value: this.usuario.telefono, disabled: true},[Validators.required]);
    this.dn = new FormControl({value: this.usuario.dni, disabled: true},[Validators.required]);    
  }

  ngOnInit(){           
 
      this.veteriariaService.traerMascotas(this.usuario.id).subscribe(data  => {         
        this.mascotas = data;       
      })        
  }

  desHabilitar(){
    this.nom.disable();
    this.ape.disable();
    this.dn.disable();
    this.tel.disable();
    this.deshabilitado = true;    
  }

  editarPerfil(){
    this.nom.enable();
    this.ape.enable();
    this.dn.enable();
    this.tel.enable();
    this.deshabilitado = false;
  }
  enviarEdicion(){ 
    if (this.nom.valid && this.ape.valid && this.tel.valid && this.dn.valid){
      this.usuario.nombre = this.nom.value;
      this.usuario.apellido = this.ape.value;
      this.usuario.telefono = this.tel.value;
      this.usuario.dni = this.dn.value;
      
      this.authService.editarPerfil(this.usuario).subscribe(dato => {console.log(dato)
      if (dato.id != -2){
          localStorage.setItem('user',JSON.stringify(this.usuario))
          localStorage.setItem('isLoggedIn','true')
          localStorage.setItem('rol',this.usuario.rol)
          localStorage.setItem('accessType',JSON.stringify(this.usuario.verificado))
          this.desHabilitar();
      }else{
        this._snackBar.open("El dni ya existe", "Cerrar");
        }
         });
    }
    
    
  }

  cancelarEdicion(){    
    this.nom = new FormControl({value: this.usuario.nombre, disabled: true}, [Validators.required]);
    this.ape = new FormControl({value: this.usuario.apellido, disabled: true},[Validators.required]);
    this.tel = new FormControl({value: this.usuario.telefono, disabled: true},[Validators.required]);
    this.dn = new FormControl({value: this.usuario.dni, disabled: true},[Validators.required]);
    this.desHabilitar();
    
  }

   openDetalle(mascota: Mascota): void {    
      mascota.usuarioId = this.usuario.id;
       const dialogRef = this.dialog.open(DetalleMascotaComponent,{data: mascota});    
       dialogRef.afterClosed();
   }
}




