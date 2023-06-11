import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contacto } from '../modelo/Contacto';
import { AuthService } from '../service/auth.service';
import { VeterinariaService } from '../service/veterinaria.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  emailControl!: FormControl
  asuntoControl!: FormControl
  motivoControl!: FormControl
  correo!: Contacto
  solicitarEmail!: boolean

  constructor(private _snackBar: MatSnackBar,private authService: AuthService, private veterinariaService: VeterinariaService, public dialogRef: MatDialogRef<ContactoComponent>, @Inject(MAT_DIALOG_DATA) public dataEntrante: string,) {
    //Definir el dato que se traera
  }


  ngOnInit() {
    this.emailControl = new FormControl('', [Validators.required, Validators.email]);
    this.motivoControl = new FormControl('', [Validators.required]);
    this.correo = new Contacto()
    //Si esta logeado
    //Debe completar el emailDestino con el del usuario
    //Sino
    //Solicitar el email
    if (this.authService.islogged()) {
      this.solicitarEmail = false
    } else {
      this.solicitarEmail = true
    }
  }

  habilitar(): boolean {
    if (this.solicitarEmail){
      if (this.emailControl.valid && this.motivoControl.valid) {
        return false
      }
    }else{
      if(this.motivoControl.valid){
        return false
      }
    }
    return true
  }

  enviarEmail() {
    //Setear Valores:
    this.correo.asunto = this.dataEntrante /// Se debe cargar con el asunto de acuerdo a quien invoque
    this.correo.motivo = this.motivoControl.value
    if (this.solicitarEmail) {
      this.correo.emailDestino = this.emailControl.value
    } else {
      this.correo.emailDestino = this.authService.getUserLogged().email

    }

    //Enviar el email al back
    console.log("Envia el correo con::: ")
    console.log(this.correo)
    this.veterinariaService.contarse(this.correo).subscribe()
    this.dialogRef.close(true);
    this._snackBar.open("Se a enviado el correo correctamente", "Cerrar");

  }


}
