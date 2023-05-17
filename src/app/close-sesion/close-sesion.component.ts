import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-close-sesion',
  templateUrl: './close-sesion.component.html',
  styleUrls: ['./close-sesion.component.css']
})
export class CloseSesionComponent {
  
    constructor(public dialog: MatDialog) {}
    
    cerrarSesion(){
      localStorage.clear();
      localStorage.setItem("rol","NOCLIENTE")
        }
    openDialog(): void {
      this.dialog.open(CloseSesionComponent2, {
        width: '10px',
       height:'122220px'
      });
    }
}
  
  export class CloseSesionComponent2 {
    constructor(public dialogRef: MatDialogRef<CloseSesionComponent2>) {}
    
  }

  
  