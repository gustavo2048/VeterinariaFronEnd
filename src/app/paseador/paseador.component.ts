import { Component, Renderer2 } from '@angular/core';
import { Paseador } from '../modelo/Paseador';
import { PaseadorService } from '../service/paseador.service';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetallePaseadorComponent } from '../detalle-paseador/detalle-paseador.component';

@Component({
  selector: 'app-paseador',
  templateUrl: './paseador.component.html',
  styleUrls: ['./paseador.component.css']
})

export class PaseadorComponent {

  paseadores: Paseador [] = [];
  
  constructor(private paseadorService: PaseadorService,private authService: AuthService,private _snackBar: MatSnackBar,public dialog: MatDialog){
    

  }

  ngOnInit(){
    
    this.paseadorService.traerPaseadores().subscribe(data  => {       
      this.paseadores = data;       
      console.log(data)
    })
    
  }

  // scrollToSection() {
  //   const element = this.renderer.selectRootElement('#ultimas-publicaciones', true);
  //   element.scrollIntoView({ behavior: 'smooth' });
  // }
  openDetalle(paseador: Paseador): void { 
    console.log(paseador)
    if (this.authService.islogged() ){
      const dialogRef = this.dialog.open(DetallePaseadorComponent,{data: paseador},);    
      dialogRef.afterClosed();
    } else{
      this._snackBar.open("Debe ser cliente para hacer uso de los servicios", "Cerrar");
    }

    
 }
}
