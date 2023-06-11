import { Component } from '@angular/core';
import { TurnosService } from '../service/turnos.service';
import { TurnoSolicitud } from '../modelo/turnoSolicitud';
import { MatDialog } from '@angular/material/dialog';
import { ContactoComponent } from '../contacto/contacto.component';
import { TurnosConfirmacionComponent } from '../turnos-confirmacion/turnos-confirmacion.component';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-turnos-gestion',
  templateUrl: './turnos-gestion.component.html',
  styleUrls: ['./turnos-gestion.component.css']
})
export class TurnosGestionComponent {

  turnoSolicitados: TurnoSolicitud[] = []
  turnoConfirmados: TurnoSolicitud[] = []
  turnoHistorial: TurnoSolicitud[] = []

  constructor(private turnosService: TurnosService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.getListados()
  }

  ngOnDestroy(){
    // book.destroy()
  }

  getListados() {
    this.turnosService.turnosSolicitados().subscribe(turnoS => {
      this.turnoSolicitados = turnoS
    })
    this.turnosService.turnosConfirmados().subscribe(turnosC => {
      this.turnoConfirmados = turnosC
    })
    this.turnosService.turnosHistorial().subscribe(turnosH => {
      this.turnoHistorial = turnosH
      console.log(this.turnoHistorial)
    })
  }


  exportarMetodo() {
    console.log("ingreso al metodo");

    const dialogRef = this.dialog.open(ContactoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  asignarTurno(turno: TurnoSolicitud) {
    console.log("ingresa a signar el turno")
    console.log(turno)

    const dialogRef = this.dialog.open(TurnosConfirmacionComponent, {
      data: turno
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('antes de cerrar traigo::: ')
      console.log(result)
      if (result != "CANCELAR" && result != undefined) {
        //this.turnoSolicitados = this.turnoSolicitados.filter(elemento => elemento.id != turno.id)
        this.getListados()
      }

    })

  }




}
