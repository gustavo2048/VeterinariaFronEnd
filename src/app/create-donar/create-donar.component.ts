import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Tarjeta } from '../modelo/Tarjeta';
import { DonacionService } from '../service/donacion.service';
import { Usuario } from '../modelo/Usuario';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-create-donar',
  templateUrl: './create-donar.component.html',
  styleUrls: ['./create-donar.component.css']
})
export class CreateDonarComponent {
  usuarioId:Number;
  monto: FormControl;
  tarjeta!:Tarjeta;
  nombre:FormControl;
  fecha:FormControl;
  nroTarjeta:FormControl;
  codigo:FormControl;
  minDate:Date;
  constructor(private authService: AuthService, private tarj:DonacionService, private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<CreateDonarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario) { 
      if(data != null){
      this.usuarioId=data.id; 
    }else{
      this.usuarioId=-1;
    }
    console.log(this.usuarioId)
      this.tarjeta = new Tarjeta();
      const currentYear = new Date().getFullYear();
      const currentDay = new Date().getDate()
      const currentMonth = new Date().getMonth()
      this.minDate = new Date(currentYear, currentMonth, currentDay);
      this.fecha = new FormControl("",[Validators.required]);
      this.nombre = new FormControl("",[Validators.required]);
      this.nroTarjeta = new FormControl("",[Validators.required]); 
      this.codigo = new FormControl("",[Validators.required]); 
      this.monto = new FormControl("",[Validators.required,Validators.min(1000)]);
   
  }
  isLogged():boolean{
    return this.authService.islogged();
  }
  donar(){
    if(this.monto.valid && this.nombre.valid && this.codigo.valid && this.fecha.valid && this.nroTarjeta.valid){
        this.tarjeta.usuarioId= this.usuarioId;
        this.tarjeta.codigo=this.codigo.value;
        this.tarjeta.fecha=this.fecha.value;
        this.tarjeta.nroTarjeta= this.nroTarjeta.value;
        this.tarjeta.monto=this.monto.value;
        this.tarjeta.nombre=this.nombre.value;
        this.tarj.tarjeta(this.tarjeta).subscribe(data => {
          if(data.id == -1){
            // fechas distintas
            this._snackBar.open("La fecha de las tarjetas es incorrecta", "Cancelar")
          }
          else if(data.id==-2){
          //codigo distinto
          this._snackBar.open("El codigo de la tarjeta es incorrecto", "Cancelar")
          }else if(data.id == -3){
            //monto cero
            this._snackBar.open("La tarjeta no posee monto disponible", "Cancelar")
          }else if(data.id == -4){
            //monto insuficiente
            this._snackBar.open("El monto deseado supera el monto de la tarjeta", "Cancelar")
          }
          else if(data.id == -5){
            //nro de tarjeta distinto
            this._snackBar.open("Numero de tarjeta incorrecta", "Cancelar")
          }
          else{
          if(this.isLogged()){
          this._snackBar.open("La donacion se hizo correctamente! En tu proximo turno de la veterinaria tendras un descuento", "Cancelar")
          this.dialogRef.close()
          }
          else{
            this._snackBar.open("La donacion se hizo correctamente ", "Cancelar")
            this.dialogRef.close()
          }
        }
        })
    }
    else{
      this._snackBar.open("Debe completar los datos solicitados", "Cancelar")
    }
      
    }
    IsDateValid(){
      let fechaActual = new Date()
      fechaActual.setHours(0, 0, 0, 0)
  
      if ((this.fecha.value <= fechaActual) && this.fecha.value != "") {
        //console.log('la fecha solicitada no puede ser m enor a la fecha actual. Es invalida ')
        return true
      } else {
        //console.log('la fecha solicitada es valida ')
        return false
      }
    }
  onNoClick(): void {
    
    this.dialogRef.close();
    console.log('aber')
  }
}
