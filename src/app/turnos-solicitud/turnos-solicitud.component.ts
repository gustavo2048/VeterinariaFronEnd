import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _moment from 'moment';

const moment =  _moment;

@Component({
  selector: 'app-turnos-solicitud',
  templateUrl: './turnos-solicitud.component.html',
  styleUrls: ['./turnos-solicitud.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es'}
    
  ],
})
export class TurnosSolicitudComponent {

  /// FORMControl's
  mascotaFormControl: FormControl;
  fhorarioFormControl: FormControl;
  apellidoFormControl: FormControl;
  fechaFormControl: FormControl;

  matcher = new MyErrorStateMatcher();
  
  ///Limint Date
  minDate: Date;


  


  constructor( ) {
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth()
  
    this.minDate = new Date(currentYear, currentMonth, currentDay);

    this.mascotaFormControl = new FormControl('', [Validators.required]);
    this.fhorarioFormControl = new FormControl('', [Validators.required]);
    this.apellidoFormControl = new FormControl('', [Validators.required]);
    this.fechaFormControl = new FormControl('', [Validators.required, ]);

   }


  // crearEntidad() {
  //   //Verificar que esten todos los valores para CREAR!!
  //   if (this.emailFormControl.valid && this.nombreFormControl.valid && this.apellidoFormControl.valid &&
  //     this.dniFormControl.valid && this.zonaFormControl.valid && this.passFormControl.valid && this.tokenFormControl.valid) {

  //     //Validar que no exista el mail
  //     this.vacunadorService.checkLogVacunador(this.emailFormControl.value).subscribe(responseEmail => {
  //       console.log(responseEmail)
  //       if (responseEmail) {
  //         this._snackBar.open("El email esta registrado en el sistema, elija otra ", "Cerrar", { duration: 10 * 1000 });
  //       } else {

  //         this.vacunadorService.buscarDni(this.dniFormControl.value).subscribe(responseDni => {

  //           if (responseDni) {
  //             this._snackBar.open("No se puede crear el usuario, el dni esta registrado en el sistema ", "Cerrar", { duration: 20 * 1000 });
  //           } else {

  //             this.nuevoVacunador = new Vacunador();
  //             this.nuevoVacunador.apellido = this.apellidoFormControl.value
  //             this.nuevoVacunador.nombre = this.nombreFormControl.value
  //             this.nuevoVacunador.email = this.emailFormControl.value
  //             this.nuevoVacunador.dni = this.dniFormControl.value
  //             this.nuevoVacunador.centro_vacunatorio = this.zonaFormControl.value
  //             this.nuevoVacunador.clave = this.passFormControl.value
  //             this.nuevoVacunador.token = this.tokenFormControl.value
  //             this.nuevoVacunador.borrado = false

  //             console.log(this.nuevoVacunador)

  //             this._usuarioService.crearVacunador(this.nuevoVacunador).subscribe(responseVacunador => {
  //               console.log('resultado del creoar')
  //               console.log(responseVacunador)
  //             })

  //             this._snackBar.open("Se registrara el nuevo usuario ", "Cerrar", { duration: 10 * 1000 });
  //             this.dialogRef.close(true);


  //           }
  //         })

  //       }
  //     })


  //   } else {
  //     this._snackBar.open("Debe completar todos los campos correctamente", "Cerrar", { duration: 4 * 1000 });
  //   }

  // }




}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}