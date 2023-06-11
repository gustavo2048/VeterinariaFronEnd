import { Component, Inject, Version } from '@angular/core';
import { Adopcion } from '../modelo/Adopcion';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { Usuario } from '../modelo/Usuario';
import { AdopcionService } from '../service/adopcion.service';
import { ContactoComponent } from '../contacto/contacto.component';
import { VeterinariaService } from '../service/veterinaria.service';
import { Mascota } from '../modelo/Mascota';

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
  raz: FormControl;
  tam: FormControl;
  sex: FormControl;
  adoptado: boolean;

  adopcionUsId: number;
  UsId: number;

  msj: string;





  constructor( private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<DetalleAdopcionComponent>,
     @Inject(MAT_DIALOG_DATA) public data: Adopcion,  private adopcionService: AdopcionService, private veterinariaService: VeterinariaService) {
      

      this.adopcion = data;
      this.usuario = JSON.parse(localStorage.getItem('user')!);  
  

      this.adopcionUsId = this.adopcion.usuarioId;
      this.UsId = this.usuario.id;

      
     
      this.tit = new FormControl({value: this.adopcion.titulo , disabled: true},[Validators.required]);
      this.desc = new FormControl({value: this.adopcion.descripcion , disabled: true},[Validators.required]);
      this.mot = new FormControl({value: this.adopcion.motivo , disabled: true},[Validators.required])
      this.raz = new FormControl({value: this.adopcion.raza, disabled: true},[Validators.required]);
      this.tam = new FormControl({value: this.adopcion.tamanio , disabled: true},[Validators.required]);
      this.sex = new FormControl({value: this.adopcion.sexo , disabled: true},[Validators.required]);
      this.adoptado = this.adopcion.adoptado;
      this.msj = "Esperando ser adoptado";
      if (this.adoptado){
        this.msj = "Ya fue adoptado"
      }
      
      
     }


    onNoClick(): void {
      this.dialogRef.close();
    }

    contactar(){

      const dialogRef = this.dialog.open(ContactoComponent,{data: "Contacto por Adopcion de Perros"});

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

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
      this.sex.disable();
      this.tam.disable();
      this.raz.disable();
      this.deshabilitado = true;    
    }
    editarPublicacion(){     
        this.tit.enable();
        this.desc.disable();
        this.mot.enable();
        this.sex.disable();
        this.tam.disable()
        this.raz.disable()
        this.deshabilitado = false;
      }
    
    
    enviarEdicion(){      
      if (this.tit.valid && this.mot.valid ){
          this.adopcion.titulo = this.tit.value;
          this.adopcion.descripcion = this.desc.value;
          this.adopcion.motivo = this.mot.value;
          this.adopcion.raza = this.raz.value;
          this.adopcion.sexo = this.sex.value;
          this.adopcion.tamanio= this.tam.value;
          this.adopcion.adoptado = this.adoptado;
          if(this.adoptado == true){        
            this.msj = "Ya fue adoptado";    
            console.log(this.adopcion.mascotaId + 'esta es la id');
            this.veterinariaService.traerMascota(this.adopcion.mascotaId).subscribe(dato => {
             dato.borrado = true;
             console.log(dato)
             this.veterinariaService.editarMascota(dato).subscribe(dato => {console.log(dato)})
             
            })            
            
  
            
        
          }else{       
            this.msj = "Esperando ser adoptado";
          }   
          
          this.adopcionService.editarAdopcion(this.adopcion).subscribe(dato => {console.log("entraaa")});
          

          this.desHabilitar();
      }
    }
    cancelarEdicion(){
      this.tit = new FormControl({value: this.adopcion.titulo , disabled: true},[Validators.required]);
      this.desc = new FormControl({value: this.adopcion.descripcion , disabled: true},[Validators.required]);
      this.mot = new FormControl({value: this.adopcion.motivo , disabled: true},[Validators.required])
      this.raz = new FormControl({value: this.adopcion.raza, disabled: true},[Validators.required]);
      this.tam = new FormControl({value: this.adopcion.tamanio , disabled: true},[Validators.required]);
      this.sex = new FormControl({value: this.adopcion.sexo , disabled: true},[Validators.required]);
      this.adoptado = this.adopcion.adoptado;
      if(this.adoptado == true){        
        this.msj = "Ya fue adoptado";      
      }else{       
        this.msj = "Esperando ser adoptado";
      }   
      

      this.desHabilitar();
    }


}
