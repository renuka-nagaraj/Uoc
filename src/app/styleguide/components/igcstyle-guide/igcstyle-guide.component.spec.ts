import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IGCStyleGuideComponent } from './igcstyle-guide.component';

import {NgbDropdownModule, NgbDatepickerModule, NgbPaginationModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
describe('IGCStyleGuideComponent', () => {
  let component: IGCStyleGuideComponent;
  let fixture: ComponentFixture<IGCStyleGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IGCStyleGuideComponent ],
      imports: [NgbDropdownModule, NgbDatepickerModule, NgbPaginationModule, NgbTooltipModule, NgMultiSelectDropDownModule,
        FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IGCStyleGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should onItemSelect', () => {
    component.onItemSelect('data');
  });
  it('should onSelectAll', () => {
    component.onSelectAll('data');
  });
});
