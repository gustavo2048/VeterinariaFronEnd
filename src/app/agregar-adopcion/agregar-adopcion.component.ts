import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../modelo/Usuario';
import { AdopcionService } from '../service/adopcion.service';
import { Adopcion } from '../modelo/Adopcion';

@Component({
  selector: 'app-agregar-adopcion',
  templateUrl: './agregar-adopcion.component.html',
  styleUrls: ['./agregar-adopcion.component.css']
})
export class AgregarAdopcionComponent {


 
  adopcion = new Adopcion();
  usuario  = new Usuario();

  tit: FormControl;
  desc: FormControl;
  mot: FormControl;
  sex: FormControl;
  tam: FormControl;
  raz: FormControl;
  adoptado: boolean= false;

 


  constructor( private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<AgregarAdopcionComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Usuario,  private adopcionService: AdopcionService) {    
        
      this.tit = new FormControl("",[Validators.required]);
      this.desc = new FormControl("",[Validators.required]);
      this.mot = new FormControl("",[Validators.required])
      this.sex = new FormControl("",[Validators.required]);
      this.raz = new FormControl("",[Validators.required]);
      this.tam = new FormControl("",[Validators.required]);
      
      
  }


  onNoClick(): void {
    this.dialogRef.close();
  }



  agregarAdopcion() {
    if (this.tit.valid && this.desc.valid && this.mot.valid && this.sex.valid && this.tam.valid && this.raz.valid){
       
        this.adopcion.titulo = this.tit.value;
        this.adopcion.descripcion = this.desc.value;
        this.adopcion.motivo = this.mot.value;
        this.adopcion.raza = this.raz.value;    
        this.adopcion.sexo = this.sex.value;    
        this.adopcion.tamanio = this.tam.value;    
        this.adopcion.usuarioId = this.data.id;            

        this.adopcionService.agregarAdopcion(this.adopcion).subscribe(dato => { this.dialogRef.close(dato);});   
        
       
    } else{
      this._snackBar.open("Debe completar todos los campos", "Cerrar");
    }

  }
}
