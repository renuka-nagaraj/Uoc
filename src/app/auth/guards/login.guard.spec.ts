import { TestBed, async, inject } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard, AuthService],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));
  it('should call can activate', inject([LoginGuard, AuthService], (guard: LoginGuard, service: AuthService) => {
    service.authStatus$.next(false);
     guard.canActivate();
   }));
   it('should call can deactivate', inject([LoginGuard, AuthService], (guard: LoginGuard, service: AuthService) => {
     service.authStatus$.next(true);
      guard.canActivate();
    }));
});
