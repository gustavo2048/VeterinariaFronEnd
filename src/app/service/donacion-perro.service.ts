import { Injectable } from '@angular/core';
import { DonacionAPerro } from '../modelo/DonacionAPerro';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonacionPerroService {
  url = 'http://localhost:8080/donacionPerro/'
  constructor(private http:HttpClient) { }
  traerDonacionesPerro(){
    //este get me trae las mascotas de un usuario
    return this.http.get<DonacionAPerro[]>(`${this.url}listarDonacionPerro`);
  }
 
  agregarDonacionPerro(DonacionPerro: DonacionAPerro){  
    return this.http.post<DonacionAPerro>(`${this.url}crearDonacionPerro`,DonacionPerro)
  } 
  
  editarDonacionPerro(DonacionPerro: DonacionAPerro){
    console.log("llega")
    return this.http.post<DonacionAPerro>(`${this.url}modificarDonacionPerro`,DonacionPerro)
  }
}
