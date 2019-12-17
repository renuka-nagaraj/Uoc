import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule , MatAutocompleteModule , MatSelectModule ,
   MatInputModule, MatGridListModule, MatButtonModule , MatTabsModule , MatChipsModule , MatDatepickerModule ,
   MatNativeDateModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import {NgbDropdownModule, NgbDatepickerModule, NgbPaginationModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {StyleguideModule} from './styleguide/styleguide.module';
import { MaterialModule } from './material.module';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { PersonalDetailsComponent } from './components/profile-page/personal-details/personal-details.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ViewProfileComponent } from './components/profile-page/view-profile/view-profile.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, PagenotfoundComponent, ProfilePageComponent, PersonalDetailsComponent, CatalogueComponent,
     ViewProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingBarModule,
    LoadingBarRouterModule,
    AuthModule,
    CoreModule,
    StyleguideModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    NgbTooltipModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule , MatAutocompleteModule , MatSelectModule , MatInputModule, MatGridListModule , MatButtonModule, MatTabsModule ,
    MatChipsModule , MatDatepickerModule ,  MatNativeDateModule , MatCheckboxModule, MatTooltipModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MaterialModule
  ],
  exports: [
    MatFormFieldModule , MatAutocompleteModule , MatSelectModule , MatInputModule, MatGridListModule , MatButtonModule , MatTabsModule
    , MatChipsModule , MatDatepickerModule , MatCheckboxModule , MatTooltipModule

  ],
  providers: [ MatDatepickerModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
