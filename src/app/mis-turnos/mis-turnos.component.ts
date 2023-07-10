import { Component } from '@angular/core';
import { VeterinariaService } from '../service/veterinaria.service';
import { AuthService } from '../service/auth.service';
import { TurnosService } from '../service/turnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TurnoSolicitud } from '../modelo/turnoSolicitud';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TurnosSolicitudComponent } from '../turnos-solicitud/turnos-solicitud.component';
import moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent {

  misTurnos: TurnoSolicitud[] = []
  miHistorial: TurnoSolicitud[] = []

  constructor(public dialog: MatDialog, private veterinariaService: VeterinariaService, private usuarioService: AuthService, private turnoService: TurnosService, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {

    if (this.usuarioService.islogged()) {
      this.getMisTurnos()
      this.turnoService.misTurnosHistorial(this.usuarioService.getUserLogged().id).subscribe(response => {
        this.miHistorial = response
      })

    }

  }

  getMisTurnos(){
      this.turnoService.misTurnosPendientes(this.usuarioService.getUserLogged().id).subscribe(listaTurnos => {
        console.log(listaTurnos)
        this.misTurnos = listaTurnos
        let prueb = this.misTurnos.filter(e => e.estadoSolicitud == "CONFIRMADO")
        this.misTurnos = this.misTurnos.filter(e => e.estadoSolicitud != "CONFIRMADO")
        prueb.forEach(p => this.misTurnos.unshift(p) )
      })
  }


  solicitudTurno() {
    let nuevoturno = new TurnoSolicitud()
    const dialogRef = this.dialog.open(TurnosSolicitudComponent, {
      data: { nuevoturno },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getMisTurnos()
      if ((result != undefined) && (result.id > 0)) {
        console.log("se hizo")
      }

    });

  }


  formatDate(fecha : Date){
    
    return  moment(fecha).format("[Fecha solicitada: ]dddd, D MMMM YYYY")
  
  }

  formatDateConfirm(fecha: Date){
    return moment(fecha).format("dddd, D MMMM")
  }

}
