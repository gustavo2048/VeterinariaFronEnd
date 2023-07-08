import { Component, Inject } from '@angular/core';
import { Mascota } from '../modelo/Mascota';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistoriaClinica } from '../modelo/HistoriaClinica';
import { VeterinariaService } from '../service/veterinaria.service';
import moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-historia-clinica-perro',
  templateUrl: './historia-clinica-perro.component.html',
  styleUrls: ['./historia-clinica-perro.component.css']
})
export class HistoriaClinicaPerroComponent {

  listadoHistoriClinica: HistoriaClinica[] = []


  constructor(private veterinariaService: VeterinariaService, @Inject(MAT_DIALOG_DATA) public data: Mascota){
    console.log(data)

  }

  ngOnInit() {
      //traer historias clinica de este perro
      this.veterinariaService.listarHistoriaClinicaDe(this.data.id).subscribe(response =>{
        this.listadoHistoriClinica = response
        console.log(response);
      })

  }

  formatDate(fecha : Date){
    return  moment(fecha).format("dddd, D MMMM YYYY")
  }

}
