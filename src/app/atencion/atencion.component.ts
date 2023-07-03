import { Component,Inject } from '@angular/core';
import { TurnoSolicitud } from '../modelo/turnoSolicitud';
import { TurnosService } from '../service/turnos.service';
import moment from 'moment';
import 'moment/locale/es';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.css']
})
export class AtencionComponent {

  motivoFormControl: FormControl;
  observacionFormControl: FormControl;
  pesoFormControl: FormControl;
  vacunaFormControl: FormControl;
  montoFormControl: FormControl;


  constructor( @Inject(MAT_DIALOG_DATA) public data: TurnoSolicitud){

    this.motivoFormControl = new FormControl('',Validators.required)
    this.observacionFormControl = new FormControl('',Validators.required)
    this.pesoFormControl = new FormControl('',Validators.required)
    this.vacunaFormControl = new FormControl('',Validators.required)
    this.montoFormControl = new FormControl('',Validators.required)
  }
   
  ngOnInit() {
    
    //Consultar Descuento del usuario

  }


  evaluarEdad():number{
    var fechaNacimineto = moment(this.data.mascota.edad);
    var fechaActual = moment(new Date());
    console.log(fechaActual.diff(fechaNacimineto, 'month'), ' meses de diferencia');
    return fechaActual.diff(fechaNacimineto, 'month')
    
  }

  //Buscar vacuna tipo A de X perro antes de los 2 meses
 

}
