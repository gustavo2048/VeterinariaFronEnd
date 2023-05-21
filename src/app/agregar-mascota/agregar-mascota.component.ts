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

  constructor( private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<AgregarMascotaComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Usuario,  private veterinariaService: VeterinariaService) {
    
        
    this.nom = new FormControl('',[Validators.required]);
    this.raza = new FormControl('',[Validators.required]);
    this.tam = new FormControl('',[Validators.required])
    this.carac = new FormControl('',[Validators.required]);
    this.ed = new FormControl('',[Validators.required]);    
  }


  onNoClick(): void {
    this.dialogRef.close();
  }



  agregarMascota() {
    if ((this.nom.valid && this.raza.valid && this.tam.valid && this.carac.valid && this.ed.valid) &&
        ((this.nom.value != "nombre") && (this.raza.value != "raza") && (this.tam.value != "tamaño") && (this.carac.value != "caracteristicas") && (this.ed.value != "edad"))){

        this.mascota.nombre = this.nom.value;
        this.mascota.raza = this.raza.value;
        this.mascota.tamanio = this.tam.value;
        this.mascota.caracteristicas = this.carac.value;
        this.mascota.edad = this.ed.value;    
        this.mascota.usuarioId = this.data.id;      
      

        this.veterinariaService.agregarMascota(this.mascota).subscribe(dato => {console.log(dato)});
    

        this.onNoClick()
        this._snackBar.open("Su mascota se agregó con exito, refresque la pagina", "Cerrar");
    } else{
      this._snackBar.open("Debe completar todos los campos", "Cerrar");
    }
    
  }


}
