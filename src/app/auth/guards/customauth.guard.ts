import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomauthGuard implements CanActivate {
  constructor(private router: Router, private authservice: AuthService) {}
  canActivate(
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authservice.isAuthenticated()) {
      return true;
    } else {
      this.router.navigateByUrl('');
      // location.reload();
    }
    return false;
  }
}
