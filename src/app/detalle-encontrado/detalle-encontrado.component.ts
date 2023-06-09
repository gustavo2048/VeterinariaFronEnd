import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Encontrado } from '../modelo/Encontrado';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EncontradoService } from '../service/encontrado.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { parse, format } from 'date-fns';
@Component({
  selector: 'app-detalle-encontrado',
  templateUrl: './detalle-encontrado.component.html',
  styleUrls: ['./detalle-encontrado.component.css']
})
export class DetalleEncontradoComponent {
  deshabilitado = true;
  encontrado!:Encontrado;
lugar!:FormControl;
genero!:FormControl;
fechaEncontrado!:FormControl;
descripcion!:FormControl;
duenio:boolean=false;
minDate: Date;
fechaFormateada!:Date;
msj: string;
constructor(private authService: AuthService,private encontradoService: EncontradoService,private _snackBar: MatSnackBar, public dialog: MatDialog,public dialogRef: MatDialogRef<DetalleEncontradoComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Encontrado){

    const currentYear = new Date().getFullYear();
      const currentDay = new Date().getDate()
      const currentMonth = new Date().getMonth()

      this.minDate = new Date(currentYear, currentMonth, currentDay);
    this.encontrado = data;
    this.lugar = new FormControl({value: this.encontrado.lugar , disabled: true},[Validators.required]);
    this.descripcion = new FormControl({value: this.encontrado.descripcion , disabled: true},[Validators.required]);
    this.genero = new FormControl({value:this.encontrado.genero , disabled: true},[Validators.required])
    this.fechaEncontrado= new FormControl({value: this.encontrado.fechaEncontrado , disabled: true},[Validators.required]);
    
    this.msj = "Esperando a su familia";
    if (this.duenio){
      this.msj = "Ya encontro a su familia"
    }
     
    this.editarPublicacion();
 
  };
  

  onNoClick(): void {
    this.dialogRef.close();
    
  }
  yaFueEncontrado(){
    if(this.duenio == true){
      this.duenio = false;
      this.msj = "Ya encontro a su familia";      
    }else{
      this.duenio = true;
      this.msj = "Esperando a su familia";
    }     
  }

  desHabilitar(){
    this.lugar.disable();
    this.genero.disable();
    this.fechaEncontrado.disable();
    this.descripcion.disable();
    this.deshabilitado = true;    
  }
  editarPublicacion(){     
      this.fechaEncontrado.disable();
      this.genero.enable();
      this.lugar.enable();
      this.descripcion.enable();
      this.deshabilitado = false;
    }
  
  fechaValida() :boolean{
   let fechaActual= new Date()
    fechaActual.setHours(0, 0, 0, 0)
    if(this.fechaEncontrado.value > fechaActual)
      return false
      else
        return true
     
  }
  enviarEdicion(){      
    
    if (this.descripcion.valid && this.lugar.valid && this.genero.valid && this.fechaValida()){
      // this.fechaFormateada = format(this.fechaEncontrado, 'yyyy-MM-dd'
      
      this.encontrado.fechaEncontrado = this.fechaEncontrado.value;
        this.encontrado.descripcion = this.descripcion.value;
        this.encontrado.lugar = this.lugar.value;
        this.encontrado.genero = this.genero.value;
       this.encontrado.duenio= this.duenio;
       if(this.duenio == true){        
        this.msj = "Ya encontro a su familia";      
      }else{       
        this.msj = "Esperando a su familia";
      }   
       this.encontradoService.editarEncontrado(this.encontrado).subscribe(data =>  
        
       {console.log(data) 
        
        this._snackBar.open('Se realizaron los cambios','Cerrar');
      }
       )
      
        this.desHabilitar();
        this.onNoClick();
    }
    else{
      this._snackBar.open('La fecha debe ser menor a la actual', 'Cerrar')
    }
  }
  

  IsDateValid(){
    let fechaActual = new Date()
    fechaActual.setHours(0, 0, 0, 0)
    if ((this.fechaEncontrado.value <= fechaActual)) {
      //console.log('la fecha solicitada no puede ser menor a la fecha actual. Es invalida ')
      return false
    } else {
      //console.log('la fecha solicitada es valida ')
      return true
    }
  }
  cancelarEdicion(){
    this.genero = new FormControl({value: this.encontrado.genero , disabled: true},[Validators.required]);
    this.descripcion = new FormControl({value: this.encontrado.descripcion , disabled: true},[Validators.required]);
    this.lugar = new FormControl({value: this.encontrado.lugar , disabled: true},[Validators.required])
    this.fechaEncontrado = new FormControl({value: this.encontrado.fechaEncontrado
      , disabled: true},[Validators.required]);

      this.encontrado.duenio= this.duenio;
      if(this.duenio == true){        
        this.msj = "Ya encontro a su familia";      
      }else{       
        this.msj = "Esperando a su familia";
      }   
    
  
    this.desHabilitar();
  }
  mostrar(roles: string[]){
    return ( roles.includes(this.authService.usertype()));
  }
}
