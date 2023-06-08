import { Component } from '@angular/core';
import { TurnosService } from '../service/turnos.service';
import { TurnoSolicitud } from '../modelo/turnoSolicitud';
import { MatDialog } from '@angular/material/dialog';
import { ContactoComponent } from '../contacto/contacto.component';

@Component({
  selector: 'app-turnos-gestion',
  templateUrl: './turnos-gestion.component.html',
  styleUrls: ['./turnos-gestion.component.css']
})
export class TurnosGestionComponent {

  turnoSolicitados: TurnoSolicitud[] = []
  turnoConfirmados: TurnoSolicitud[] = []


  constructor(private turnosService: TurnosService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.turnosService.turnosSolicitados().subscribe(turnoS => {
      this.turnoSolicitados = turnoS
    })
    this.turnosService.turnosConfirmados().subscribe(turnosC => {
      this.turnoConfirmados = turnosC
    })
  }



  exportarMetodo() {
    console.log("ingreso al metodo");

    const dialogRef = this.dialog.open(ContactoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }




}
