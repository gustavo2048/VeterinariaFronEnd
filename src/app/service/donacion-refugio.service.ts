import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonacionARefugio } from '../modelo/DonacionARefugio';

@Injectable({
  providedIn: 'root'
})
export class DonacionRefugioService {
  url = 'http://localhost:8080/donacionRefugio/'
  constructor(private http:HttpClient) { }
  traerDonacionesRefugio(){
    //este get me trae las mascotas de un usuario
    return this.http.get<DonacionARefugio[]>(`${this.url}listarDonacionRefugio`);
  }
 
  agregarDonacionesRefugio(DonacionesRefugio: DonacionARefugio){  
    return this.http.post<DonacionARefugio>(`${this.url}crearDonacionRefugio`,DonacionesRefugio)
  } 
  
  editarDonacionesRefugio(DonacionesRefugio: DonacionARefugio){
    console.log("llega")
    return this.http.post<DonacionARefugio>(`${this.url}modificarDonacionRefugio`,DonacionesRefugio)
  }
}
