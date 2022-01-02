import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse}
 from '@angular/common/http';
import { CommonStore } from '../stores/common-store';
import { catchError, observable, Observable, of, tap, throwError } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Injectable(
  { providedIn: 'root' }
)
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    public toasterService: ToastrService,
    public CommonStore:CommonStore) { }
  public Error: any
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('started interceptor');

    return next.handle(request)
      // .pipe(
      //   tap(evt => {
          // catchError((err: any) => {
            // if (err instanceof HttpErrorResponse) {
            //   try {
            //         this.Error = err
            //     this.toasterService.error(err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
            //   } catch (e) {
            //        this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
            //   }

            // }
            // return of(this.Error);
          // });
        // }
        // ))
  }
}
