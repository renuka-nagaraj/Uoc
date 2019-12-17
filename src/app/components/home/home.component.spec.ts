import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ComponentFactoryResolver, DebugElement } from '@angular/core';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { LoginviewDirective } from 'src/app/auth/directives/loginview.directive';
import { ToastrModule } from 'ng6-toastr-notifications';
import {HttpClientTestingModule} from '@angular/common/http/testing';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
// tslint:disable-next-line: prefer-const
  let componentFactoryResolver: ComponentFactoryResolver ;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, LoginComponent, LoginviewDirective],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot()]
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
          entryComponents: [LoginComponent]
      }
  });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(HomeComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
// tslint:disable-next-line: deprecation
    componentFactoryResolver =  fixture.debugElement.injector.get(ComponentFactoryResolver);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should instantiatе login component correctly', () => {
    component.loadComponent(LoginComponent);
    fixture.detectChanges();
});
});
