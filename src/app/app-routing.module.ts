import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { OtpComponent } from './auth/components/register/otp/otp.component';
import { CustomauthGuard } from './auth/guards/customauth.guard';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LoginGuard } from './auth/guards/login.guard';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ViewProfileComponent } from './components/profile-page/view-profile/view-profile.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [LoginGuard] },
  { path: 'login', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
  { path: 'register/otp', component: OtpComponent , canActivate: [LoginGuard] },
  { path: 'profile' , component: ProfilePageComponent , canActivate: [LoginGuard] },
  { path: 'catalogue' , component: CatalogueComponent , canActivate: [LoginGuard] },
  { path: 'viewProfile' , component: ViewProfileComponent , canActivate: [LoginGuard]},
  // {
  //   path: 'document',
  //   loadChildren: '../app/documentation/documentation.module#DocumentationModule',
  //   canActivate: [CustomauthGuard]
  // },
  // {
  //   path: 'styleguide',
  //   loadChildren: '../app/styleguide/styleguide.module#StyleguideModule',
  //   canActivate: [CustomauthGuard],
  // },
  // {
  //   path: 'sidenav',
  //   loadChildren: '../app/sidenav/sidenav.module#SidenavModule',
  //   canActivate: [CustomauthGuard],
  // },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
