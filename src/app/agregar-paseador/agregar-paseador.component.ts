import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paseador } from '../modelo/Paseador';
import { FormControl, Validators } from '@angular/forms';
import { PaseadorService } from '../service/paseador.service';

@Component({
  selector: 'app-agregar-paseador',
  templateUrl: './agregar-paseador.component.html',
  styleUrls: ['./agregar-paseador.component.css']
})
export class AgregarPaseadorComponent {
  paseador !:  Paseador;
  
  disponible:boolean=true;
  nombre: FormControl;
  email: FormControl;
  descripcion: FormControl;
  zona: FormControl;
  horario:FormControl;

 


  constructor( private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<AgregarPaseadorComponent>,

    private paseadorService: PaseadorService) {    
      this.paseador= new Paseador();
      this.nombre = new FormControl("",[Validators.required]);
      this.email = new FormControl("",[Validators.required,Validators.email]);
      this.zona = new FormControl("",[Validators.required])
      this.descripcion = new FormControl("",[Validators.required]);
      this.horario = new FormControl("",[Validators.required]);
      
  }


  onNoClick(): void {    
    this.dialogRef.close();
  }



  agregarPaseador() {
    
    if ( this.nombre.valid && this.descripcion.valid && this.horario.valid && this.email.valid && this.zona.valid){       
      this.paseador.nombre = this.nombre.value;
      this.paseador.descripcion = this.descripcion.value;
      this.paseador.horarioTrabajo = this.horario.value;
      this.paseador.email= this.email.value;    
      this.paseador.zonaTrabajo = this.zona.value;      
      this.paseador.disponible=this.disponible;

      this.paseadorService.agregarPaseador(this.paseador).subscribe(dato =>
        {{console.log(dato)}
          if(dato.id != -1){
            
            this._snackBar.open("El paseador se agregó con exito", "Cerrar");
            this.dialogRef.close(dato);
          }
          else{
            
            this._snackBar.open("El email del paseador ya existe en el sistema", "Cerrar");
          }
        });

        //this.location.reload();
    } else{
      this._snackBar.open("Debe completar todos los campos", "Cerrar");
    }

  }
}
