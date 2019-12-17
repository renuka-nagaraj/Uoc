import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule , MatFormFieldModule , MatInputModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LoginviewDirective } from './directives/loginview.directive';

import { ToastrModule } from 'ng6-toastr-notifications';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { OtpComponent } from './components/register/otp/otp.component';
@NgModule({
  declarations: [LoginComponent, LoginviewDirective, RegisterComponent, OtpComponent],
  imports: [CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule , MatSnackBarModule,
    ToastrModule.forRoot()],
  entryComponents: [LoginComponent],
  exports: [LoginviewDirective,  MatButtonModule, MatFormFieldModule , MatInputModule , MatIconModule , MatSnackBarModule]
})
export class AuthModule {}
