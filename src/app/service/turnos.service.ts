import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TurnoSolicitud } from '../modelo/turnoSolicitud';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080/turnos';

  solicitarTurno(solicitud: TurnoSolicitud) {
    return this.http.post<TurnoSolicitud>(`${this.url}/crearTurno`, solicitud);
  }

  misTurnosPendientes(id: number) {
    return this.http.get<TurnoSolicitud[]>(`${this.url}/turnosPendientes/${id}`);
  }

}
