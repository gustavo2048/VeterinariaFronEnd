import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private paseadoresButtonClickSubject = new Subject<void>();
  private adopcionesButtonClickSubject = new Subject<void>();

  paseadoresButtonClick$ = this.paseadoresButtonClickSubject.asObservable();

  adopcionesButtonClick$ = this.adopcionesButtonClickSubject.asObservable();

  triggerPaseadoresButtonClick() {
    this.paseadoresButtonClickSubject.next();
  }
  triggerAdopcionesButtonClick(){
    this.adopcionesButtonClickSubject.next();
  }
}
