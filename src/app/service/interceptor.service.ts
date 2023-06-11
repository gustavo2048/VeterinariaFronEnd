import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler,HttpEvent, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log("inicia")
    return next.handle(req).pipe(
      finalize( () => console.log("finaliza la carga") )
    )
  }
 
}
