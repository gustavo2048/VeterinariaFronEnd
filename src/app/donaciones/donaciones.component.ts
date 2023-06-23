import { Component } from '@angular/core';
import { Usuario } from '../modelo/Usuario';
import { DonacionARefugio } from '../modelo/DonacionARefugio';
import { DonacionAPerro } from '../modelo/DonacionAPerro';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DonacionPerroService } from '../service/donacion-perro.service';
import { DonacionRefugioService } from '../service/donacion-refugio.service';

@Component({
  selector: 'app-donaciones',
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.css']
})
export class DonacionesComponent {
  usuario!:Usuario;
  donacionesRefugios: DonacionARefugio[]=[];
  donacionesRefugio !:DonacionARefugio;
  donacionPerros: DonacionAPerro []=[];
  donacionPerro!:DonacionAPerro;

  
  constructor(private donacionRefugioService: DonacionRefugioService, private donacionPerroService: DonacionPerroService,private authService: AuthService,private _snackBar: MatSnackBar,public dialog: MatDialog){
    this.usuario=JSON.parse(localStorage.getItem('user')!)
    

  }

  ngOnInit(){
    
  
    this.donacionRefugioService.traerDonacionesRefugio().subscribe(data =>{
      this.donacionesRefugios=data;
    })
    this.donacionPerroService.traerDonacionesPerro().subscribe(data => {
      this.donacionPerros=data;

    })


  }

  // scrollToSection() {
  //   const element = this.renderer.selectRootElement('#ultimas-publicaciones', true);
  //   element.scrollIntoView({ behavior: 'smooth' });
  // }
  // openDetallePerdido(perdido: Perdido): void { 
  
  //   if (this.authService.islogged()){
  //     const dialogRef = this.dialog.open(DetallePerdidoComponent,{data: perdido},);    
  //     dialogRef.afterClosed();
  //   } else{
  //     this._snackBar.open("Debe ser cliente para hacer uso de los servicios", "Cerrar");
  //   }
  // }
  // openDetalleEncontrado(encontrado: Encontrado): void { 
    
  //   if (this.authService.islogged()){
  //     const dialogRef = this.dialog.open(DetalleEncontradoComponent,{data: encontrado},);    
  //     dialogRef.afterClosed();
  //   } else{
  //     this._snackBar.open("Debe ser cliente para hacer uso de los servicios", "Cerrar");
  //   }
  // }
//    agregarDonacionPerro(usuario:Usuario): void {   
//           const dialogRef = this.dialog.open(AgregarPerdidoComponent,{data:usuario})   
         
//           dialogRef.afterClosed().subscribe(dato => {
//             if(dato != undefined)
            
//               this.donacionPerros.push(dato);
//           })
    
//  }
//  agregarDonacionRefugio(usuario:Usuario): void {   
//   const dialogRef = this.dialog.open(AgregarEncontradoComponent,{data: usuario})   
 
//   dialogRef.afterClosed().subscribe(dato => {
//     if(dato != undefined)
//       this.donacionesRefugios.push(dato);
//   })

// }

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
