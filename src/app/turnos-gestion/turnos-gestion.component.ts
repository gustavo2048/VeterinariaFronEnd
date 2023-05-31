import { Component } from '@angular/core';
import { TurnosService } from '../service/turnos.service';
import { TurnoSolicitud } from '../modelo/turnoSolicitud';

@Component({
  selector: 'app-turnos-gestion',
  templateUrl: './turnos-gestion.component.html',
  styleUrls: ['./turnos-gestion.component.css']
})
export class TurnosGestionComponent {

  turnoSolicitados: TurnoSolicitud[] = []
  turnoConfirmados: TurnoSolicitud[] = []


  constructor(private turnosService: TurnosService){

  }

  ngOnInit(){
    this.turnosService.turnosSolicitados().subscribe(turnoS => {
      this.turnoSolicitados = turnoS
    })
    this.turnosService.turnosConfirmados().subscribe(turnosC =>{
      this.turnoConfirmados = turnosC
    })
  }





}
