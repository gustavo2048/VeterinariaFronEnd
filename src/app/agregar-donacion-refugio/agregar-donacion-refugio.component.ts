import { Component } from '@angular/core';
import { DonacionARefugio } from '../modelo/DonacionARefugio';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DonacionRefugioService } from '../service/donacion-refugio.service';
import { VeterinariaService } from '../service/veterinaria.service';

@Component({
  selector: 'app-agregar-donacion-refugio',
  templateUrl: './agregar-donacion-refugio.component.html',
  styleUrls: ['./agregar-donacion-refugio.component.css']
})
export class AgregarDonacionRefugioComponent {
  donacionARefugio!:DonacionARefugio;
  CBU: FormControl;
  monto: FormControl;
  contacto: FormControl;
  fechaLimite: FormControl;
  zona:FormControl;
  causa:FormControl;
  maxDate: Date;
  photoSelected: string | ArrayBuffer;
  file!: File;
  defaultimg = "../../assets/img/refugio.png"


  constructor(private veterinariaService:VeterinariaService, private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<AgregarDonacionRefugioComponent>,

    private donacionRefugio: DonacionRefugioService) {  
      const currentYear = new Date().getFullYear();
      const currentDay = new Date().getDate()
      const currentMonth = new Date().getMonth()
  
      this.maxDate = new Date(currentYear, currentMonth, currentDay);
      this.photoSelected = ""
      this.causa= new FormControl("", [Validators.required])
      this.donacionARefugio= new DonacionARefugio();
      this.CBU = new FormControl("",[Validators.required]);
      this.monto = new FormControl("",[Validators.required]);
      this.fechaLimite = new FormControl("",[Validators.required])
      this.contacto = new FormControl("",[Validators.required,Validators.email]);
      this.zona = new FormControl("",[Validators.required]);
      
  }

valid(){
  return this.contacto.value != "";
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
    
    if ( this.causa.valid && this.contacto.valid && this.zona.valid && this.monto.valid && this.fechaLimite.valid && this.CBU.valid){
        this.donacionARefugio.causa=this.causa.value;
        this.donacionARefugio.CBU = this.CBU.value;
        this.donacionARefugio.contacto = this.contacto.value;
        this.donacionARefugio.fechaLimite = this.fechaLimite.value;
        this.donacionARefugio.zona= this.zona.value;    
        this.donacionARefugio.monto = this.monto.value;      
        if(this.photoSelected != ""){
          console.log("debe enviar foto!")
          const formData = new FormData()
          formData.append('file', this.file)
          this.veterinariaService.guardarImg(formData).subscribe( response => {
            //En la BD solo guardo el path. Ej: ejemplo.jpg
            this.donacionARefugio.foto = response.url
            //Se crea la mascota con 
            this.donacionRefugio.agregarDonacionesRefugio(this.donacionARefugio).subscribe(dato =>
              {{console.log(dato)}
               
                  
              this.dialogRef.close(dato);
                 
                
               
              });
        })
      }else{
        this.donacionRefugio.agregarDonacionesRefugio(this.donacionARefugio).subscribe(dato =>
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
