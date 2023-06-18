import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler,HttpEvent, HttpRequest, HttpResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerServiceService } from './spinner-service.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private spinner: SpinnerServiceService, ) {
     
  }


  intercept(req: HttpRequest <any> , next: HttpHandler): Observable < HttpEvent < any >> {
    const start = performance.now();
    this.spinner.llamarSpinner();
    //this.showLoader();
    console.log("Interceptando.....")
    return next.handle(req).pipe(finalize( () => this.spinner.detenerSpinner() ));
  }

}
