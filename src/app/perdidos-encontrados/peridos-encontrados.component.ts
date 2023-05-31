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
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-peridos-encontrados',
  templateUrl: './peridos-encontrados.component.html',
  styleUrls: ['./peridos-encontrados.component.css']
})
export class PeridosEncontradosComponent {
  usuario!:Usuario;
  perdidos: Perdido [] = [];
  perdidosMias: Perdido[]=[];
  perdidosOtros: Perdido []=[];
  perdido !:Perdido;
  encontrados: Encontrado []=[];
  encontradosMias: Encontrado []=[];
  encontradosOtros: Encontrado []=[];
  encontrado!:Encontrado;
  constructor(private encontradoService: EncontradoService,private perdidoService: PerdidoService,private authService: AuthService,private _snackBar: MatSnackBar,public dialog: MatDialog){
    this.usuario=JSON.parse(localStorage.getItem('user')!)

  }

  ngOnInit(){
    
    if(this.mostrar(['NOCLIENTE'])){
    this.perdidoService.traerPerdidos().subscribe(data  => {       
      this.perdidos = data;       
      console.log(data)
    })
    this.encontradoService.traerEncontrado().subscribe(data =>{
      this.encontrados=data;
    })
  }
  else{
    this.perdidoService.traerPerdidoMias(this.usuario.id).subscribe(data =>{
      this.perdidosMias=data;
    })
    this.perdidoService.traerPerdidoAjenas(this.usuario.id).subscribe(data => {
      this.perdidosOtros=data;

    })
    this.encontradoService.traerEncontradoAjenas(this.usuario.id).subscribe(data => {
      this.encontradosOtros=data;
    })
    this.encontradoService.traerEncontradoMias(this.usuario.id).subscribe(data => {
      this.encontradosMias=data;
    })
  }
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
         
          dialogRef.afterClosed().subscribe(data => {
            this.perdidosMias.push(data);
          })
    
 }
 agregarEncontrado(): void {   
  const dialogRef = this.dialog.open(AgregarEncontradoComponent)   
 
  dialogRef.afterClosed().subscribe(data => {
    this.encontradosMias.push(data);
  })

}
 mostrar(roles: string[]){
  return (roles.includes(this.authService.usertype()));
}

esVerificado(): boolean{

  if (this.authService.getUserLogged() != null){
    return this.authService.getUserLogged().verificado
  }
  return false   

}

}
