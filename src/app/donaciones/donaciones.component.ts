import { Component } from '@angular/core';
import { Usuario } from '../modelo/Usuario';
import { DonacionARefugio } from '../modelo/DonacionARefugio';
import { DonacionAPerro } from '../modelo/DonacionAPerro';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DonacionPerroService } from '../service/donacion-perro.service';
import { DonacionRefugioService } from '../service/donacion-refugio.service';
import { AgregarDonacionPerroComponent } from '../agregar-donacion-perro/agregar-donacion-perro.component';
import { AgregarDonacionRefugioComponent } from '../agregar-donacion-refugio/agregar-donacion-refugio.component';
import { DetalleDonacionPerroComponent } from '../detalle-donacion-perro/detalle-donacion-perro.component';
import { DetalleDonacionRefugioComponent } from '../detalle-donacion-refugio/detalle-donacion-refugio.component';
import { formatDate } from '@angular/common';
import moment from 'moment';

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
      console.log(data)
      this.donacionesRefugios=data;
    })
    this.donacionPerroService.traerDonacionesPerro().subscribe(data => {
      this.donacionPerros=data;

    })


  }
  DisponibilidadPerro(perro:DonacionAPerro): boolean{
    //ESTOY VIENDO SI LA FECHA ACTUAL ES MAYOR QUE LA FECHA LIMITE --> SI OCURRE ESO ENTONCES EL BOTON DONAR DESAPARECE
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth()
    let fechaActual= new Date(currentYear, currentMonth, currentDay);
    const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript se indexan desde 0, por lo que sumamos 1
    const dia = fechaActual.getDate();
    const anio = fechaActual.getFullYear();
    const fechaFormateada = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    
   
    if(perro.fechaLimite.toString() < fechaFormateada ){
    return false
    }
    else{
      return true
    }
  }
  parsearFecha(fechaLimite:Date){
    return  moment(fechaLimite).format("MM-DD-YYYY");
    }

// SDK de Mercado Pago

// Agrega credenciales


  DisponibilidadRefugio(perro:DonacionARefugio):boolean{
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth()
    let fechaActual= new Date(currentYear, currentMonth, currentDay);
        //ESTOY VIENDO SI LA FECHA ACTUAL ES MAYOR QUE LA FECHA LIMITE --> SI OCURRE ESO ENTONCES EL BOTON DONAR DESAPARECE
    const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript se indexan desde 0, por lo que sumamos 1
    const dia = fechaActual.getDate();
    const anio = fechaActual.getFullYear();
    const fechaFormateada = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

    if(perro.fechaLimite.toString() < fechaFormateada ){
    return false
    }
    else{
      return true
    }
  }
   openDetalleDonacionARefugio(donacionRefugio: DonacionARefugio): void { 
      
       const dialogRef = this.dialog.open(DetalleDonacionRefugioComponent,{data: donacionRefugio},);    
       dialogRef.afterClosed();
     
   }
   openDetalleDonacionAPerro(donacionPerro: DonacionAPerro): void { 
      const dialogRef = this.dialog.open(DetalleDonacionPerroComponent,{data: donacionPerro},);    
      dialogRef.afterClosed();
   
  }
    agregarDonacionPerro(): void {   
         const dialogRef = this.dialog.open(AgregarDonacionPerroComponent)   
         
          dialogRef.afterClosed().subscribe(dato => {
           if(dato != undefined)
            
             this.donacionPerros.push(dato);
          })
    
}
  agregarDonacionRefugio(): void {   
  const dialogRef = this.dialog.open(AgregarDonacionRefugioComponent)   
    dialogRef.afterClosed().subscribe(dato => {
    if(dato != undefined)
      this.donacionesRefugios.push(dato);
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
