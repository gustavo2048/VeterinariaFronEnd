import { Component, ElementRef } from '@angular/core';
import { NavbarService } from '../service/navbar.service';
import { PaseadorService } from '../service/paseador.service';
import { Paseador } from '../modelo/Paseador';
import { Adopcion } from '../modelo/Adopcion';
import { AdopcionService } from '../service/adopcion.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  ultimosPaseadores!: Paseador[];
  ultimasAdopciones!: Adopcion[];
  // ultimosDonaciones: Donaciones[];
  // ultimosperroPerdido: perroPerdido[];
  // ultimosperroEncontrado: perroEncontrado[];
  constructor(private AuthService: AuthService,private router: Router, private elementRef: ElementRef,private navbarService: NavbarService,private paseadorService: PaseadorService,private  adopcionService: AdopcionService){


  }
  ngOnInit() {
    this.navbarService.paseadoresButtonClick$.subscribe(() => {
      this.scrollToSection();
    });
    this.navbarService.adopcionesButtonClick$.subscribe(() =>{
      this.scroollAdopcion();
    });
    this.obtenerUltimosPaseadores();
    this.obtenerUltimasAdopciones();
  }
  obtenerUltimasAdopciones(){
    this.adopcionService.traerAdopciones().subscribe(
      adopciones => {
        // Ordenar los paseadores por fecha descendente
        //paseadores.sort((a, b) => b.fechaPublicacion.getTime() - a.fechaPublicacion.getTime());
  
        // Obtener solo los últimos cuatro paseadores
        this.ultimasAdopciones = adopciones.slice(0, 4);
      },
      error => {
        console.error('Error al obtener los últimos paseadores:', error);
      }
    );
  }
  obtenerUltimosPaseadores() {
    this.paseadorService.traerPaseadores().subscribe(
      paseadores => {
        // Ordenar los paseadores por fecha descendente
        //paseadores.sort((a, b) => b.fechaPublicacion.getTime() - a.fechaPublicacion.getTime());
  
        // Obtener solo los últimos cuatro paseadores
        this.ultimosPaseadores = paseadores.slice(0, 4);
      },
      error => {
        console.error('Error al obtener los últimos paseadores:', error);
      }
    );
  }
  
  scroollAdopcion(){
    if (this.router.url === '/home') {
      const element = document.getElementById('ultimas-publicaciones-adopciones');
      if (element != null) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      this.router.navigate(['/adopciones']);
    }
  }
  

  scrollToSection() {
   
    //  const element = document.getElementById('ultimas-publicaciones-paseadores');
    
    //  element?.scrollIntoView({ behavior: 'smooth' });

    if (this.router.url === '/home') {
      const element = document.getElementById('ultimas-publicaciones-paseadores');
      if (element != null) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      this.router.navigate(['/paseadores']);
    }
  }
  isLogged(){
    return this.AuthService.islogged();
  }
}
  
