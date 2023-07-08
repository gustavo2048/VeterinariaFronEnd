import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mascota } from '../modelo/Mascota';

@Component({
  selector: 'app-libreta-sanitaria',
  templateUrl: './libreta-sanitaria.component.html',
  styleUrls: ['./libreta-sanitaria.component.css']
})
export class LibretaSanitariaComponent {



  constructor( @Inject(MAT_DIALOG_DATA) public data: Mascota){

  }

}
