import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mascota } from '../modelo/Mascota';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LibretaSanitaria } from '../modelo/LibretaSanitaria';
import { VeterinariaService } from '../service/veterinaria.service';
import moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-libreta-sanitaria',
  templateUrl: './libreta-sanitaria.component.html',
  styleUrls: ['./libreta-sanitaria.component.css']
})
export class LibretaSanitariaComponent {
  mascota!:Mascota;
  libretaS : LibretaSanitaria[] = []

  constructor( private veterinariaService: VeterinariaService,@Inject(MAT_DIALOG_DATA) public data: Mascota){
   this.mascota=data;
  }

   



  downloadPDF(): void{
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('/assets/Logo1.png');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`Libreta Sanitaria de ${this.mascota.nombre}.pdf`);
    });
  }

  
  ngOnInit() {
    this.veterinariaService.libretaSanitaria(this.data.id).subscribe( response => {
      this.libretaS = response
      console.log("datos de libreta")
      console.log(this.libretaS)
    })
  }

  formatDate(fecha : Date){
    return  moment(fecha).format("dddd, D MMMM YYYY")
  }

}


  

