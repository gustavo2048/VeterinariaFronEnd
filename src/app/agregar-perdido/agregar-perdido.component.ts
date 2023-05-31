import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Perdido } from '../modelo/Perdido';
import { PerdidoService } from '../service/perdido.service';

@Component({
  selector: 'app-agregar-perdido',
  templateUrl: './agregar-perdido.component.html',
  styleUrls: ['./agregar-perdido.component.css']
})
export class AgregarPerdidoComponent {
  perdido !:  Perdido;
  

  fechaPerdido: FormControl;
  lugar: FormControl;
  descripcion: FormControl;
  genero: FormControl;
  encontrado:boolean=false;

 


  constructor( private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<AgregarPerdidoComponent>,

    private perdidoService: PerdidoService) {    
      this.perdido= new Perdido();
      this.fechaPerdido = new FormControl("",[Validators.required]);
      this.lugar = new FormControl("",[Validators.required]);
      this.genero = new FormControl("",[Validators.required])
      this.descripcion = new FormControl("",[Validators.required]);
   
      
  }


  onNoClick(): void {
    
    this.dialogRef.close();
    console.log('aber')
  }



  agregarPerdido() {
    
    if ( this.genero.valid && this.descripcion.valid && this.lugar.valid && this.fechaPerdido.valid ){
        this.perdido.genero = this.genero.value;
        this.perdido.descripcion = this.descripcion.value;
        this.perdido.lugar = this.lugar.value;
        this.perdido.fechaPerdido= this.fechaPerdido.value;    
            
      

        this.perdidoService.agregarPerdido(this.perdido).subscribe(dato =>
          {{console.log(dato)}
            
             
              this._snackBar.open("Se agrego la publicacion con exito", "Cerrar");
           
            
        
             
            
          });

        //this.location.reload();
    } else{
      this._snackBar.open("Debe completar todos los campos", "Cerrar");
    }

  }
}
