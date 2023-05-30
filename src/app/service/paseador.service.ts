import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paseador } from '../modelo/Paseador';

@Injectable({
  providedIn: 'root'
})
export class PaseadorService {

  url = 'http://localhost:8080/paseador/'

  constructor(private http:HttpClient) { }

  traerPaseadores(){
    //este get me trae las mascotas de un usuario
    return this.http.get<Paseador[]>(`${this.url}listarPaseador`);
  }
  traerPaseadorId(id: number){
    return this.http.get<Paseador>(`${this.url}traerPaseador/${id}`);
  }
  agregarPaseador(paseador: Paseador){  
    return this.http.post<Paseador>(`${this.url}agregarPaseador`,paseador)
  } 
}
