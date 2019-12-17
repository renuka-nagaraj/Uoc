import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataService } from 'src/app/shared/services/data.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { empty, Subscriber } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('password') passId: ElementRef;
  @ViewChild('showicon') showiconId: ElementRef;
  passwordHide = false;
  hide = true;
  userData: any;
  selectedSkill: any;
  selectedFollowingDomain: any;
  continueHide = true;
  constructor(
    private route: Router,
    private formbuilder: FormBuilder,
    private service: AuthService,
    public toastr: ToastrManager,
    private appService: DataService,
    private _snackBar: MatSnackBar
  ) {
    sessionStorage.clear();
    this.service.changeStatus(false);
  }

  ngOnInit() {}

  login(form: NgForm) {
    //     if (form.invalid) {
    //       this._snackBar.open('Please enter valid details', 'undo' , { duration: 3000});
    //       return;
    //     } else {
    //       if (form.value.email !== null && form.value.password !== null) {
    //         sessionStorage.setItem('email' , form.value.email);
    //         setTimeout(() => {
    //           const sessionValues = {
    //             firstName: form.value.email + '@@world',
    //             password: form.value.password
    //           };
    //           this.appService.session(sessionValues).subscribe(data => {
    //            // this.showSpinner = false;
    //             console.log('sessionValue', data);
    //             this.route.navigateByUrl('profile');
    //             setTimeout(() => {
    //               window.location.reload();
    //                }, 200);
    //             if (data.headers.get('X-SESSIONID')) {
    //               console.log('sessionvalue', data.headers.get('X-SESSIONID'));
    //               localStorage.setItem('session_id', data.headers.get('X-SESSIONID'));
    //               sessionStorage.setItem('session_id', data.headers.get('X-SESSIONID'));
    //             }
    //       },
    //       error => {
    //         this._snackBar.open(error.error.errorMessage , 'undo' , { duration: 3000});
    //         // this.toastr.errorToastr(error.error.errorMessage, 'Alert!');
    //         form.reset();
    //         }
    //       );
    //     }, 500);
    //   }
    // }

    if (form.invalid) {
      this._snackBar.open('Please enter valid details', 'undo', {
        duration: 3000
      });
    } else {
      console.log(form.value.Number, form.value.password);
      // this.getOtp(form.value.Number , form.value.password);
      // sessionStorage.setItem('email' , form.value.number);
      // Subscriber(data=>{},error=>{},comp=>{});
      this.appService
        .otpBasedSession(form.value.Number, form.value.password)
        .subscribe(
          session => {
            console.log('login successfully logedin', session);

            sessionStorage.setItem(
              'session_id',
              session.headers.get('X-SESSIONID')
            );
            if (session.headers.get('X-SESSIONID')) {
              console.log('sessionvalue', session.headers.get('X-SESSIONID'));
              localStorage.setItem('session_id', session.headers.get('X-SESSIONID'));
              sessionStorage.setItem('session_id', session.headers.get('X-SESSIONID'));
            }
          },
          error => {
            console.log('error', error);
          },
          () => {
            this.appService
              .getUserDetails(form.value.Number)
              .subscribe(data => {
                this.userData = data;
                console.log('login in uservalue', data);

                if (this.userData.hasOwnProperty('person')) {
                  this.route.navigateByUrl('catalogue');
                } else {
                  this.route.navigateByUrl('profile');
                }
                // setTimeout(() => {

                //  }, 500);
              }, error => {
                console.log('error' , error);
              });
          }
        );
    }
  }

  getOtp(number) {
    console.log('form values', number.viewModel);
    sessionStorage.setItem('email', number.viewModel);
    if (number.viewModel !== '') {
      console.log('not empty');
      this.appService.mobileNumberBasedOtp(number.viewModel).subscribe(
        data => {
          console.log('otp details', data);
        },
        error => {
          console.log('error from getotp');
          // this._snackBar.open(error.error.errorMessage, 'undo' , { duration: 3000});
          this.passwordHide = true;
          this.continueHide = false;
        }
      );
    } else {
      console.log('null');
      this.passwordHide = false;
        this._snackBar.open('Please Enter Valid mobile number', 'undo', {
        duration: 3000
      });
    }
  }
}
