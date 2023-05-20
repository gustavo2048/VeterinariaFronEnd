import { Component, Renderer2 } from '@angular/core';
import { Paseador } from '../modelo/Paseador';
import { PaseadorService } from '../service/paseador.service';

@Component({
  selector: 'app-paseador',
  templateUrl: './paseador.component.html',
  styleUrls: ['./paseador.component.css']
})
export class PaseadorComponent {

  paseadores: Paseador [] = [];
  
  constructor(private paseadorService: PaseadorService){

  }

  ngOnInit(){
    
    this.paseadorService.traerPaseadores().subscribe(data  => {       
      this.paseadores = data;       
    })    
  }

  // scrollToSection() {
  //   const element = this.renderer.selectRootElement('#ultimas-publicaciones', true);
  //   element.scrollIntoView({ behavior: 'smooth' });
  // }

}
