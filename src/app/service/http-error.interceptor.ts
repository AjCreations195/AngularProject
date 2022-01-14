import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse}
 from '@angular/common/http';
import { CommonStore } from '../stores/common-store';
import { catchError, observable, Observable, of, tap, throwError } from 'rxjs';
@Injectable(
  { providedIn: 'root' }
)
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(public CommonStore:CommonStore) { }
  public Error: any
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('started interceptor');

    return next.handle(request)
      .pipe(
          catchError((error:HttpErrorResponse ) => {
            console.log(error);
            return throwError(error.error)
              
          }
          )
        )
  }
}
