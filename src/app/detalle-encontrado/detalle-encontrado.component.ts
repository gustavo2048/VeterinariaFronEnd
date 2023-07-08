import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Encontrado } from '../modelo/Encontrado';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EncontradoService } from '../service/encontrado.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VeterinariaService } from '../service/veterinaria.service';
// import { parse, format } from 'date-fns';
@Component({
  selector: 'app-detalle-encontrado',
  templateUrl: './detalle-encontrado.component.html',
  styleUrls: ['./detalle-encontrado.component.css']
})
export class DetalleEncontradoComponent {
  deshabilitado = true;
  razasList! : string[]
  sexoList! : string[]
  
  encontrado!:Encontrado;
  lugar!:FormControl;
  raza!: FormControl;
  sexo!:FormControl;
  tam!:FormControl;
  color!:FormControl;
  fechaEncontrado!:FormControl;
  descripcion!:FormControl;  
  
  minDate: Date;
  fechaFormateada!:Date;

  duenio:boolean=false;
  msj: string;

constructor(private veterinariaService : VeterinariaService,private authService: AuthService,private encontradoService: EncontradoService,private _snackBar: MatSnackBar, public dialog: MatDialog,public dialogRef: MatDialogRef<DetalleEncontradoComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Encontrado){

    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth()

    this.minDate = new Date(currentYear, currentMonth, currentDay);
    this.encontrado = data;
    this.lugar = new FormControl({value: this.encontrado.lugar , disabled: true},[Validators.required]);
    this.descripcion = new FormControl({value: this.encontrado.descripcion , disabled: true},[Validators.required]);   
    this.fechaEncontrado= new FormControl({value: this.encontrado.fechaEncontrado , disabled: true},[Validators.required]);
    this.raza=new FormControl({value: this.encontrado.raza , disabled: true},[Validators.required]);
    this.sexo=new FormControl({value: this.encontrado.sexo, disabled: true},[Validators.required]);
    this.tam=new FormControl({value: this.encontrado.tam , disabled: true},[Validators.required]);
    this.color=new FormControl({value: this.encontrado.color , disabled: true},[Validators.required]);
   

    this.duenio = this.encontrado.duenio;
    this.msj = "Esperando a su familia";
    if (this.duenio){
      this.msj = "Ya encontro a su familia"
    }
     
    this.editarPublicacion();
 
  };

  ngOnInit() {
    this.razasList = this.veterinariaService.razasVeterinaria()
    this.sexoList = this.veterinariaService.sexoVeterinaria()
  }
  

  onNoClick(): void {
    this.dialogRef.close();
    
  }
  yaFueEncontrado(){
    if(this.duenio == true){
      this.duenio = false;
      this.msj = "Ya encontro a su familia";      
    }else{
      this.duenio = true;
      this.msj = "Esperando a su familia";
    }     
  }

  desHabilitar(){
    this.lugar.disable();
    this.raza.disable();
    this.color.disable();
    this.tam.disable();
    this.sexo.disable();
    this.fechaEncontrado.disable();
    this.descripcion.disable();
    this.deshabilitado = true;    
  }
  editarPublicacion(){     
    this.fechaEncontrado.disable();
    this.raza.enable();
    this.color.enable();
    this.tam.enable();
    this.sexo.enable();


    this.lugar.enable();
    this.descripcion.enable();
    this.deshabilitado = false;
    }
  
  fechaValida() :boolean{
    let fechaActual= new Date()
    fechaActual.setHours(0, 0, 0, 0)
    if(this.fechaEncontrado.value > fechaActual)
      return false
    else
      return true      
  }

  enviarEdicion(){      
    
    if (this.descripcion.valid && this.lugar.valid &&  this.fechaValida()  && this.sexo.valid && this.color.valid &&  this.tam.valid && this.raza.valid){
      // this.fechaFormateada = format(this.fechaEncontrado, 'yyyy-MM-dd'
      
      this.encontrado.fechaEncontrado = this.fechaEncontrado.value;
      this.encontrado.descripcion = this.descripcion.value;
      this.encontrado.lugar = this.lugar.value;

      this.encontrado.raza=this.raza.value;
      this.encontrado.color=this.color.value;
      this.encontrado.sexo=this.sexo.value;
      this.encontrado.tam=this.tam.value;

      this.encontrado.duenio= this.duenio;
      if(this.duenio == true){        
      this.msj = "Ya encontro a su familia";    
          
      }else{       
        this.msj = "Esperando a su familia";
      }   
       this.encontradoService.editarEncontrado(this.encontrado).subscribe(data =>  
        
       {console.log(data) 
        
        this._snackBar.open('Se realizaron los cambios','Cerrar');
      }
       )
      
        this.desHabilitar();
        this.onNoClick();
    }
    else{
      this._snackBar.open('La fecha debe ser menor a la actual', 'Cerrar')
    }
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
  cancelarEdicion(){
  
    this.descripcion = new FormControl({value: this.encontrado.descripcion , disabled: true},[Validators.required]);
    this.lugar = new FormControl({value: this.encontrado.lugar , disabled: true},[Validators.required])
    this.fechaEncontrado = new FormControl({value: this.encontrado.fechaEncontrado, disabled: true},[Validators.required]);
    
     
     
      this.duenio = this.encontrado.duenio
      if(this.duenio == true){        
        this.msj = "Ya encontro a su familia";      
      }else{       
        this.msj = "Esperando a su familia";
      }   
    
  
    this.desHabilitar();
  }
  mostrar(roles: string[]){
    return ( roles.includes(this.authService.usertype()));
  }
}
