import { Component } from '@angular/core';

@Component({
  selector: 'app-turnos-confirmacion',
  templateUrl: './turnos-confirmacion.component.html',
  styleUrls: ['./turnos-confirmacion.component.css']
})
export class TurnosConfirmacionComponent {
  minDate!: Date;


  constructor() {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear, 0, 1);
  }

}
