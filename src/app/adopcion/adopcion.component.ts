import { Component } from '@angular/core';
import { Adopcion } from '../modelo/Adopcion';
import { AdopcionService } from '../service/adopcion.service';

@Component({
  selector: 'app-adopcion',
  templateUrl: './adopcion.component.html',
  styleUrls: ['./adopcion.component.css']
})
export class AdopcionComponent {

  adopciones: Adopcion [] = [];


  constructor(private adopcionService: AdopcionService){

  }

  ngOnInit(){

    this.adopcionService.traerAdopciones().subscribe(data  => {       
      this.adopciones = data;       
    })    
  }


}
