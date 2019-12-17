import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import {RouterTestingModule} from '@angular/router/testing';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  // const mockRouter = {
  //   navigate: jasmine.createSpy('navigate')
  // };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
    TestBed.overrideModule(HeaderComponent, {
      set: {
          entryComponents: [LoginComponent]
      }
  });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should define logout', () => {
    component.logout();
  });
  it('should define checkRoute', () => {
    component.checkRoute(false);
  });
  it('should define getRouterSnap', () => {
    component.getRouterSnap('data');
  });
  it('should define getAppDetail', () => {
    component.getAppDetail();
  });
});
