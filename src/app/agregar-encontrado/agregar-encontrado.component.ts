import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Encontrado } from '../modelo/Encontrado';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EncontradoService } from '../service/encontrado.service';
import { Usuario } from '../modelo/Usuario';
import { Mascota } from '../modelo/Mascota';
import { VeterinariaService } from '../service/veterinaria.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-agregar-encontrado',
  templateUrl: './agregar-encontrado.component.html',
  styleUrls: ['./agregar-encontrado.component.css']
})
export class AgregarEncontradoComponent {
  encontrado !:  Encontrado;
  //razas:Raza[];
  usuario: Usuario = new Usuario()
  fechaEncontrado: FormControl;
  lugar: FormControl;
  descripcion: FormControl;
  genero: FormControl;
  duenio:boolean=false;
  minDate: Date;
  sexo:FormControl;
  tam:FormControl;
  color:FormControl;
  mascotaFormControl: FormControl;
  mascotas: Mascota[] = [];
  mascota:Mascota;
  constructor(private veterinariaService: VeterinariaService,private usuarioService: AuthService, private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<AgregarEncontradoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private encontradoService: EncontradoService) {    
      const currentYear = new Date().getFullYear();
      const currentDay = new Date().getDate()
      const currentMonth = new Date().getMonth()
      this.mascotaFormControl = new FormControl('', [Validators.required]);
      this.minDate = new Date(currentYear, currentMonth, currentDay);
      this.encontrado= new Encontrado();
      this.mascota= new Mascota();
      this.sexo=new FormControl("",[Validators.required]);
      this.tam=new FormControl("",[Validators.required]);
      this.color=new FormControl("",[Validators.required]);
      this.fechaEncontrado = new FormControl("",[Validators.required]);
      this.lugar = new FormControl("",[Validators.required]);
      this.genero = new FormControl("",[Validators.required])
      this.descripcion = new FormControl("",[Validators.required]);
      
     
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
  onNoClick(): void {
    
    this.dialogRef.close();
    console.log('aber')
  }


  IsDateValid(){
    let fechaActual = new Date()
    fechaActual.setHours(0, 0, 0, 0)

    if ((this.fechaEncontrado.value <= fechaActual)) {
      //console.log('la fecha solicitada no puede ser menor a la fecha actual. Es invalida ')
      return false
    } else {
      //console.log('la fecha solicitada es valida ')
      return true
    }
  }
  agregarEncontrado() {
    
    if ( this.descripcion.valid && this.lugar.valid && this.fechaEncontrado.valid && this.sexo.valid && this.color.valid &&  this.tam.valid && this.mascotaFormControl.valid){
      //  this.veterinariaService.traerMascota(this.mascotaFormControl.value).subscribe(dato =>{
      //    console.log(dato)
      //    this.encontrado.masco=dato;
      //   console.log( this.encontrado.masco)
      //  })
       
      this.encontrado.color=this.color.value;
      this.encontrado.sexo=this.sexo.value;
      this.encontrado.tam=this.tam.value;
      this.encontrado.mascotaId= this.mascotaFormControl.value; 
      this.encontrado.genero = this.genero.value;
      this.encontrado.descripcion = this.descripcion.value;
      this.encontrado.lugar = this.lugar.value;
      this.encontrado.fechaEncontrado= this.fechaEncontrado.value;    
      this.encontrado.duenio = this.duenio;      
      this.encontrado.usuarioId= this.data.id;
      console.log(this.encontrado)
      this.encontradoService.agregarEncontrado(this.encontrado).subscribe(dato =>
        {{console.log(dato)}
          
          this.dialogRef.close(dato)
            this._snackBar.open("Se hizo la publicacion  con exito", "Cerrar");
            
          
        });

        //this.location.reload();
    } else{
      this._snackBar.open("Debe completar todos los campos", "Cerrar");
    }

  }
}
