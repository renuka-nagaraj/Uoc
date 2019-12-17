import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  finalOtp: any;
  userId: any;
  modKey: any;
  mobileNumber: any;
  password: any;
  constructor(private route: Router , private appService:  DataService , private _snackBar: MatSnackBar ) {
    this.userId =  this.route.getCurrentNavigation().extras.state.userId;
    this.modKey =  this.route.getCurrentNavigation().extras.state.modKey;
    this.mobileNumber = this.route.getCurrentNavigation().extras.state.mobileNumber;
    this.password = this.route.getCurrentNavigation().extras.state.password;
    sessionStorage.setItem('email' , this.mobileNumber);
    console.log(this.route.getCurrentNavigation().extras.state.userId , this.route.getCurrentNavigation().extras.state.modKey );
   }

  ngOnInit() {
  }
  activateUser(form: NgForm) {
    if (form.invalid) {
      return;
    } else if (form.value.otp.length === 6) {
      console.log('value', form.value.otp);
      this.finalOtp = form.value.otp;
      const userDetails = {
        userId: this.userId,
        modKey: this.modKey,
        tenantName: 'world',
        otp: this.finalOtp
      };
      this.appService.getOtpResponse(userDetails)
      .subscribe(res => {                               // activte user by fetching OTP
        console.log('responsefromotp', res.error.text);
      },
        error => {
          // this._snackBar.open(error.error.text , 'undo' , {duration: 3000});
          // this.toastr.successToastr(error.error.text, 'Alert');
           // this.route.navigateByUrl('login');
          if (error.error.errorMessage === 'Invalid OTP') {
            this.finalOtp = '';
            this._snackBar.open('Invalid OTP' , 'undo' , {duration: 3000});
           // this.toastr.errorToastr('Invalid OTP', 'Alert');
           } else if (error.error.text === 'User has been activated successfully') {
            this._snackBar.open('User has been activated successfully', 'undo' , {duration: 5000});
           // this.route.navigateByUrl('profile');
             form.reset();
             this.route.navigateByUrl('login');
             setTimeout(() => {
              window.location.reload();
               }, 500);
             }
          console.log('success', error.error.errorMessage);
      });
    } else {
    }

  }
}
