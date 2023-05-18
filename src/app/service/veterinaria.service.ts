import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mascota } from '../modelo/Mascota';
import { Usuario } from '../modelo/Usuario';


@Injectable({
  providedIn: 'root'
})
export class VeterinariaService {

  url = 'http://localhost:8080/mascota/'
  constructor(private http:HttpClient) { }
  
  traerMascotas(id: number){
    //este get me trae las mascotas de un usuario
    return this.http.get<Mascota[]>(`${this.url}consultarMascotasPorIdDuenio/${id}`);
  }

  editarMascota(mascota: Mascota){
    return this.http.post<Mascota>(`${this.url}modificarMascota`,mascota);
  }
agregarMascota(mascota: Mascota){
  console.log(mascota.usuarioId, " 2")
  return this.http.post<Mascota>(`${this.url}crearMascota`,mascota)
}
  
}
