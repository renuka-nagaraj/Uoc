import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { HelpComponent } from 'src/app/documentation/help/help.component';
import { DocumentationModule } from 'src/app/documentation/documentation.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { DataService } from 'src/app/shared/services/data.service';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'styleguide', component: HelpComponent } // mock
        ]),
        DocumentationModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      providers: [DataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should define login', () => {
    component.login();
    component.loginForm.controls['name'].setValue(component.uname);
    component.loginForm.controls['password'].setValue(component.pwd);
    expect(component.loginForm.controls['name'].value).toEqual(component.uname);
    expect(component.loginForm.controls['password'].value).toEqual(
      component.pwd
    );
    if (
      component.loginForm.get('name').value === component.uname &&
      component.loginForm.get('password').value === component.pwd
    ) {
      expect(component.showSpinner).toBeFalsy();
    }
  });
  it('should define showpassword', () => {
    component.showPassword();
  });
  it('form should be invalid', async(() => {
    component.loginForm.controls['name'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  }));

  it('login call', async(() => {
    const route = TestBed.get(Router);
    spyOn(route, 'navigateByUrl').and.callThrough();
    component.loginForm.controls['name'].setValue('test');
    component.loginForm.controls['password'].setValue('password');
    component.uname = 'test';
    component.pwd = 'password';
    component.login();
  }));
  it('login call uname password not match', () => {
    component.loginForm.controls['name'].setValue('hello');
    component.loginForm.controls['password'].setValue('pass');
    component.uname = 'test';
    component.pwd = 'password';
    component.login();
  });
  it('login call uname empty password match', () => {
    component.loginForm.controls['name'].setValue('');
    component.loginForm.controls['password'].setValue('password');
    component.uname = 'test';
    component.pwd = 'password';
    component.login();
  });
  it('login call uname not match password match', () => {
    component.loginForm.controls['name'].setValue('hello');
    component.loginForm.controls['password'].setValue('password');
    component.uname = 'test';
    component.pwd = 'password';
    component.login();
  });

  it('login call uname match password empty', () => {
    component.loginForm.controls['name'].setValue('test');
    component.loginForm.controls['password'].setValue('');
    component.uname = 'test';
    component.pwd = 'password';
    component.login();
  });
  it('login call uname match password not match', () => {
    component.loginForm.controls['name'].setValue('test');
    component.loginForm.controls['password'].setValue('pass');
    component.uname = 'test';
    component.pwd = 'password';
    component.login();
  });
});
