import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../modelo/Usuario';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TurnosService } from '../service/turnos.service';
import { TurnoSolicitud } from '../modelo/turnoSolicitud';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-turnos-confirmacion',
  templateUrl: './turnos-confirmacion.component.html',
  styleUrls: ['./turnos-confirmacion.component.css']
})
export class TurnosConfirmacionComponent {
  minDate!: Date;
  fechaFormControl!: FormControl;
  turnThatDay!: number
  showCantTurn!: boolean


  constructor(private spinnerService:NgxSpinnerService, public dialogRef: MatDialogRef<TurnosConfirmacionComponent>, @Inject(MAT_DIALOG_DATA) public data: TurnoSolicitud, private turnosService: TurnosService) {
    // Inicializar variables
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth()
    this.showCantTurn = false
    this.turnThatDay = 0

    this.minDate = new Date(currentYear, currentMonth, currentDay);
    this.fechaFormControl = new FormControl(new Date(), [Validators.required]);

  }

  ngOnInit() {
    console.log(this.data)
  }

  asignar() {
   
    let turnoNew: TurnoSolicitud = this.data
    turnoNew.idMascota = this.data.mascota.id
    turnoNew.idUsuarioSolicitante = this.data.usuario.id
    turnoNew.fechaAsignada = this.fechaFormControl.value

    this.turnosService.AsignarFecha(turnoNew).subscribe(response => {
      console.log(response)
      this.dialogRef.close("ASIGNADO")
    })
  




  }

  cancelar() {
    this.dialogRef.close("CANCELAR")
  }

  eliminar() {

    let turnoNew: TurnoSolicitud = this.data
    turnoNew.idMascota = this.data.mascota.id
    turnoNew.idUsuarioSolicitante = this.data.usuario.id

    this.turnosService.anularTurno(turnoNew).subscribe(response => {
      console.log(response)
    })

    this.dialogRef.close("ELIMINAR")
  }







  changeDate(type: String, event: MatDatepickerInputEvent<Date>) {
    this.showCantTurn = true

    console.log("cambio el valor de la fecha A::: ")
    console.log(event.value)

    if (event.value != null) {
      this.turnosService.turnosDia(event.value).subscribe(cantidad => {
        this.turnThatDay = cantidad
      })
    }
  }

  IsDateValid() {
    let fechaActual = new Date()
    fechaActual.setHours(0, 0, 0, 0)
    if ((this.fechaFormControl.value > fechaActual) || (this.fechaFormControl.value == fechaActual)) {
      //console.log('la fecha solicitada no puede ser menor a la fecha actual. Es invalida ')
      return false
    } else {
      //console.log('la fecha solicitada es valida ')
      return true
    }
  }

}
