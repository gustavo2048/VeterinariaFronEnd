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
  selector: 'app-agregar-adopcion',
  templateUrl: './agregar-adopcion.component.html',
  styleUrls: ['./agregar-adopcion.component.css']
})
export class AgregarAdopcionComponent {


 
  adopcion = new Adopcion();
  usuario  = new Usuario();
  mascotaFormControl: FormControl;
  tit: FormControl;
  desc: FormControl;
  mot: FormControl;
  sex: FormControl;
  tam: FormControl;
  raz: FormControl;
  adoptado: boolean= false;
  mascota:Mascota;
  mascotas: Mascota[] = [];


  constructor( private veterinariaService: VeterinariaService,private usuarioService: AuthService,private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<AgregarAdopcionComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Usuario,  private adopcionService: AdopcionService) {    
    this.mascotaFormControl = new FormControl('', [Validators.required]);
      this.tit = new FormControl("",[Validators.required]);
      this.desc = new FormControl("",[Validators.required]);
      this.mot = new FormControl("",[Validators.required])
      this.sex = new FormControl("",[Validators.required]);
      this.raz = new FormControl("",[Validators.required]);
      this.tam = new FormControl("",[Validators.required]);
      this.mascota= new Mascota();
    
      
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
  }



  agregarAdopcion() {
    if (this.tit.valid && this.mot.valid && this.mascotaFormControl.valid ){
       this.adopcion.mascotaId=this.mascotaFormControl.value;
        this.adopcion.titulo = this.tit.value;
        this.adopcion.motivo = this.mot.value;    
        
        this.adopcion.usuarioId = this.data.id;            

        this.adopcionService.agregarAdopcion(this.adopcion).subscribe(dato => { this.dialogRef.close(dato);});   
        
       
    } else{
      this._snackBar.open("Debe completar todos los campos", "Cerrar");
    }

  }
}
