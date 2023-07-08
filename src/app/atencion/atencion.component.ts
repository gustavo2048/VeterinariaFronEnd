import { Component,Inject } from '@angular/core';
import { TurnoSolicitud } from '../modelo/turnoSolicitud';
import { TurnosService } from '../service/turnos.service';
import moment from 'moment';
import 'moment/locale/es';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HistoriaClinica } from '../modelo/HistoriaClinica';
import { VeterinariaService } from '../service/veterinaria.service';
import { Vacuna } from '../modelo/Vacuna';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AtencionConfirmacionComponent } from '../atencion-confirmacion/atencion-confirmacion.component';

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
  dosisFormControl: FormControl;
  descripDosis: FormControl;

  constructor(private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: TurnoSolicitud,public dialog: MatDialog, public dialogRef: MatDialogRef<AtencionComponent>, public veterinariaService: VeterinariaService){

    this.motivoFormControl = new FormControl('',Validators.required)
    this.observacionFormControl = new FormControl('',Validators.required)
    this.pesoFormControl = new FormControl('',Validators.required)
    this.vacunaFormControl = new FormControl('',Validators.required)
    this.montoFormControl = new FormControl('',Validators.required)
    this.dosisFormControl = new FormControl('',Validators.required)
    this.descripDosis = new FormControl('',Validators.required)
  }
   
  ngOnInit() {
    
    //Consultar Descuento del usuario

  }


  evaluarEdad():number{
    var fechaNacimineto = moment(this.data.mascota.edad);
    var fechaActual = moment(new Date());
    // console.log(fechaActual.diff(fechaNacimineto, 'month'), ' meses de diferencia');
    return fechaActual.diff(fechaNacimineto, 'month')
    
  }

  //Buscar vacuna tipo A de X perro antes de los 2 meses
  tieneVacunaTipoA(){
    
  }

  confirmarAtencion(){
    let descuento = new Descuento(this.montoFormControl.value,this.data.usuario.montoDescuento)
    const dialogRef = this.dialog.open(AtencionConfirmacionComponent, {
      data: descuento
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('antes de cerrar la confirmacion de atencion:: ')
      console.log(result)
      if (result == true) {
       //Se aplica el descuento Se debe borrar el contador del usuario a CERO 
        let fechaActual = new Date()
        fechaActual.setHours(0, 0, 0, 0)
        let historia = new HistoriaClinica()

        if(this.data.usuario.montoDescuento >0){
          historia.descuentoAplicado = true
        }else{
          historia.descuentoAplicado = false
        }
        historia.idMascota = this.data.mascota.id
        historia.idUsuario = this.data.usuario.id
        historia.observacion = this.observacionFormControl.value
        historia.peso = this.pesoFormControl.value;
        historia.monto = this.montoFormControl.value;
        historia.fechaCreacion = fechaActual
        let vacuna = new Vacuna()
        vacuna.tipo = this.vacunaFormControl.value;
        vacuna.fechaCreacion = fechaActual
        if(vacuna.tipo == "tipoA"){
          vacuna.dosis = this.dosisFormControl.value
          vacuna.descripcion = this.descripDosis.value
        }
        historia.vacuna = vacuna
        historia.motivo = this.motivoFormControl.value
        historia.idTurno = this.data.id
        
        console.log(historia)
        this.veterinariaService.crearHistoriaClinica(historia).subscribe(response =>{
          this.dialogRef.close(this.data);
        })
        
      }

    })

  }

  completoFormulario(){
    if(this.motivoFormControl.valid && this.observacionFormControl .valid && this.pesoFormControl.valid && this.vacunaFormControl.valid && this.montoFormControl.valid){

      if (this.vacunaFormControl.value == "tipoA" &&  (!this.dosisFormControl.valid || !this.descripDosis.valid) ) {
        return true
      }

      return false
    }
    return true
  }

}

export class Descuento {
  monto!: number
  descuento!: number

  constructor(m:number, d:number){
    this.monto= m
    this.descuento = d
  }
}