import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarjeta } from '../modelo/Tarjeta';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  url = 'http://localhost:8080/tarjeta/'
  constructor(private http:HttpClient) { }
  
  tarjeta(tarjeta:Tarjeta){
    return this.http.post<Tarjeta>(`${this.url}crearTarjeta`,tarjeta);
  }
}
