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
    return this.http.get<DonacionARefugio[]>(`${this.url}listarDonacionPerro`);
  }
 
  agregarDonacionesRefugio(DonacionPerro: DonacionARefugio){  
    return this.http.post<DonacionARefugio>(`${this.url}crearDonacionPerro`,DonacionPerro)
  } 
  
  editarDonacionesRefugio(DonacionPerro: DonacionARefugio){
    console.log("llega")
    return this.http.post<DonacionARefugio>(`${this.url}modificarDonacionPerro`,DonacionPerro)
  }
}
