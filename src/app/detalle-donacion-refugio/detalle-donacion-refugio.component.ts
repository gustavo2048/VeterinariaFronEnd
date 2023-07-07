import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DonacionARefugio } from '../modelo/DonacionARefugio';
import { AuthService } from '../service/auth.service';
import { DonacionRefugioService } from '../service/donacion-refugio.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalle-donacion-refugio',
  templateUrl: './detalle-donacion-refugio.component.html',
  styleUrls: ['./detalle-donacion-refugio.component.css']
})
export class DetalleDonacionRefugioComponent {
  deshabilitado = true;
  DonacionARefugio!:DonacionARefugio;
monto!:FormControl;
fechaLimite!:FormControl;
contacto!:FormControl;
zona!:FormControl;
disponible:boolean=true;
maxDate: Date;
constructor(private authService: AuthService,private donacionRefugio: DonacionRefugioService,private _snackBar: MatSnackBar, public dialog: MatDialog,public dialogRef: MatDialogRef<DetalleDonacionRefugioComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DonacionARefugio){
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth()

    this.maxDate = new Date(currentYear, currentMonth, currentDay);
    
    this.DonacionARefugio = data;
    this.monto = new FormControl({value: this.DonacionARefugio.monto , disabled: true},[Validators.required]);
    this.zona = new FormControl({value: this.DonacionARefugio.zona , disabled: true},[Validators.required]);
    this.fechaLimite = new FormControl({value:this.DonacionARefugio.fechaLimite , disabled: true},[Validators.required])
    this.contacto = new FormControl({value: this.DonacionARefugio.contacto , disabled: true},[Validators.required]);
    
   
     
    
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
    this.zona.disable();
    this.contacto.disable();
    this.deshabilitado = true;    
  }
  editarPublicacion(){     
      this.monto.enable();
      this.contacto.enable();
      this.fechaLimite.enable();
      this.zona.enable();
      this.deshabilitado = false;
    }
  
  
  enviarEdicion(){      
    if (this.contacto.valid && this.fechaLimite.valid && this.zona.valid && this.monto.valid){
        
        this.DonacionARefugio.fechaLimite = this.fechaLimite.value;
        this.DonacionARefugio.contacto = this.contacto.value;
        this.DonacionARefugio.zona = this.zona.value;
        this.DonacionARefugio.monto = this.monto.value;
      
       this.donacionRefugio.editarDonacionesRefugio(this.DonacionARefugio).subscribe(data =>   
       {this._snackBar.open('Se realizaron los cambios','Cerrar');
      }
       )
      
        this.desHabilitar();
        this.onNoClick();
    }
  }
  cancelarEdicion(){
    this.fechaLimite = new FormControl({value: this.DonacionARefugio.fechaLimite , disabled: true},[Validators.required]);
    this.contacto = new FormControl({value: this.DonacionARefugio.contacto , disabled: true},[Validators.required]);
    this.monto = new FormControl({value: this.DonacionARefugio.monto , disabled: true},[Validators.required])
    this.zona = new FormControl({value: this.DonacionARefugio.zona
      , disabled: true},[Validators.required]);


     
  
    this.desHabilitar();
  }
  mostrar(roles: string[]){
    return ( roles.includes(this.authService.usertype()));
  }
}
