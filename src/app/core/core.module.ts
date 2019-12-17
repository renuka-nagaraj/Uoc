import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatButtonModule , MatFormFieldModule , MatInputModule, MatIconModule,
   MatSnackBarModule, MatToolbarModule, MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    CoreRoutingModule , MatButtonModule , MatFormFieldModule , MatInputModule, MatIconModule,
     MatSnackBarModule, MatToolbarModule, MatSelectModule
  ],
  exports: [HeaderComponent, FooterComponent, MatButtonModule , MatFormFieldModule ,
     MatInputModule, MatIconModule, MatSnackBarModule, MatToolbarModule, MatSelectModule]
})
export class CoreModule { }
