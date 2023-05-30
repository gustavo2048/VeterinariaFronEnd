import { Component } from '@angular/core';
import { Perdido } from '../modelo/Perdido';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PerdidoService } from '../service/perdido.service';
import { AgregarPerdidoComponent } from '../agregar-perdido/agregar-perdido.component';
import { Encontrado } from '../modelo/Encontrado';
import { EncontradoService } from '../service/encontrado.service';
import { AgregarEncontradoComponent } from '../agregar-encontrado/agregar-encontrado.component';

@Component({
  selector: 'app-peridos-encontrados',
  templateUrl: './peridos-encontrados.component.html',
  styleUrls: ['./peridos-encontrados.component.css']
})
export class PeridosEncontradosComponent {
 
  perdidos: Perdido [] = [];
  perdido !:Perdido;
  encontrados: Encontrado []=[];
  encontrado!:Encontrado;
  constructor(private encontradoService: EncontradoService,private perdidoService: PerdidoService,private authService: AuthService,private _snackBar: MatSnackBar,public dialog: MatDialog){
    

  }

  ngOnInit(){
    
    this.perdidoService.traerPerdidos().subscribe(data  => {       
      this.perdidos = data;       
      console.log(data)
    })
    this.encontradoService.traerEncontrado().subscribe(data =>{
      this.encontrados=data;
    })
    
  }

  // scrollToSection() {
  //   const element = this.renderer.selectRootElement('#ultimas-publicaciones', true);
  //   element.scrollIntoView({ behavior: 'smooth' });
  // }
  openDetalle(perdido: Perdido): void { 
    
    // if (this.authService.islogged()){
    //   const dialogRef = this.dialog.open(DetallePaseadorComponent,{data: perdido},);    
    //   dialogRef.afterClosed();
    // } else{
    //   this._snackBar.open("Debe ser cliente para hacer uso de los servicios", "Cerrar");
    // }
  }
    agregarPerdido(): void {   
          const dialogRef = this.dialog.open(AgregarPerdidoComponent)   
         
          dialogRef.afterClosed()
    
 }
 agregarEncontrado(): void {   
  const dialogRef = this.dialog.open(AgregarEncontradoComponent)   
 
  dialogRef.afterClosed()

}
 mostrar(roles: string[]){
  return ( roles.includes(this.authService.usertype()));
}


}
