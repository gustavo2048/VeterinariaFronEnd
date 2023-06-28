import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../modelo/Usuario';
import { AdopcionService } from '../service/adopcion.service';
import { Adopcion } from '../modelo/Adopcion';
import { Mascota } from '../modelo/Mascota';
import { VeterinariaService } from '../service/veterinaria.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-agregar-adopcion-formulario',
  templateUrl: './agregar-adopcion-formulario.component.html',
  styleUrls: ['./agregar-adopcion-formulario.component.css']
})
export class AgregarAdopcionFormularioComponent {



  adopcion = new Adopcion();
  usuario = new Usuario();
  mascotaFormControl: FormControl;
  tit: FormControl;
  mot: FormControl;


  desc: FormControl;
  sex: FormControl;
  tam: FormControl;
  raz: FormControl;
  col: FormControl;
  ed: FormControl;

  adoptado: boolean = false;
  //mascota:Mascota;
  mascotas: Mascota[] = [];
  razasList! : string[]
  sexoList! : string[]

  maxDate: Date;
  minDate: Date;


  constructor(private veterinariaService: VeterinariaService, private usuarioService: AuthService, private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<AgregarAdopcionFormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario, private adopcionService: AdopcionService) {

      this.usuario = data;

      const currentYear = new Date().getFullYear();
      const currentDay = new Date().getDate()
      const currentMonth = new Date().getMonth()
  
      this.maxDate = new Date(currentYear, currentMonth, currentDay);
      this.minDate = new Date(this.maxDate.getFullYear() - 25, currentMonth, currentDay)

      this.mascotaFormControl = new FormControl('', [Validators.required]);
      this.tit = new FormControl("", [Validators.required]);
      this.mot = new FormControl("", [Validators.required]);

      this.desc = new FormControl("",[Validators.required]);  
      this.sex = new FormControl("",[Validators.required]);
      this.raz = new FormControl("",[Validators.required]);
      this.tam = new FormControl("",[Validators.required]);
      this.col = new FormControl("",[Validators.required]);
      this.ed = new FormControl('',[Validators.required]); 



  }

  ngOnInit() {
    this.razasList = this.veterinariaService.razasVeterinaria()
    this.sexoList = this.veterinariaService.sexoVeterinaria()

    if (this.usuarioService.islogged()) {
      //Busco al usuario en el localStorage y busco sus mascotas
      this.usuario = this.usuarioService.getUserLogged()
      this.veterinariaService.traerMascotas(this.usuarioService.getUserLogged().id).subscribe(mascotaResponse => {
        for (let i=0; i<mascotaResponse.length; i++){
          if(!mascotaResponse[i].publicado)
            this.mascotas.push(mascotaResponse[i]);
             
         }        
      })
    }
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

  agregarAdopcionForm() {

    //console.log(this.mascotaFormControl.value)


    if (this.tit.valid && this.mot.valid && this.desc.valid && this.raz.valid && this.sex.valid && this.tam.valid && this.col.valid) {

      this.adopcion.titulo = this.tit.value;
      this.adopcion.usuarioId = this.data.id;
      this.adopcion.motivo = this.mot.value;
    
      this.adopcion.mascota = new Mascota();

      this.adopcion.mascota.usuarioId = this.usuario.id;
      this.adopcion.mascota.nombre = "Anonimo"
      this.adopcion.mascota.caracteristicas = this.desc.value;
      this.adopcion.mascota.raza = this.raz.value;
      this.adopcion.mascota.sexo = this.sex.value;
      this.adopcion.mascota.tamanio= this.tam.value;   
      this.adopcion.mascota.color = this.col.value;
      this.adopcion.mascota.edad = this.ed.value;
      this.adopcion.mascota.enAdopcion = true;
    

      this.veterinariaService.agregarMascota(this.adopcion.mascota).subscribe(dato => {
        this.adopcion.mascota = dato;
        this.adopcion.mascotaId = dato.id;
        
        this.adopcionService.agregarAdopcion(this.adopcion).subscribe(dato2 => {         
          this.dialogRef.close(dato2);
        });
      })
      
    
      this._snackBar.open("Se agregó la publicación con éxito", "Cerrar");

    } else {
      this._snackBar.open("Debe completar todos los campos", "Cerrar");
    }
  }
}
