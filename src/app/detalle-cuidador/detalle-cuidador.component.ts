import { Component, Inject } from '@angular/core';
import { FormControl ,Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CuidadorComponent } from '../cuidador/cuidador.component';
import { CuidadorService } from '../service/cuidador.service';
import { Cuidador } from '../modelo/Cuidador';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-detalle-cuidador',
  templateUrl: './detalle-cuidador.component.html',
  styleUrls: ['./detalle-cuidador.component.css']
})
export class DetalleCuidadorComponent {
  deshabilitado = true;
  cuidador!:Cuidador;
  zona!:FormControl;
  horario!:FormControl;
  nombre!:FormControl;
  descripcion!:FormControl;
  email!:FormControl;
  disponible:boolean=true;
  msj:string;

  constructor(private authService: AuthService,private CuidadorService: CuidadorService,private _snackBar: MatSnackBar, public dialog: MatDialog,public dialogRef: MatDialogRef<DetalleCuidadorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cuidador){

      this.cuidador = data;
      this.zona = new FormControl({value: this.cuidador.zonaTrabajo , disabled: true},[Validators.required]);
      this.descripcion = new FormControl({value: this.cuidador.descripcion , disabled: true},[Validators.required]);
      this.horario = new FormControl({value:this.cuidador.horarioTrabajo , disabled: true},[Validators.required])
      this.nombre = new FormControl({value: this.cuidador.nombre , disabled: true},[Validators.required]);
      
      this.disponible = this.cuidador.disponible;
      this.msj = "No hay disponibilidad del cuidador";
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
      this.msj = "No hay disponibilidad del cuidador";
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
        this.cuidador.zonaTrabajo = this.zona.value;
        this.cuidador.descripcion = this.descripcion.value;
        this.cuidador.horarioTrabajo = this.horario.value;
        this.cuidador.nombre = this.nombre.value;
        this.cuidador.disponible= this.disponible;
        if(this.disponible == true){        
          this.msj = "Esta disponible";  
              
          }else{       
            this.msj =  "No hay disponibilidad del cuidador";
          }   
        
       this.CuidadorService.editarCuidador(this.cuidador).subscribe(data =>   
       {this._snackBar.open('Se realizaron los cambios','Cerrar');
      }
       )
      
        this.desHabilitar();
        this.onNoClick();
    }
  }
  cancelarEdicion(){
    this.nombre = new FormControl({value: this.cuidador.nombre , disabled: true},[Validators.required]);
    this.descripcion = new FormControl({value: this.cuidador.descripcion , disabled: true},[Validators.required]);
    this.horario = new FormControl({value: this.cuidador.horarioTrabajo , disabled: true},[Validators.required])
    this.zona = new FormControl({value: this.cuidador.zonaTrabajo, disabled: true},[Validators.required]);
    this.disponible = this.cuidador.disponible

    if(this.disponible == true){        
      this.msj = "Esta disponible";       
    }else{       
      this.msj = "No hay disponibilidad del cuidador";
    }  
    this.desHabilitar();
  }

  mostrar(roles: string[]){
    return ( roles.includes(this.authService.usertype()));
  }

}
