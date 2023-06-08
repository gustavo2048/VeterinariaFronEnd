import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Encontrado } from '../modelo/Encontrado';

@Injectable({
  providedIn: 'root'
})
export class EncontradoService {


  url = 'http://localhost:8080/encontrado/'
  constructor(private http:HttpClient) { }
  traerEncontrado(){
    //este get me trae las mascotas de un usuario
    return this.http.get<Encontrado[]>(`${this.url}listarEncontrado`);
  }
 
  agregarEncontrado(paseador: Encontrado){  
    return this.http.post<Encontrado>(`${this.url}crearEncontrado`,paseador)
  } 
  traerEncontradoMias(id:number){
    //este get me trae las mascotas de un usuario
    return this.http.get<Encontrado[]>(`${this.url}listarEncontradoMias/${id}`);
  }
  traerEncontradoAjenas(id:number){
    //este get me trae las mascotas de un usuario
    return this.http.get<Encontrado[]>(`${this.url}listarEncontradoAjenas/${id}`);
  }
  editarEncontrado(encontrado: Encontrado){
    console.log("llega")
    return this.http.post<Encontrado>(`${this.url}modificarEncontrado`,encontrado)
  }
}

