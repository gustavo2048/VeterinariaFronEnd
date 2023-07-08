import { Component, Inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { DonacionAPerro } from '../modelo/DonacionAPerro';
import { DonacionPerroService } from '../service/donacion-perro.service';
import moment from 'moment';

@Component({
  selector: 'app-detalle-donacion-perro',
  templateUrl: './detalle-donacion-perro.component.html',
  styleUrls: ['./detalle-donacion-perro.component.css']
})
export class DetalleDonacionPerroComponent {
  deshabilitado = true;
  DonacionAPerro!:DonacionAPerro;
monto!:FormControl;
fechaLimite!:FormControl;
descripcion!:FormControl;
historia!:FormControl;
disponible:boolean=true;
maxDate: Date;
constructor(private authService: AuthService,private donacionPerro: DonacionPerroService,private _snackBar: MatSnackBar, public dialog: MatDialog,public dialogRef: MatDialogRef<DetalleDonacionPerroComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DonacionAPerro){
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth()

    this.maxDate = new Date(currentYear, currentMonth, currentDay);
    
    this.DonacionAPerro = data;
    this.monto = new FormControl({value: this.DonacionAPerro.monto , disabled: true},[Validators.required]);
    this.descripcion = new FormControl({value: this.DonacionAPerro.descripcion , disabled: true},[Validators.required]);
    this.fechaLimite = new FormControl({value:this.DonacionAPerro.fechaLimite , disabled: true},[Validators.required])
    this.historia = new FormControl({value: this.DonacionAPerro.historia , disabled: true},[Validators.required]);
    
   
     
    
    this.editarPublicacion();
 
  };
  
  IsDateValid(){
    let fechaActual = new Date()
    fechaActual.setHours(0, 0, 0, 0)
    if ((this.fechaLimite.value < fechaActual)) {
      //console.log('la fecha solicitada no puede ser menor a la fecha actual. Es invalida ')
      return true
    } else {
      //console.log('la fecha solicitada es valida ')
      return false
    }
  }

  Disponibilidad(){
    let fechaActual= new Date();
    fechaActual.setHours(0, 0, 0, 0)
    if(this.fechaLimite.value > fechaActual){
    return true
    }
    else{
      return false
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
    
  }
  desHabilitar(){
    this.monto.disable();
    this.fechaLimite.disable();
    this.historia.disable();
    this.descripcion.disable();
    this.deshabilitado = true;    
  }
  editarPublicacion(){     
      this.monto.enable();
      this.historia.enable();
      this.fechaLimite.enable();
      this.descripcion.enable();
      this.deshabilitado = false;
    }
  
 
  enviarEdicion(){      
    if (this.descripcion.valid && this.fechaLimite.valid && this.historia.valid && this.monto.valid){
        
        this.DonacionAPerro.fechaLimite = this.fechaLimite.value;
        console.log(this.DonacionAPerro.fechaLimite)
        this.DonacionAPerro.descripcion = this.descripcion.value;
        this.DonacionAPerro.historia = this.historia.value;
        this.DonacionAPerro.monto = this.monto.value;
      
       this.donacionPerro.editarDonacionPerro(this.DonacionAPerro).subscribe(data =>   
       {this._snackBar.open('Se realizaron los cambios','Cerrar');
      }
       )
      
        this.desHabilitar();
        this.onNoClick();
    }
  }
  cancelarEdicion(){
    this.fechaLimite = new FormControl({value: this.DonacionAPerro.fechaLimite , disabled: true},[Validators.required]);
    this.descripcion = new FormControl({value: this.DonacionAPerro.descripcion , disabled: true},[Validators.required]);
    this.monto = new FormControl({value: this.DonacionAPerro.monto , disabled: true},[Validators.required])
    this.historia = new FormControl({value: this.DonacionAPerro.historia
      , disabled: true},[Validators.required]);


     
  
    this.desHabilitar();
  }
  mostrar(roles: string[]){
    return ( roles.includes(this.authService.usertype()));
  }
}
