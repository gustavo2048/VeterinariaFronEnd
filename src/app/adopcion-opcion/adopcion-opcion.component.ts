import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../modelo/Usuario';
import { Adopcion } from '../modelo/Adopcion';
import { AgregarAdopcionComponent } from '../agregar-adopcion/agregar-adopcion.component';
import { AgregarAdopcionFormularioComponent } from '../agregar-adopcion-formulario/agregar-adopcion-formulario.component';

@Component({
  selector: 'app-adopcion-opcion',
  templateUrl: './adopcion-opcion.component.html',
  styleUrls: ['./adopcion-opcion.component.css']
})
export class AdopcionOpcionComponent {

  usuario = new Usuario;



  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<AdopcionOpcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario){
      this.usuario = data;

  }



  onNoClick(): void {
    this.dialogRef.close();
  }


  public seleccionarMisMascotas(usuario: Usuario){

    const dialogRef = this.dialog.open(AgregarAdopcionComponent,{data: usuario},);
  
  
    dialogRef.afterClosed().subscribe(dato =>
      {         
        if (dato != undefined){
          this.dialogRef.close(dato);
        }
        
     })
     

  }

  public agregarNuevaMascota(usuario: Usuario){

    const dialogRef = this.dialog.open(AgregarAdopcionFormularioComponent,{data: usuario},); 
  
    dialogRef.afterClosed().subscribe(dato =>
      {         
        if (dato != undefined){
          this.dialogRef.close(dato);
        }
        
     })
     

  }

}
