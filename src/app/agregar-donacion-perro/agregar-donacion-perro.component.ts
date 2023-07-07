import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DonacionPerroService } from '../service/donacion-perro.service';
import { DonacionAPerro } from '../modelo/DonacionAPerro';
import { VeterinariaService } from '../service/veterinaria.service';

@Component({
  selector: 'app-agregar-donacion-perro',
  templateUrl: './agregar-donacion-perro.component.html',
  styleUrls: ['./agregar-donacion-perro.component.css']
})
export class AgregarDonacionPerroComponent {
  donacionAPerro!:DonacionAPerro;
  CBU: FormControl;
  monto: FormControl;
  descripcion: FormControl;
  fechaLimite: FormControl;
  historia:FormControl;

  maxDate: Date;
  photoSelected: string | ArrayBuffer;
  file!: File;
  defaultimg = "../../assets/img/default.jpg"


  constructor( private veterinariaService: VeterinariaService, private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<AgregarDonacionPerroComponent>,

    private donacionPerro: DonacionPerroService) {  
      const currentYear = new Date().getFullYear();
      const currentDay = new Date().getDate()
      const currentMonth = new Date().getMonth()
  
      this.maxDate = new Date(currentYear, currentMonth, currentDay);
      
            
      this.donacionAPerro= new DonacionAPerro();
      this.CBU = new FormControl("",[Validators.required]);
      this.monto = new FormControl("",[Validators.required]);
      this.fechaLimite = new FormControl("",[Validators.required])
      this.descripcion = new FormControl("",[Validators.required]);
      this.historia = new FormControl("",[Validators.required]);
      this.photoSelected=""
  }


  onNoClick(): void {
    
    this.dialogRef.close();
    console.log('aber')
  }

  IsDateValid(){
    let fechaActual = new Date()
    fechaActual.setHours(0, 0, 0, 0)
    if ((this.fechaLimite.value < fechaActual) && this.fechaLimite.value != "") {
      //console.log('la fecha solicitada no puede ser menor a la fecha actual. Es invalida ')
      return true
    } else {
      //console.log('la fecha solicitada es valida ')
      return false
    }
  }

  agregarPaseador() {
    
    if ( this.historia.valid && this.descripcion.valid && this.monto.valid && this.fechaLimite.valid && this.CBU.valid){
       
        this.donacionAPerro.CBU = this.CBU.value;
        this.donacionAPerro.descripcion = this.descripcion.value;
        this.donacionAPerro.fechaLimite = this.fechaLimite.value;
        this.donacionAPerro.historia= this.historia.value;    
        this.donacionAPerro.monto = this.monto.value;      
     
        if(this.photoSelected != ""){
          console.log("debe enviar foto!")
          const formData = new FormData()
          formData.append('file', this.file)
          this.veterinariaService.guardarImg(formData).subscribe( response => {
            //En la BD solo guardo el path. Ej: ejemplo.jpg
            this.donacionAPerro.foto = response.url
            //Se crea la mascota con 
            this.donacionPerro.agregarDonacionPerro(this.donacionAPerro).subscribe(dato =>
              {{console.log(dato)}
               
                  
                   this.dialogRef.close(dato);
                
               
              });
    
        })
      }else{
        this.donacionPerro.agregarDonacionPerro(this.donacionAPerro).subscribe(dato =>
          {{console.log(dato)}
           
              
               this.dialogRef.close(dato);
            
           
          });
        
          this._snackBar.open("La campaña de donacion se agregó con exito", "Cerrar");
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
