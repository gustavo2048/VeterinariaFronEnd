import { Component, TrackByFunction, Inject} from '@angular/core';
import { Usuario } from '../modelo/Usuario';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { VeterinariaService } from '../service/veterinaria.service';
import { Mascota } from '../modelo/Mascota';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})


export class PerfilComponent {
  usuario = new Usuario(); 
  mascotas: Mascota[] = [];
  deshabilitado = true;
  
  constructor(public dialog: MatDialog, private veteriariaService: VeterinariaService) {}

  ngOnInit(){  
      this.veteriariaService.traerMascotas(2).subscribe(data  => {         
        this.mascotas = data;       
      })           
  }
  editarPerfil(){
    this.deshabilitado = false;    
  }
  enviarEdicion(){
    this.deshabilitado = true;
    console.log(this.usuario.nombre);
  }
  openDetalle(mascota: Mascota): void {    
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog,{data: mascota});
    
    dialogRef.afterClosed();
  }
}



@Component({
selector: 'app-detalleMascota',
templateUrl: './detalleMascota.html',
styleUrls: ['./detalleMascota.css'],
})

export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Mascota,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}




