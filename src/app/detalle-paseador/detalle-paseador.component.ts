import { Component, Inject } from '@angular/core';
import { FormControl ,Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaseadorComponent } from '../paseador/paseador.component';
import { PaseadorService } from '../service/paseador.service';
import { Paseador } from '../modelo/Paseador';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-detalle-paseador',
  templateUrl: './detalle-paseador.component.html',
  styleUrls: ['./detalle-paseador.component.css']
})
export class DetallePaseadorComponent {
  deshabilitado = true;
  paseador!:Paseador;
  zona!:FormControl;
  horario!:FormControl;
  nombre!:FormControl;
  descripcion!:FormControl;
  email!:FormControl;
  disponible:boolean=true;
  msj:string;
  constructor(private authService: AuthService,private paseadorService: PaseadorService,private _snackBar: MatSnackBar, public dialog: MatDialog,public dialogRef: MatDialogRef<DetallePaseadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Paseador){

      this.paseador = data;
      this.zona = new FormControl({value: this.paseador.zonaTrabajo , disabled: true},[Validators.required]);
      this.descripcion = new FormControl({value: this.paseador.descripcion , disabled: true},[Validators.required]);
      this.horario = new FormControl({value:this.paseador.horarioTrabajo , disabled: true},[Validators.required])
      this.nombre = new FormControl({value: this.paseador.nombre , disabled: true},[Validators.required]);
      
      this.disponible = this.paseador.disponible;
      this.msj = "No hay disponibilidad del paseador";
      if (this.disponible){
        this.msj = "Esta disponible";
      }
      
      
      this.editarPublicacion();
  
  };
  yaFueEncontrado(){
    if(this.disponible == true){
      this.disponible = false;
      this.msj ="Esta disponible";      
    }else{
      this.disponible = true;
      this.msj = "No hay disponibilidad del paseador";
    }     
  }

  onNoClick(): void {
    this.dialogRef.close();
    
  }
  desHabilitar(){
    this.zona.disable();
    this.horario.disable();
    this.nombre.disable();
    this.descripcion.disable();
    this.deshabilitado = true;    
  }
  editarPublicacion(){     
    this.zona.enable();
    this.horario.enable();
    this.nombre.enable();
    this.descripcion.enable();
    this.deshabilitado = false;
  }
  
  
  enviarEdicion(){      
    if (this.descripcion.valid && this.nombre.valid && this.horario.valid && this.zona.valid){
        this.paseador.zonaTrabajo = this.zona.value;
        this.paseador.descripcion = this.descripcion.value;
        this.paseador.horarioTrabajo = this.horario.value;
        this.paseador.nombre = this.nombre.value;
        this.paseador.disponible= this.disponible;
        if(this.disponible == true){        
          this.msj = "Esta disponible";  
              
          }else{       
            this.msj =  "No hay disponibilidad del paseador";
          }   
        
       this.paseadorService.editarPaseador(this.paseador).subscribe(data =>   
       {this._snackBar.open('Se realizaron los cambios','Cerrar');
      }
       )
      
        this.desHabilitar();
        this.onNoClick();
    }
  }
  
  cancelarEdicion(){
    this.nombre = new FormControl({value: this.paseador.nombre , disabled: true},[Validators.required]);
    this.descripcion = new FormControl({value: this.paseador.descripcion , disabled: true},[Validators.required]);
    this.horario = new FormControl({value: this.paseador.horarioTrabajo , disabled: true},[Validators.required])
    this.zona = new FormControl({value: this.paseador.zonaTrabajo, disabled: true},[Validators.required]);
    this.disponible = this.paseador.disponible

    if(this.disponible == true){        
      this.msj = "Esta disponible";       
    }else{       
      this.msj = "No hay disponibilidad del paseador";
    }  
    this.desHabilitar();
  }

  mostrar(roles: string[]){
    return ( roles.includes(this.authService.usertype()));
  }
}
