import { Component, Inject } from '@angular/core';
import { FormControl ,Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaseadorComponent } from '../paseador/paseador.component';
import { PaseadorService } from '../service/paseador.service';
import { Paseador } from '../modelo/Paseador';

@Component({
  selector: 'app-detalle-paseador',
  templateUrl: './detalle-paseador.component.html',
  styleUrls: ['./detalle-paseador.component.css']
})
export class DetallePaseadorComponent {
  paseador!:Paseador;
zona!:FormControl;
horario!:FormControl;
nombre!:FormControl;
descripcion!:FormControl;
email!:FormControl;

constructor(private paseadorService: PaseadorService,private _snackBar: MatSnackBar, public dialog: MatDialog,public dialogRef: MatDialogRef<DetallePaseadorComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Paseador){

    this.paseador = data;
    this.zona = new FormControl({value: this.paseador.zonaTrabajo , disabled: true},[Validators.required]);
    this.descripcion = new FormControl({value: this.paseador.descripcion , disabled: true},[Validators.required]);
    this.horario = new FormControl({value:this.paseador.horarioTrabajo , disabled: true},[Validators.required])
    this.nombre = new FormControl({value: this.paseador.nombre , disabled: true},[Validators.required]);
   
 
  };
  

  onNoClick(): void {
    this.dialogRef.close();
  }

}
