import { Component } from '@angular/core';
import { Adopcion } from '../modelo/Adopcion';
import { AdopcionService } from '../service/adopcion.service';
import { DetalleAdopcionComponent } from '../detalle-adopcion/detalle-adopcion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-adopcion',
  templateUrl: './adopcion.component.html',
  styleUrls: ['./adopcion.component.css']
})

export class AdopcionComponent {

  adopciones: Adopcion [] = [];
  
  constructor(private adopcionService: AdopcionService, private _snackBar: MatSnackBar, public dialog: MatDialog){

  }
  ngOnInit(){
    this.adopcionService.traerAdopciones().subscribe(data  => {       
      this.adopciones = data;       
      console.log(data)
    })    
  }

  openDetalle(adopcion: Adopcion): void {    
   
    const dialogRef = this.dialog.open(DetalleAdopcionComponent,{data: adopcion},);    
    dialogRef.afterClosed();
 }

}
