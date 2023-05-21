import { Component } from '@angular/core';
import { Adopcion } from '../modelo/Adopcion';
import { AdopcionService } from '../service/adopcion.service';
import { DetalleAdopcionComponent } from '../detalle-adopcion/detalle-adopcion.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../service/auth.service';
import { Usuario } from '../modelo/Usuario';
import { AgregarAdopcionComponent } from '../agregar-adopcion/agregar-adopcion.component';

@Component({
  selector: 'app-adopcion',
  templateUrl: './adopcion.component.html',
  styleUrls: ['./adopcion.component.css']
})

export class AdopcionComponent {

  adopciones: Adopcion [] = [];
  usuario = new Usuario;

  
  constructor(private adopcionService: AdopcionService,private authService: AuthService, private _snackBar: MatSnackBar, public dialog: MatDialog){

    this.usuario = JSON.parse(localStorage.getItem('user')!);
   
  }


  ngOnInit(){
    this.adopcionService.traerAdopciones().subscribe(data  => {       
      this.adopciones = data;       
      console.log(data)
    })    
    
   
  }

  agregarAdopcion(usuario: Usuario): void {   
    if (this.authService.islogged() && this.authService.getUserLogged().verificado){
        const dialogRef = this.dialog.open(AgregarAdopcionComponent,{data: usuario},);     
        dialogRef.afterClosed();
    }else{
      this._snackBar.open("Debe ser cliente para hacer uso de los servicios", "Cerrar")
    }
     
  }


  openDetalle(adopcion: Adopcion): void { 
    console.log("entra")
    if (this.authService.islogged() && this.authService.getUserLogged().verificado ){
      const dialogRef = this.dialog.open(DetalleAdopcionComponent,{data: adopcion},);    
      dialogRef.afterClosed();
    } else{
      this._snackBar.open("Debe ser cliente para hacer uso de los servicios", "Cerrar");
    }

    
 }

}
