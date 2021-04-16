import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { config } from '../config'
import { Tokens } from '../auth/tokens';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Router } from '@angular/router';
// import { access } from 'node:fs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  public loggedUser: any;

  constructor(private http: HttpClient ,public router:Router) { }

  login(userCred: any): Observable<boolean> {
    // endPoint='admins/login' ? this.router.routerState.snapshot.url.includes('/admin'):'users/login'
    let endPoint;
    this.router.routerState.snapshot.url.includes('/admin')? endPoint='admins/login' : endPoint='users/login'

    return this.http.post<any>(`${config.apiUrl}/${endPoint}`, userCred)
      .pipe(
        tap(tokens => this.doLoginUser(userCred.username, tokens)),
        mapTo(true),
        // catchError(error => {
        //   alert(error.error);
        //   return of(false);
        // })
        
        );
  }

  logout() {
    let endPoint;
    this.router.routerState.snapshot.url.includes('/admin')? endPoint='admins/logout' : endPoint='users/logout'

    return this.http.post(`${config.apiUrl}/${endPoint}`,
    {'refreshToken': this.getRefreshToken()},{ responseType: 'text'})
    .pipe(
      tap((res) => {
        console.log(res)
        this.doLogoutUser()
      }),
      mapTo(true),
      catchError(error => {
        console.log(error)
        alert(error);
        return of(false);
      }));
  }

  refreshToken() {
    let endPoint;
    this.router.routerState.snapshot.url.includes('/admin')? endPoint='admins/refresh' : endPoint='users/refresh'

    return this.http.post<any>(`${config.apiUrl}/${endPoint}`,
      { 'refreshToken': this.getRefreshToken() })
      .pipe(
        tap((tokens: Tokens) => {
          // console.log("In Refresh : ", tokens)
          this.storeJwtToken(tokens.accessToken);
        }))
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private storeJwtToken(accessToken: string) {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  getJwtToken() {
    // console.log(localStorage.getItem(this.ACCESS_TOKEN))
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }
  public removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
