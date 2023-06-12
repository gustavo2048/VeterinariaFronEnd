import { Component } from '@angular/core';
import { VeterinariaService } from '../service/veterinaria.service';
import { AuthService } from '../service/auth.service';
import { TurnosService } from '../service/turnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TurnoSolicitud } from '../modelo/turnoSolicitud';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TurnosSolicitudComponent } from '../turnos-solicitud/turnos-solicitud.component';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent {

  misTurnos: TurnoSolicitud[] = []


  constructor(public dialog: MatDialog, private veterinariaService: VeterinariaService, private usuarioService: AuthService, private turnoService: TurnosService, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {

    if (this.usuarioService.islogged()) {

      this.turnoService.misTurnosPendientes(this.usuarioService.getUserLogged().id).subscribe(listaTurnos => {
        console.log(listaTurnos)
        this.misTurnos = listaTurnos

      })

    }

  }


  solicitudTurno() {
    let nuevoturno = new TurnoSolicitud()
    const dialogRef = this.dialog.open(TurnosSolicitudComponent, {
      data: { nuevoturno },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.turnoService.misTurnosPendientes(this.usuarioService.getUserLogged().id).subscribe(listaTurnos => {
        console.log(listaTurnos)
        this.misTurnos = listaTurnos

      })
        if ((result != undefined) && (result.id > 0)) {
          console.log("se hizo")
        }

    });

  }




}
