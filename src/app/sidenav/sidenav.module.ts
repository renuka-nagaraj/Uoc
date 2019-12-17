import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavRoutingModule } from './sidenav-routing.module';
import { SidenavhomeComponent } from './components/sidenavhome/sidenavhome.component';
import { RemovewhitespacesPipe } from '../sidenav/pipes/removewhitespaces.pipe';
import { NgbModule, NgbDropdownModule, NgbDatepickerModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IGCStyleGuideComponent } from './components/igcstyle-guide/igcstyle-guide.component';
import { IGGStyleGuideComponent } from './components/iggstyle-guide/iggstyle-guide.component';
import {SharedModule} from '../shared/shared.module';
@NgModule({
  declarations: [SidenavhomeComponent, RemovewhitespacesPipe, IGGStyleGuideComponent, IGCStyleGuideComponent],
  imports: [
    CommonModule,
    SidenavRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    NgbTooltipModule,
    SharedModule
  ],
  exports: [RemovewhitespacesPipe]
})
export class SidenavModule { }
