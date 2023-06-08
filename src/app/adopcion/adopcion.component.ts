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

  adopcionesMias: Adopcion [] = [];
  adopcionesAjenas: Adopcion [] = [];
  adopciones: Adopcion [] = [];
  
  usuario = new Usuario;

  
  constructor(private adopcionService: AdopcionService,private authService: AuthService, private _snackBar: MatSnackBar, public dialog: MatDialog){
    this.usuario = JSON.parse(localStorage.getItem('user')!);   
  }

  mostrar(roles: string[]){
    return ( roles.includes(this.authService.usertype()));
  }

  ngOnInit(){     
    if (this.authService.getUserLogged() != null)
    {
      this.adopcionService.traerAdopcionesAjenas(this.usuario.id).subscribe(data  => {       
        this.adopcionesAjenas = data;       
        
      })    
     
      this.adopcionService.traerAdopcionesMias(this.usuario.id).subscribe(data  => {       
        this.adopcionesMias = data;       
       
      }) 
    }
    
 
    this.adopcionService.traerAdopciones().subscribe(data  => {       
      this.adopciones = data;       
      
    })    
   
  }

  esVerificado(): boolean{

    if (this.authService.getUserLogged() != null){
      return this.authService.getUserLogged().verificado
    }
    return false   

  }

  agregarAdopcion(usuario: Usuario): void {   
    if (this.authService.islogged() && this.authService.getUserLogged().verificado){
        const dialogRef = this.dialog.open(AgregarAdopcionComponent,{data: usuario},); 

        dialogRef.afterClosed().subscribe(dato =>
           {
             if(dato != undefined){
              this.adopcionesMias.push(dato) 
             }
          })
        
        this._snackBar.open("Se agregó la publicación con éxito", "Cerrar");

    }else{
      this._snackBar.open("Debe ir a la veterinaria para completar su registro", "Cerrar")
    }
     //EL AGREGAR ADOPCION
  }


  openDetalle(adopcion: Adopcion): void { 
    if (this.authService.islogged() && this.authService.getUserLogged().verificado ){
        const dialogRef = this.dialog.open(DetalleAdopcionComponent,{data: adopcion},);    
        dialogRef.afterClosed();
    } else if (this.authService.islogged()){
              this._snackBar.open("Debe ir a la veterinaria para completar su registro", "Cerrar");
            }else {
              this._snackBar.open("Debe registrarse para hacer uso de los servicios", "Cerrar");
            }
  }

    
 

}
