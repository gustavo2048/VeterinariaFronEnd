import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mascota } from '../modelo/Mascota';

@Injectable({
  providedIn: 'root'
})
export class VeterinariaService {

  url = 'http://localhost:8080/mascota/'
  constructor(private http:HttpClient) { }
  
  traerMascotas(id: number){
    //este get me trae las mascotas de un usuario
    return this.http.get<Mascota[]>(`${this.url}consultarMascotasPorIdDuenio/${id}`)
  }

  
}
