import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylehomeComponent } from './stylehome.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { HttpClientModule } from '@angular/common/http';

describe('StylehomeComponent', () => {
  let component: StylehomeComponent;
  let fixture: ComponentFixture<StylehomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StylehomeComponent],
      imports: [
        RouterTestingModule.withRoutes([]),  CoreModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        NoopAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
