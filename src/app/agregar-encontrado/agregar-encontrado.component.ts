import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Encontrado } from '../modelo/Encontrado';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EncontradoService } from '../service/encontrado.service';

@Component({
  selector: 'app-agregar-encontrado',
  templateUrl: './agregar-encontrado.component.html',
  styleUrls: ['./agregar-encontrado.component.css']
})
export class AgregarEncontradoComponent {
  encontrado !:  Encontrado;
  

  fechaEncontrado: FormControl;
  lugar: FormControl;
  descripcion: FormControl;
  genero: FormControl;
  duenio:FormControl;

 


  constructor( private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<AgregarEncontradoComponent>,

    private encontradoService: EncontradoService) {    
      this.encontrado= new Encontrado();
      this.fechaEncontrado = new FormControl("",[Validators.required]);
      this.lugar = new FormControl("",[Validators.required]);
      this.genero = new FormControl("",[Validators.required])
      this.descripcion = new FormControl("",[Validators.required]);
     this.duenio = new FormControl("",[Validators.required]);
      
  }


  onNoClick(): void {
    
    this.dialogRef.close();
    console.log('aber')
  }



  agregarEncontrado() {
    
    if ( this.genero.valid && this.descripcion.valid && this.lugar.valid && this.fechaEncontrado.valid && this.duenio.valid ){
        this.encontrado.genero = this.genero.value;
        this.encontrado.descripcion = this.descripcion.value;
        this.encontrado.lugar = this.lugar.value;
        this.encontrado.fechaEncontrado= this.fechaEncontrado.value;    
        this.encontrado.duenio = this.duenio.value;      
      

        this.encontradoService.agregarEncontrado(this.encontrado).subscribe(dato =>
          {{console.log(dato)}
            if(dato.id != -1){
             
              this._snackBar.open("Se hizo la publicacion  con exito", "Cerrar");
              this.onNoClick()
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
