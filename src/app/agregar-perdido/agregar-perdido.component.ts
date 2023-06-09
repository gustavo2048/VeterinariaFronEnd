import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Perdido } from '../modelo/Perdido';
import { PerdidoService } from '../service/perdido.service';
import { Usuario } from '../modelo/Usuario';
import { Mascota } from '../modelo/Mascota';
import { AuthService } from '../service/auth.service';
import { VeterinariaService } from '../service/veterinaria.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-agregar-perdido',
  templateUrl: './agregar-perdido.component.html',
  styleUrls: ['./agregar-perdido.component.css']
})
export class AgregarPerdidoComponent {
  perdido !:  Perdido;
  
  usuario: Usuario = new Usuario()
  fechaPerdido: FormControl;
  lugar: FormControl;
  descripcion: FormControl;
  genero: FormControl;
  encontrado:boolean=false;
  mascotas: Mascota[] = [];
  minDate: Date;
  mascotaFormControl: FormControl;
  mascota:Mascota;
  i:Number=0;
  
  constructor( private veterinariaService: VeterinariaService,private _snackBar: MatSnackBar,private usuarioService: AuthService, public dialog: MatDialog, public dialogRef: MatDialogRef<AgregarPerdidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private perdidoService: PerdidoService) {    
      const currentYear = new Date().getFullYear();
      const currentDay = new Date().getDate()
      const currentMonth = new Date().getMonth()
      this.mascota= new Mascota();
      this.mascotaFormControl = new FormControl('', [Validators.required]);
      this.minDate = new Date(currentYear, currentMonth, currentDay);
      this.perdido= new Perdido();
      this.fechaPerdido = new FormControl("",[Validators.required]);
      this.lugar = new FormControl("",[Validators.required]);
      this.genero = new FormControl("",[Validators.required])
      this.descripcion = new FormControl("",[Validators.required]);
   
      
  }


  ngOnInit() {
    if (this.usuarioService.islogged()) {
      //Busco al usuario en el localStorage y busco sus mascotas
      this.usuario = this.usuarioService.getUserLogged()
      this.veterinariaService.traerMascotas(this.usuarioService.getUserLogged().id).subscribe(mascotaResponse => {
        console.log(mascotaResponse)
         for (let i=0; i<mascotaResponse.length; i++){
          if(!mascotaResponse[i].publicado)
            this.mascotas.push(mascotaResponse[i]);
             
         }
        
       // LO QUE QUIERO HACER ES QUE NO ME TRAIGA LAS PUBLICACIONES DE PERDIDOS QUE ESTAN ECHAS
       // tengo que filtrar por publicaciones y si lo encontro volverlo a listar.
        });
    }
    }
  onNoClick(): void {
    
    this.dialogRef.close();
    console.log('aber')
  }


  IsDateValid(){
    let fechaActual = new Date()
    fechaActual.setHours(0, 0, 0, 0)
    if ((this.fechaPerdido.value <= fechaActual)) {
      //console.log('la fecha solicitada no puede ser menor a la fecha actual. Es invalida ')
      return false
    } else {
      //console.log('la fecha solicitada es valida ')
      return true
    }
  }
  agregarPerdido() {
    console.log(this.mascotaFormControl)
    if (this.descripcion.valid && this.lugar.valid && this.fechaPerdido.valid &&  this.mascotaFormControl.valid ){
      this.perdido.mascotaId= this.mascotaFormControl.value;
      this.perdido.genero = this.genero.value;
        this.perdido.descripcion = this.descripcion.value;
        this.perdido.lugar = this.lugar.value;
        this.perdido.fechaPerdido= this.fechaPerdido.value;    
        this.perdido.usuarioId= this.data.id;
        this.perdido.encontrado= this.encontrado
        console.log(this.perdido)
         this.perdidoService.agregarPerdido(this.perdido).subscribe(dato =>
          {{console.log(dato)}  
              dato.mascota.publicado=true;
              this.dialogRef.close(dato)
               this._snackBar.open("Se agrego la publicacion con exito", "Cerrar");    
           });

        //this.location.reload();
    } else{
      this._snackBar.open("Debe completar todos los campos", "Cerrar");
    }

  }
}
