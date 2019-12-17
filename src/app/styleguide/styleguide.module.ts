import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleguideRoutingModule } from './styleguide-routing.module';
import { StylehomeComponent } from './components/stylehome/stylehome.component';
import { IGGStyleGuideComponent } from './components/iggstyle-guide/iggstyle-guide.component';
import { IGCStyleGuideComponent } from './components/igcstyle-guide/igcstyle-guide.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule, NgbDatepickerModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [StylehomeComponent, IGGStyleGuideComponent, IGCStyleGuideComponent],
  imports: [
    CommonModule,
    StyleguideRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    NgbTooltipModule
  ],
  exports: [StylehomeComponent, IGGStyleGuideComponent, IGCStyleGuideComponent]
})
export class StyleguideModule { }
