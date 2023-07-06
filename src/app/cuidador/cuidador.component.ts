import { Component, Inject, Renderer2 } from '@angular/core';
import { Cuidador } from '../modelo/Cuidador';
import { CuidadorService } from '../service/cuidador.service';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetalleCuidadorComponent } from '../detalle-cuidador/detalle-cuidador.component';
import { AgregarCuidadorComponent } from '../agregar-cuidador/agregar-cuidador.component';
import { FormControl, Validators } from '@angular/forms';
import { ContactoComponent } from '../contacto/contacto.component';

@Component({
  selector: 'app-cuidador',
  templateUrl: './cuidador.component.html',
  styleUrls: ['./cuidador.component.css']
})
export class CuidadorComponent {

  cuidadores: Cuidador [] = [];
  cuidador !:Cuidador;
  constructor(private cuidadorService: CuidadorService,private authService: AuthService,private _snackBar: MatSnackBar,public dialog: MatDialog
     
  ){       
    
  }

  ngOnInit(){
    
    this.cuidadorService.traerCuidadores().subscribe(data  => {       
      this.cuidadores = data;       
      console.log(data)
    })
    
  }

  openDetalle(cuidador: Cuidador): void { 
    console.log(cuidador)
    if (this.authService.islogged()){
      const dialogRef = this.dialog.open(DetalleCuidadorComponent,{data: cuidador},);    
      dialogRef.afterClosed();
    } else{
      this._snackBar.open("Debe ser cliente para hacer uso de los servicios", "Cerrar");
    }
  }

  agregarCuidador(): void {   
    const dialogRef = this.dialog.open(AgregarCuidadorComponent) 

    dialogRef.afterClosed().subscribe(dato =>{
      dato != undefined ? this.cuidadores.push(dato): NaN
      
    })

  }

  mostrar(roles: string[]){
    return ( roles.includes(this.authService.usertype()));
  }

  contactar(): void{
    if(this.authService.islogged() && this.authService.getUserLogged().verificado){
      const dialogRef = this.dialog.open(ContactoComponent,{data: "Contacto para comunicacion con Cuidador"});
      dialogRef.afterClosed().subscribe(result => {
      if (result != undefined){
        this._snackBar.open('Se envio el correo al cuidador exitosamente','Cerrar')
      }
      });
    }
    else{
      if(this.authService.islogged())
        this._snackBar.open('Debe ir a la veterinaria para completar su registro','Cerrar')
      else
        this._snackBar.open('Debe registrarse para hacer uso de los servicios','Cerrar')
    }
  }


}
