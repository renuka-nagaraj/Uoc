import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavhomeComponent } from './sidenavhome.component';
import { RemovewhitespacesPipe } from '../../pipes/removewhitespaces.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SidenavhomeComponent', () => {
  let component: SidenavhomeComponent;
  let fixture: ComponentFixture<SidenavhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavhomeComponent, RemovewhitespacesPipe],
      imports: [RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call select', () => {
    component.select('data', 'data');
  });
});
