import { Component } from '@angular/core';
import { VeterinariaService } from '../service/veterinaria.service';
import { AuthService } from '../service/auth.service';
import { TurnosService } from '../service/turnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TurnoSolicitud } from '../modelo/turnoSolicitud';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent {

  misTurnos: TurnoSolicitud[] = []


  constructor(private veterinariaService: VeterinariaService, private usuarioService: AuthService, private turnoService: TurnosService, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {

    if (this.usuarioService.islogged()) {

      this.turnoService.misTurnosPendientes(this.usuarioService.getUserLogged().id).subscribe(listaTurnos => {
        console.log(listaTurnos)
        this.misTurnos = listaTurnos
      })

    }

  }

}
