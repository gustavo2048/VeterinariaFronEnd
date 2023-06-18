import { Component, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _moment from 'moment';
import { VeterinariaService } from '../service/veterinaria.service';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../modelo/Usuario';
import { Mascota } from '../modelo/Mascota';
import { TurnosService } from '../service/turnos.service';
import { TurnoSolicitud } from '../modelo/turnoSolicitud';

const moment = _moment;

@Component({
  selector: 'app-turnos-solicitud',
  templateUrl: './turnos-solicitud.component.html',
  styleUrls: ['./turnos-solicitud.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' }

  ],
})
export class TurnosSolicitudComponent {

  /// FORMControl's
  mascotaFormControl: FormControl;
  fhorarioFormControl: FormControl;
  fechaFormControl: FormControl;
  observacionControl: FormControl;
  mascotas: Mascota[] = [];
  usuario: Usuario = new Usuario()
  matcher = new MyErrorStateMatcher();
  turnoSolicitud: TurnoSolicitud
  ///Limint Date
  minDate: Date;





  constructor(private veterinariaService: VeterinariaService, private usuarioService: AuthService,
    private turnoService: TurnosService, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<TurnosSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TurnoSolicitud) {

    this.turnoSolicitud = new TurnoSolicitud();
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth()

    this.minDate = new Date(currentYear, currentMonth, currentDay + 1);

    this.mascotaFormControl = new FormControl('', [Validators.required]);
    this.fhorarioFormControl = new FormControl('', [Validators.required]);
    this.fechaFormControl = new FormControl(this.minDate, [Validators.required]);
    this.observacionControl = new FormControl('', [Validators.required]);

  }


  ngOnInit() {

    if (this.usuarioService.islogged()) {
      //Busco al usuario en el localStorage y busco sus mascotas
      this.usuario = this.usuarioService.getUserLogged()
      this.veterinariaService.traerMascotas(this.usuarioService.getUserLogged().id).subscribe(mascotaResponse => {
        this.mascotas = mascotaResponse
      })

    }


  }

  completoFormulario() {
    if (this.mascotaFormControl.valid && this.fhorarioFormControl.valid && this.fechaFormControl.valid && this.observacionControl.valid) {
      return false
    }
    return true
  }

  IsDateValid() {
    let fechaActual = new Date()
    fechaActual.setHours(0, 0, 0, 0)
    if ((this.fechaFormControl.value > fechaActual) ) {
      //console.log('la fecha solicitada no puede ser menor a la fecha actual. Es invalida ')
      return false
    } else {
      //console.log('la fecha solicitada es valida ')
      return true
    }
  }

  enviarSolicitud() {
    console.log(this.data)
    this.turnoSolicitud.motivo = this.observacionControl.value
    this.turnoSolicitud.horarioTentativo = this.fhorarioFormControl.value
    console.log(this.fechaFormControl.value)
    this.turnoSolicitud.fechaSolicitada = this.fechaFormControl.value
    this.turnoSolicitud.idMascota = this.mascotaFormControl.value
    this.turnoSolicitud.idUsuarioSolicitante = this.usuario.id
    this.turnoService.solicitarTurno(this.turnoSolicitud).subscribe(
      response => {
        
        console.log(response)
        if (response.id == -1) {
          this._snackBar.open(response.motivo, "Cerrar",{
            duration: 5000,
          });
        } else {
          if (response.id == -2) {
            //Ya se dispone de un turno para ese perro en tal fecha
            this._snackBar.open(response.motivo, "Cerrar",{
              duration: 5000,
            });
          } else {
            this.data = response
            this._snackBar.open("La solicitud de turno fue creada correctamente. Se le notificara por email la confirmacion", "Cerrar",{
              duration: 5000,
            });
            this.dialogRef.close(this.data);
          }
        }

      })
     
  }



  tieneMascotas() {
    if (this.mascotas.length < 1) {
      console.log("cantidad de mascotas", this.mascotas.length)
    }
  }




}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
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
