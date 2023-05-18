import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Mascota } from '../modelo/Mascota';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { VeterinariaService } from '../service/veterinaria.service';


@Component({
  selector: 'app-detalle-mascota',
  templateUrl: './detalle-mascota.component.html',
  styleUrls: ['./detalle-mascota.component.css']
})


export class DetalleMascotaComponent {


  deshabilitado = true;

  mascota = new Mascota();
  nom: FormControl;
  raza: FormControl;
  carac: FormControl;
  tam: FormControl;
  ed: FormControl


  constructor( private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<DetalleMascotaComponent>,
     @Inject(MAT_DIALOG_DATA) public data: Mascota,  private veterinariaService: VeterinariaService) {
      this.mascota = data;    

     
      this.nom = new FormControl({value: this.mascota.nombre, disabled: true}, [Validators.required]);
      this.raza = new FormControl({value: this.mascota.raza, disabled: true},[Validators.required]);
      this.tam = new FormControl({value: this.mascota.tamanio, disabled: true},[Validators.required])
      this.carac = new FormControl({value: this.mascota.caracteristicas, disabled: true},[Validators.required]);
      this.ed = new FormControl({value: this.mascota.edad, disabled: true},[Validators.required]);    
     }



  onNoClick(): void {
    this.dialogRef.close();
  }

 

  desHabilitar(){
    this.nom.disable();
    this.raza.disable();
    this.tam.disable();
    this.carac.disable();
    this.ed.disable();
    this.deshabilitado = true;    
  }

  editarMascota(){
    this.nom.enable();
    this.raza.enable();
    this.tam.enable();
    this.carac.enable();
    this.ed.enable();
    this.deshabilitado = false;   
  }

  cancelarEdicion(){   
    this.nom = new FormControl({value: this.data.nombre, disabled: true}, [Validators.required]);
    this.raza = new FormControl({value: this.data.raza, disabled: true},[Validators.required]);
    this.tam = new FormControl({value: this.data.tamanio, disabled: true},[Validators.required])
    this.carac = new FormControl({value: this.data.caracteristicas, disabled: true},[Validators.required]);
    this.ed = new FormControl({value: this.data.edad, disabled: true},[Validators.required]);    
    this.desHabilitar();
  }

  enviarEdicion(){
    if (this.nom.valid && this.raza.valid && this.tam.valid && this.carac.valid && this.ed.valid){
      this.mascota.nombre = this.nom.value;
      this.mascota.raza = this.raza.value;
      this.mascota.tamanio = this.tam.value;
      this.mascota.caracteristicas = this.carac.value;
      this.mascota.edad = this.ed.value;  
      this.desHabilitar();
      

      this.veterinariaService.editarMascota(this.mascota).subscribe(dato => {console.log(dato)});

      this._snackBar.open("Su cambio se ha realizado con exito", "Cerrar");


    }
    
  }



}
