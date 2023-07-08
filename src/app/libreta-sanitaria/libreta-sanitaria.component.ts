import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mascota } from '../modelo/Mascota';
import { VeterinariaService } from '../service/veterinaria.service';
import { LibretaSanitaria } from '../modelo/LibretaSanitaria';
import moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-libreta-sanitaria',
  templateUrl: './libreta-sanitaria.component.html',
  styleUrls: ['./libreta-sanitaria.component.css']
})
export class LibretaSanitariaComponent {

   libretaS : LibretaSanitaria[] = []

  constructor( @Inject(MAT_DIALOG_DATA) public data: Mascota, private veterinariaService: VeterinariaService){

  }

  ngOnInit() {
    this.veterinariaService.libretaSanitaria(this.data.id).subscribe( response => {
      this.libretaS = response
      console.log("datos de libreta")
      console.log(this.libretaS)
    })
  }

  formatDate(fecha : Date){
    return  moment(fecha).format("dddd, D MMMM YYYY")
  }

}
