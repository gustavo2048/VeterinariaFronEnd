import { Injectable,  Renderer2, RendererFactory2 } from '@angular/core';
import { HttpClient, HttpHandler,HttpEvent, HttpRequest, HttpResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerServiceService } from './spinner-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { tap } from "rxjs/operators";
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private renderer: Renderer2;
  constructor(private spinner: NgxSpinnerService, private rendererFactory: RendererFactory2) {
      this.renderer = rendererFactory.createRenderer(null, null);
  }
  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
      const start = performance.now();
      this.showLoader();
      return next.handle(req).pipe(tap(async (event: HttpEvent < any > ) => {
              if (event instanceof HttpResponse) {
                  this.onEnd();
              }
          },
          (err: any) => {
              this.onEnd();
          }));
  }
  private onEnd(): void {
      this.hideLoader();
  }
  private showLoader(): void {
      this.spinner.show();
  }
  private hideLoader(): void {
      this.spinner.hide();
  }

  // constructor(private spinnerService: SpinnerServiceService) { }

  // intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
  //   this.spinnerService.llamarSpinner()
  //   return next.handle(req).pipe(
  //     finalize( () => this.spinnerService.detenerSpinner() )
  //   )
  // }
 
}
