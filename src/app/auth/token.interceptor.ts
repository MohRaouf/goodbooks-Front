import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, filter, take, switchMap, tap } from 'rxjs/operators';


import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(public authService: AuthService , public router:Router) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let jwtToken = this.authService.getJwtToken();
    if (jwtToken) {
      request = this.addToken(request, jwtToken);
    }

    return next.handle(request).pipe(catchError(error => {

      if (error instanceof HttpErrorResponse && error.status === 401) {

        if(request.url.includes("refresh")) {
          /* Invalid Refresh Token -> Clear Local Storage */
          this.authService.removeTokens() 
          /* Navigate to the Parent Route */
          if(this.router.routerState.snapshot.url.includes('/admin'))
            this.router.navigate(['/admins/login']);
          else this.router.navigate(['/home']);     
        } 

        return this.handle401Error(request, next)

      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          console.log('Token : ', token)
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.accessToken);
          return next.handle(this.addToken(request, token.accessToken));
        })
      );

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(accessToken => {
          return next.handle(this.addToken(request, accessToken));
        })
       
        );
    }
  }
}
