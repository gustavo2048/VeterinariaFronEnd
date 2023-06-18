import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VeterinariaService } from '../service/veterinaria.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Mascota } from '../modelo/Mascota';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-agregar-mascota',
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.css']
})
export class AgregarMascotaComponent {

  mascota = new Mascota();
 
  nom: FormControl;
  raza: FormControl;
  carac: FormControl;
  tam: FormControl;
  ed: FormControl;
  col: FormControl;
  sex: FormControl;
  publicado:boolean=false;
  maxDate: Date;
  minDate: Date;

  constructor( private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<AgregarMascotaComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Usuario,  private veterinariaService: VeterinariaService) {


    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth()

    this.maxDate = new Date(currentYear, currentMonth, currentDay);
    this.minDate = new Date(this.maxDate.getFullYear() - 25, currentMonth, currentDay)

    console.log(this.maxDate)

    console.log(this.minDate)
        
    this.nom = new FormControl('',[Validators.required]);
    this.raza = new FormControl('',[Validators.required]);
    this.tam = new FormControl('',[Validators.required])
    this.carac = new FormControl('',[Validators.required]);
    this.ed = new FormControl('',[Validators.required]); 
    this.col = new FormControl('',[Validators.required]);   
    this.sex = new FormControl('',[Validators.required]);   
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  IsDateValid() {
    let fechaActual = new Date()
    fechaActual.setHours(0, 0, 0, 0)   
    let fechaHace20Anios = new Date();
    fechaHace20Anios.setFullYear(fechaActual.getFullYear() - 25, fechaActual.getMonth(), fechaActual.getDay());
   
   
   
    if (((this.ed.value > fechaActual) || (this.ed.value == fechaActual)) && (this.ed.value > fechaHace20Anios )){      
      console.log("noesvalida")
      return false
    } else {
      return true
    }
  }



  agregarMascota() {
    if ((this.nom.valid && this.sex.valid&& this.raza.valid && this.tam.valid && this.carac.valid && this.ed.valid && this.col.valid)){

        this.mascota.nombre = this.nom.value;
        this.mascota.raza = this.raza.value;
        this.mascota.tamanio = this.tam.value;
        this.mascota.caracteristicas = this.carac.value;
        this.mascota.edad = this.ed.value;    
        this.mascota.usuarioId = this.data.id;      
        this.mascota.color = this.col.value;
        this.mascota.sexo = this.sex.value;
        this.mascota.publicado=false;

        this.veterinariaService.agregarMascota(this.mascota).subscribe(dato => { this.dialogRef.close(dato);});        
        this._snackBar.open("Su mascota se agregó con exito", "Cerrar");
    } else{
      this._snackBar.open("Debe completar todos los campos", "Cerrar");
    }
    
  }


}
