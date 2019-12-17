import { TestBed, inject } from '@angular/core/testing';
import { CustomauthGuard } from './customauth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
describe('CustomauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomauthGuard, AuthService],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([CustomauthGuard], (guard: CustomauthGuard) => {
    expect(guard).toBeTruthy();
  }));
  it('should call can activate', inject([CustomauthGuard, AuthService], (guard: CustomauthGuard, service: AuthService) => {
   service.authStatus$.next(true);
    guard.canActivate();
  }));
  it('should call can deactivate', inject([CustomauthGuard, AuthService], (guard: CustomauthGuard, service: AuthService) => {
    service.authStatus$.next(false);
     guard.canActivate();
   }));
});
