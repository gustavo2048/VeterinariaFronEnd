import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuidador } from '../modelo/Cuidador';

@Injectable({
  providedIn: 'root'
})
export class CuidadorService {

  url = 'http://localhost:8080/cuidador/'

  constructor(private http:HttpClient) { }

  traerCuidadores(){
    //este get me trae las mascotas de un usuario
    return this.http.get<Cuidador[]>(`${this.url}listarCuidador`);
  }
  traerCuidadorId(id: number){
    return this.http.get<Cuidador>(`${this.url}traerCuidador/${id}`);
  }
  agregarCuidador(cuidador: Cuidador){  
    return this.http.post<Cuidador>(`${this.url}agregarCuidador`,cuidador)
  } 
  editarCuidador(cuidador: Cuidador){   
    return this.http.post<Cuidador>(`${this.url}modificarCuidador`,cuidador)
  }

}
