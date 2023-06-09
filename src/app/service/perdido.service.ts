import { Injectable } from '@angular/core';
import { Perdido } from '../modelo/Perdido';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerdidoService {
  url = 'http://localhost:8080/perdido/'
  constructor(private http:HttpClient) { }
  traerPerdidos(){
    //este get me trae las mascotas de un usuario
    return this.http.get<Perdido[]>(`${this.url}listarPerdido`);
  }
 
  agregarPerdido(paseador: Perdido){  
    return this.http.post<Perdido>(`${this.url}crearPerdido`,paseador)
  } 
  traerPerdidoMias(id:number){
    //este get me trae las mascotas de un usuario
    return this.http.get<Perdido[]>(`${this.url}listarPerdidoMias/${id}`);
  }
  traerPerdidoAjenas(id:number){
    //este get me trae las mascotas de un usuario
    return this.http.get<Perdido[]>(`${this.url}listarPerdidoAjenas/${id}`);
  }
  editarPerdido(perdido: Perdido){
    console.log("llega")
    return this.http.post<Perdido>(`${this.url}modificarPerdido`,perdido)
  }
}

