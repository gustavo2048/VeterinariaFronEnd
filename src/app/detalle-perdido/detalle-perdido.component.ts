import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Perdido } from '../modelo/Perdido';
import { PerdidoService } from '../service/perdido.service';

@Component({
  selector: 'app-detalle-perdido',
  templateUrl: './detalle-perdido.component.html',
  styleUrls: ['./detalle-perdido.component.css']
})
export class DetallePerdidoComponent {
  deshabilitado = true;
  perdido!:Perdido;
  lugar!:FormControl;
  genero!:FormControl;
  fechaPerdido!:FormControl;
  descripcion!:FormControl;
  encontrado :boolean=false;
  minDate: Date;
  msj: string;
constructor(private authService: AuthService,private perdidoService: PerdidoService,private _snackBar: MatSnackBar, public dialog: MatDialog,public dialogRef: MatDialogRef<DetallePerdidoComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Perdido){

    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth()

    this.minDate = new Date(currentYear, currentMonth, currentDay);
    this.perdido = data;
    this.lugar = new FormControl({value: this.perdido.lugar , disabled: true},[Validators.required]);
    this.descripcion = new FormControl({value: this.perdido.descripcion , disabled: true},[Validators.required]);
    this.genero = new FormControl({value:this.perdido.genero , disabled: true},[Validators.required])
    this.fechaPerdido = new FormControl({value: this.perdido.fechaPerdido , disabled: true},[Validators.required]);
    
    this.msj = "Seguimos buscandolo";
    this.encontrado = this.perdido.encontrado
    if (this.encontrado){
      this.msj = "Ya encontro a su familia"
    }
    this.editarPublicacion();
 
  };
  

  onNoClick(): void {
    this.dialogRef.close();
    
  }
  IsDateValid(){
    let fechaActual = new Date()
    fechaActual.setHours(0, 0, 0, 0)
    if ((this.fechaPerdido.value <= fechaActual)) {
      //console.log('la fecha solicitada no puede ser menor a la fecha actual. Es invalida ')
      return false
    } else {
      //console.log('la fecha solicitada es valida ')
      return true
    }
  }
  yaFueEncontrado(){
    if(this.encontrado == true){
      this.encontrado = false;
      this.perdido.mascota.publicado=false;
      this.msj = "Ya encontro a su familia";      
    }else{
      this.encontrado = true;
      this.perdido.mascota.publicado=true;
      this.msj = "Seguimos buscandolo";
    }     
  }
  fechaValida() :boolean{
    let fechaActual= new Date()
     fechaActual.setHours(0, 0, 0, 0)
     if(this.fechaPerdido.value > fechaActual)
       return false
       else
         return true
      
   }
  desHabilitar(){
    this.lugar.disable();
    this.genero.disable();
    this.fechaPerdido.disable();
    this.descripcion.disable();
    this.deshabilitado = true;    
  }
  editarPublicacion(){     
      this.fechaPerdido.disable();
      this.genero.enable();
      this.lugar.enable();
      this.descripcion.enable();
      this.deshabilitado = false;
    }
  
  
  enviarEdicion(){      
    if (this.descripcion.valid && this.lugar.valid &&  this.fechaValida()){
      this.perdido.fechaPerdido = this.fechaPerdido.value;
      this.perdido.descripcion = this.descripcion.value;
      this.perdido.lugar = this.lugar.value;
      this.perdido.genero = this.genero.value;
       this.perdido.encontrado = this.encontrado;
       if(this.encontrado == true){  
        this.perdido.mascota.publicado=false;      
        this.msj = "Ya encontro a su familia";      
      }else{       
        this.perdido.mascota.publicado=true;
        this.msj ="Seguimos buscandolo";
      }  
        console.log(this.perdido)
       this.perdidoService.editarPerdido(this.perdido).subscribe(data =>  
        
       {console.log(data) 
        if(this.encontrado){
          data.mascota.publicado=false;
        }
        else{
          data.mascota.publicado=true;
        }
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
  cancelarEdicion(){
    this.genero = new FormControl({value: this.perdido.genero , disabled: true},[Validators.required]);
    this.descripcion = new FormControl({value: this.perdido.descripcion , disabled: true},[Validators.required]);
    this.lugar = new FormControl({value: this.perdido.lugar , disabled: true},[Validators.required])
    this.fechaPerdido = new FormControl({value: this.perdido.fechaPerdido
      , disabled: true},[Validators.required]);

      this.encontrado = this.perdido.encontrado;
      if(this.encontrado == true){      
        this.perdido.mascota.publicado=false;  
        this.msj = "Ya encontro a su familia";      
      }else{       
        this.perdido.mascota.publicado=true;
        this.msj = "Esperando a su familia";
      }   
    
  
    this.desHabilitar();
  }
  mostrar(roles: string[]){
    return ( roles.includes(this.authService.usertype()));
  }
}
