import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mascota } from '../modelo/Mascota';
import { Usuario } from '../modelo/Usuario';
import { Contacto } from '../modelo/Contacto';
import { ResponseHttp } from '../modelo/ResponseHttp';


@Injectable({
  providedIn: 'root'
})
export class VeterinariaService {

  url = 'http://localhost:8080/mascota/'
  constructor(private http: HttpClient) { }

  traerMascotas(id: number) {
    //este get me trae las mascotas de un usuario
    return this.http.get<Mascota[]>(`${this.url}consultarMascotasPorIdDuenio/${id}`);
  }

  editarMascota(mascota: Mascota) {
    return this.http.post<Mascota>(`${this.url}modificarMascota`, mascota);
  }

  agregarMascota(mascota: Mascota) {
    return this.http.post<Mascota>(`${this.url}crearMascota`, mascota)
  }

  contarse(correo: Contacto) {
    return this.http.post<String>("http://localhost:8080/veterinaria/envioEmail", correo);
  }

  traerMascota(id:number){
    return this.http.get<Mascota>(`${this.url}traerMascota/${id}`);
  }

  guardarImg(formData: FormData){
    return this.http.post<ResponseHttp>("http://localhost:8080/media/upload", formData);
  }
  
}
