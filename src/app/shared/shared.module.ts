import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TrapScrollDirective } from './directives/trap-scroll.directive';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [TrapScrollDirective],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule
  ],
  exports: [TrapScrollDirective]
})
export class SharedModule { }
