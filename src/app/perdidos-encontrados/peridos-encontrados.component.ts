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
import { DetallePerdidoComponent } from '../detalle-perdido/detalle-perdido.component';
import { DetalleEncontradoComponent } from '../detalle-encontrado/detalle-encontrado.component';
import { ContactoComponent } from '../contacto/contacto.component';

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
  encontradoId!:number;
  perdidoId!:number;
  
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
  openDetallePerdido(perdido: Perdido): void { 
  
    if (this.authService.islogged()){
      const dialogRef = this.dialog.open(DetallePerdidoComponent,{data: perdido},);    
      dialogRef.afterClosed();
    } else{
      this._snackBar.open("Debe ser cliente para hacer uso de los servicios", "Cerrar");
    }
  }
  openDetalleEncontrado(encontrado: Encontrado): void { 
    
    if (this.authService.islogged()){
      const dialogRef = this.dialog.open(DetalleEncontradoComponent,{data: encontrado},);    
      dialogRef.afterClosed();
    } else{
      this._snackBar.open("Debe ser cliente para hacer uso de los servicios", "Cerrar");
    }
  }
   agregarPerdido(usuario:Usuario): void {   
          const dialogRef = this.dialog.open(AgregarPerdidoComponent,{data:usuario})   
         
          dialogRef.afterClosed().subscribe(dato => {
            if(dato != undefined)
            
              this.perdidosMias.push(dato);
          })
    
 }
 agregarEncontrado(usuario:Usuario): void {   
  const dialogRef = this.dialog.open(AgregarEncontradoComponent,{data: usuario})   
 
  dialogRef.afterClosed().subscribe(dato => {
    if(dato != undefined)
      this.encontradosMias.push(dato);
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

contactar(): void{
  
    const dialogRef = this.dialog.open(ContactoComponent,{data: "Contacto para comunicacion con Dueño de la publicacion"});
    dialogRef.afterClosed().subscribe(result => {
     if (result != undefined){
     // this._snackBar.open('Se envio el correo exitosamente','Cerrar')
     }
    });
  
  }


}
