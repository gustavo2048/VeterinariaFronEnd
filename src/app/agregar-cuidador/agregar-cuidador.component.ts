import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cuidador } from '../modelo/Cuidador';
import { FormControl, Validators } from '@angular/forms';
import { CuidadorService } from '../service/cuidador.service';


@Component({
  selector: 'app-agregar-cuidador',
  templateUrl: './agregar-cuidador.component.html',
  styleUrls: ['./agregar-cuidador.component.css']
})
export class AgregarCuidadorComponent {

  cuidador !:  Cuidador;
  
  disponible:boolean=true;
  nombre: FormControl;
  email: FormControl;
  descripcion: FormControl;
  zona: FormControl;
  horario:FormControl;



  constructor( private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<AgregarCuidadorComponent>,

    private cuidadorService: CuidadorService) {    
      this.cuidador = new Cuidador();
      this.nombre = new FormControl("",[Validators.required]);
      this.email = new FormControl("",[Validators.required,Validators.email]);
      this.zona = new FormControl("",[Validators.required])
      this.descripcion = new FormControl("",[Validators.required]);
      this.horario = new FormControl("",[Validators.required]);
      
  }

  onNoClick(): void {    
    this.dialogRef.close();
  }

  agregarCuidador() {
    
    if ( this.nombre.valid && this.descripcion.valid && this.horario.valid && this.email.valid && this.zona.valid){       
      this.cuidador.nombre = this.nombre.value;
      this.cuidador.descripcion = this.descripcion.value;
      this.cuidador.horarioTrabajo = this.horario.value;
      this.cuidador.email= this.email.value;    
      this.cuidador.zonaTrabajo = this.zona.value;      
      this.cuidador.disponible=this.disponible;

      this.cuidadorService.agregarCuidador(this.cuidador).subscribe(dato =>
        {{console.log(dato)}
          if(dato.id != -1){
            
            this._snackBar.open("El cuidador se agregó con exito", "Cerrar");
            this.dialogRef.close(dato);
          }
          else{
            
            this._snackBar.open("El email del cuidador ya existe en el sistema", "Cerrar");
          }
        });

        //this.location.reload();
    } else{
      this._snackBar.open("Debe completar todos los campos", "Cerrar");
    }

  }


}
