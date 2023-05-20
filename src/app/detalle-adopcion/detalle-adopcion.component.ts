import { Component, Inject } from '@angular/core';
import { Adopcion } from '../modelo/Adopcion';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { VeterinariaService } from '../service/veterinaria.service';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-detalle-adopcion',
  templateUrl: './detalle-adopcion.component.html',
  styleUrls: ['./detalle-adopcion.component.css']
})
export class DetalleAdopcionComponent {


  deshabilitado = true;

  adopcion = new Adopcion();
  usuario  = new Usuario();

  tit: FormControl
  desc: FormControl;
  mot: FormControl;
  obs: FormControl;
  adoptado: boolean;

  adopcionUsId: number;
  UsId: number;

  msj: string;



  constructor( private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<DetalleAdopcionComponent>,
     @Inject(MAT_DIALOG_DATA) public data: Adopcion,  private veterinariaService: VeterinariaService) {
      

      this.adopcion = data;
      this.usuario = JSON.parse(localStorage.getItem('user')!);  

      this.adopcionUsId = this.adopcion.usuarioId;
      this.UsId = this.usuario.id;

      this.msj = "Esperando ser adoptado";
     
      this.tit = new FormControl({value: this.adopcion.titulo , disabled: true},[Validators.required]);
      this.desc = new FormControl({value: this.adopcion.descripcion , disabled: true},[Validators.required]);
      this.mot = new FormControl({value: this.adopcion.motivo , disabled: true},[Validators.required])
      this.obs = new FormControl({value: this.adopcion.observacion , disabled: true},[Validators.required]);
      this.adoptado = this.adopcion.adoptado;
      
     }

    onNoClick(): void {
      this.dialogRef.close();
    }

    contactar(){
      this._snackBar.open("Su contacto NO se ha realizado, porque no esta desarrollada la funcionalidad", "Cerrar");
    }

    yaFueAdoptado(){
      if(this.adoptado == true){
        this.adoptado = false;
        this.msj = "Ya fue adoptado";      
      }else{
        this.adoptado = true;
        this.msj = "Esperando ser adoptado";
      }     
    }


    desHabilitar(){
      this.tit.disable();
      this.desc.disable();
      this.mot.disable();
      this.obs.disable();
      this.deshabilitado = true;    
    }
    editarPublicacion(){     
        this.tit.enable();
        this.desc.enable();
        this.mot.enable();
        this.obs.enable();
        this.deshabilitado = false;
      }
    
    
    enviarEdicion(){      
      if (this.tit.valid && this.desc.valid && this.mot.valid && this.obs.valid){
          this.adopcion.titulo = this.tit.value;
          this.adopcion.descripcion = this.desc.value;
          this.adopcion.motivo = this.mot.value;
          this.adopcion.observacion = this.obs.value;
          this.adopcion.adoptado = this.adoptado;
          if(this.adoptado == true){        
            this.msj = "Ya fue adoptado";      
          }else{       
            this.msj = "Esperando ser adoptado";
          }   
          
          //enviar

          this.desHabilitar();
      }
    }
    cancelarEdicion(){
      this.tit = new FormControl({value: this.adopcion.titulo , disabled: true},[Validators.required]);
      this.desc = new FormControl({value: this.adopcion.descripcion , disabled: true},[Validators.required]);
      this.mot = new FormControl({value: this.adopcion.motivo , disabled: true},[Validators.required])
      this.obs = new FormControl({value: this.adopcion.observacion , disabled: true},[Validators.required]);
      this.adoptado = this.adopcion.adoptado;
      if(this.adoptado == true){        
        this.msj = "Ya fue adoptado";      
      }else{       
        this.msj = "Esperando ser adoptado";
      }   
      

      this.desHabilitar();
    }


}
