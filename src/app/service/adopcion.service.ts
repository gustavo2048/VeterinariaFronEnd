import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adopcion } from '../modelo/Adopcion';

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {

  url = 'http://localhost:8080/adopcion/'

  constructor(private http:HttpClient) { }


  traerAdopciones(){
    //este get me trae las mascotas de un usuario
    return this.http.get<Adopcion[]>(`${this.url}listarAdopciones`);
  }

  agregarAdopcion(adopcion: Adopcion){  
    return this.http.post<Adopcion>(`${this.url}crearAdopcion`,adopcion)
  } 

  


}
