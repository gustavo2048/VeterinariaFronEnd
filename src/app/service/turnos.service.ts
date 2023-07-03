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

  misTurnosHistorial(id:number){
     return this.http.get<TurnoSolicitud[]>(`${this.url}/miHistorialTurnos/${id}`);
  }

  turnosSolicitados() {
    return this.http.get<TurnoSolicitud[]>(`${this.url}/turnosSolicitados`)
  }

  turnosConfirmados() {
    return this.http.get<TurnoSolicitud[]>(`${this.url}/turnosConfirmados`)
  }

  turnosHistorial() {
    return this.http.get<TurnoSolicitud[]>(`${this.url}/turnosHistorial`)
  }

  numeroTurnosDia(dia: Date) {
    return this.http.post<number>(`${this.url}/turnosDia`, dia)
  }

  AsignarFecha(turno: TurnoSolicitud) {
    return this.http.post<TurnoSolicitud>(`${this.url}/asignarFecha`, turno)
  }

  anularTurno(turno: TurnoSolicitud) {
    return this.http.post<TurnoSolicitud>(`${this.url}/anularTurno`, turno)
  }

  listadoTurnosHoy(){
    return this.http.get<TurnoSolicitud[]>(`${this.url}/listadoTurnosDia`)
  }

}
