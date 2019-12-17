import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStatus$: BehaviorSubject<boolean>;
  constructor() {
    if ((sessionStorage.getItem('username') !== null) && (sessionStorage.getItem('password') !== null)) {
      this.authStatus$ = new BehaviorSubject(true);
    } else {
      this.authStatus$ = new BehaviorSubject(false);
    }
  }

  changeStatus(data: boolean) {
    this.authStatus$.next(data);
  }
  isAuthenticated() {
    if (this.authStatus$.getValue()) {
      return true;
    } else {
      // location.reload();
      return false;
    }
  }
}
