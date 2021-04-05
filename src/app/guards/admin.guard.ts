import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/admins/login']);
    }
    return this.authService.isLoggedIn();
    
    // return this.canLoad();
  }

  // canLoad() {
  //   if (!this.authService.isLoggedIn()) {
  //     this.router.navigate(['/admins/login']);
  //   }
  //   return this.authService.isLoggedIn();
  // }
}
