import { Component, TrackByFunction, Inject} from '@angular/core';
import { Usuario } from '../modelo/Usuario';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { VeterinariaService } from '../service/veterinaria.service';
import { Mascota } from '../modelo/Mascota';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


import { DetalleMascotaComponent } from '../detalle-mascota/detalle-mascota.component';
import { AgregarMascotaComponent } from '../agregar-mascota/agregar-mascota.component';
import { HistoriaClinicaPerroComponent } from '../historia-clinica-perro/historia-clinica-perro.component';
import { LibretaSanitariaComponent } from '../libreta-sanitaria/libreta-sanitaria.component';




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
 
  
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private veterinariaService: VeterinariaService, private authService: AuthService) {
      
    this.usuario = JSON.parse(localStorage.getItem('user')!);    

    this.nom = new FormControl({value: this.usuario.nombre, disabled: true}, [Validators.required]);
    this.ape = new FormControl({value: this.usuario.apellido, disabled: true},[Validators.required]);
    this.tel = new FormControl({value: this.usuario.telefono, disabled: true},[Validators.required]);
    this.dn = new FormControl({value: this.usuario.dni, disabled: true},[Validators.required]);    
  }

  ngOnInit(){           
 
      this.veterinariaService.traerMascotas(this.usuario.id).subscribe(data  => {         
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
          this._snackBar.open("Su cambio se ha realizado con exito", "Cerrar");
      }else{
        this.usuario = JSON.parse(localStorage.getItem('user')!);    

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


  
  agregarMascota(usuario: Usuario): void {    
     const dialogRef = this.dialog.open(AgregarMascotaComponent,{ width: '600px',data: usuario},);    
 
     dialogRef.afterClosed().subscribe(dato =>
      {
        console.log(dato)
        if(dato != undefined){
          this.mascotas.push(dato) 
        }
     })
  }


   openDetalle(mascota: Mascota): void {    
      mascota.usuarioId = this.usuario.id;
      const dialogRef = this.dialog.open(DetalleMascotaComponent,{data: mascota});   
      
      dialogRef.afterClosed();
   }

   mostrar(){
    console.log("muestra dDETALLE")
   }

   openHistoriaClinica(mascota: Mascota){
    const dialogRef = this.dialog.open(HistoriaClinicaPerroComponent,{data: mascota});  
   }

   openLibretaSanitaria(mascota: Mascota){
    const dialogRef = this.dialog.open(LibretaSanitariaComponent,{data: mascota});  
   }


}




