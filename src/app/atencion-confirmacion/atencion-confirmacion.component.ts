import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Descuento } from '../atencion/atencion.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-atencion-confirmacion',
  templateUrl: './atencion-confirmacion.component.html',
  styleUrls: ['./atencion-confirmacion.component.css']
})
export class AtencionConfirmacionComponent {

  total: number

  constructor(private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: Descuento, public dialogRef: MatDialogRef<AtencionConfirmacionComponent>){
    this.total = data.monto - data.descuento
    if(this.total <= 0){
      this.total = 0
    }
  }

  confirmacion(){
     this._snackBar.open("Se a registrado correctamente la atencion.", "Cerrar",{duration: 6000,});
     this.dialogRef.close(true);
  }

}
