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
  razasList! : string[]
  sexoList! : string[]
  raza:FormControl;
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
  mascotas: Mascota[] = [];
  mascota:Mascota;
  photoSelected: string | ArrayBuffer;
  file!: File;
  defaultimg = "../../assets/img/default.jpg"
  constructor(private veterinariaService: VeterinariaService,private usuarioService: AuthService, private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<AgregarEncontradoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private encontradoService: EncontradoService) {    
      const currentYear = new Date().getFullYear();
      const currentDay = new Date().getDate()
      const currentMonth = new Date().getMonth()
      this.minDate = new Date(currentYear, currentMonth, currentDay);
      this.encontrado= new Encontrado();
      this.mascota= new Mascota();
      this.raza=new FormControl("",[Validators.required]);
      this.sexo=new FormControl("",[Validators.required]);
      this.tam=new FormControl("",[Validators.required]);
      this.color=new FormControl("",[Validators.required]);
      this.fechaEncontrado = new FormControl("",[Validators.required]);
      this.lugar = new FormControl("",[Validators.required]);
      this.genero = new FormControl("",[Validators.required])
      this.descripcion = new FormControl("",[Validators.required]);
      
      this.photoSelected = ""
  }
 
  ngOnInit() {
    this.razasList = this.veterinariaService.razasVeterinaria()
    this.sexoList = this.veterinariaService.sexoVeterinaria()
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
    
    if ( this.descripcion.valid && this.lugar.valid && this.fechaEncontrado.valid && this.sexo.valid && this.color.valid &&  this.tam.valid && this.raza.valid){
      //  this.veterinariaService.traerMascota(this.mascotaFormControl.value).subscribe(dato =>{
      //    console.log(dato)
      //    this.encontrado.masco=dato;
      //   console.log( this.encontrado.masco)
      //  })
      this.encontrado.raza=this.raza.value;
      this.encontrado.color=this.color.value;
      this.encontrado.sexo=this.sexo.value;
      this.encontrado.tam=this.tam.value;
      this.encontrado.descripcion = this.descripcion.value;
      this.encontrado.lugar = this.lugar.value;
      this.encontrado.fechaEncontrado= this.fechaEncontrado.value;    
      this.encontrado.duenio = this.duenio;      
      this.encontrado.usuarioId= this.data.id;
       //Guardar la imagen del perro si es que lo selecciono
       if(this.photoSelected != ""){
        console.log("debe enviar foto!")
        const formData = new FormData()
        formData.append('file', this.file)
        this.veterinariaService.guardarImg(formData).subscribe( response => {
          //En la BD solo guardo el path. Ej: ejemplo.jpg
          this.encontrado.foto = response.url
          //Se crea la mascota con 
      this.encontradoService.agregarEncontrado(this.encontrado).subscribe(dato =>{   
          this.dialogRef.close(dato)
        });
      })
    }else{
      this.encontradoService.agregarEncontrado(this.encontrado).subscribe(dato =>{   
        this.dialogRef.close(dato)
      });
      this._snackBar.open("Se hizo la publicacion  con exito", "Cerrar")
    }
        //this.location.reload();
    } else{
      this._snackBar.open("Debe completar todos los campos", "Cerrar");
    }

  }


  onPhotoSelected(event: any): void {
    console.log("Se realiza un cambio de imagen")
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e =>  this.photoSelected = reader.result ? reader.result : "";
      console.log(this.file)
      reader.readAsDataURL(this.file);
    }
  }

  cancelarImg(){
    this.photoSelected = ""
  }
}
