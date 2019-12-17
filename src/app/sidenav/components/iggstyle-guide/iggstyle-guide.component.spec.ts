import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IGGStyleGuideComponent } from './iggstyle-guide.component';
import {NgbDropdownModule, NgbDatepickerModule, NgbPaginationModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('IGGStyleGuideComponent', () => {
  let component: IGGStyleGuideComponent;
  let fixture: ComponentFixture<IGGStyleGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IGGStyleGuideComponent ],
      imports: [NgbDropdownModule, NgbDatepickerModule, NgbPaginationModule, NgbTooltipModule, NgMultiSelectDropDownModule,
        FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IGGStyleGuideComponent);
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
