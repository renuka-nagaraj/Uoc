import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router , NavigationExtras } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
hide1: true;
hide2: true;
getUserDetails: any;
  constructor(private route: Router , private _snackBar: MatSnackBar , private appService: DataService) { }

  ngOnInit() {
  }
  addRegisterDetails(form: NgForm) {
     if (form.invalid) {
       console.log('value not present');
       this._snackBar.open('Please enter valid details', 'undo' , { duration: 2000});
      return;
    } else {
     // console.log('values' , form.value);
      if ( form.value.email !== '' && form.value.password !== '') {
        setTimeout(() => {
          const registerDetails = {                                // for  createuser
            firstName: form.value.firstName,
            lastName: form.value.lastName,
            id: 0,
            password: form.value.password,
            isActive: true,
           // login: form.value.email,
           login: form.value.number,
            userContacts: [                                    // json values to post user data
              {
                contact: {
                  contactType: {
                    dataCode: 'CONTACT_TYPE.MOBILE',
                    globalRefClass: {
                      classCode: 'GREF.CONTACT_TYPE'
                    },
                    isActive: true,
                    label: '',
                    language: {
                      language: 'English',
                      languageCode: 'ENG'
                    }
                  },
                  contactValue: form.value.number,
                  id: 0,
                  isActive: true,
                  verified: true
                },
                id: 0,
                isActive: true,
                primaryContact: true,
                user: {
                  id: 0,
                  login: 'user'
                }
              },
              {
                contact: {
                  contactType: {
                    dataCode: 'CONTACT_TYPE.MAIL',
                    globalRefClass: {
                      classCode: 'GREF.CONTACT_TYPE'
                    },
                    isActive: true,
                    label: '',
                    language: {
                      language: 'English',
                      languageCode: 'ENG'
                    }
                  },
                  contactValue: form.value.email,
                  id: 0,
                  isActive: true,
                  verified: true
                },
                id: 0,
                isActive: true,
                primaryContact: true,
                user: {
                  id: 0,
                  login: 'user'
                }
              }
            ]
          };
          console.log('registerDetails' , registerDetails);
          this.appService.registration(registerDetails).subscribe(data => {
           // this.showSpinner = false;
            this.getUserDetails = data;
            const navigationExtras: NavigationExtras = {state: {userId: this.getUserDetails.body.id,
              modKey: this.getUserDetails.body.responseDTO.modKey , mobileNumber: form.value.number , password:  form.value.password}};
           this.route.navigateByUrl('register/otp');
           this.route.navigate(['register/otp'], navigationExtras);
            form.resetForm();
            console.log('register result' , data);
          },
          error => {
            console.log('error');
            this._snackBar.open(error.error.errorMessage, 'undo' , { duration: 3000});
            form.resetForm();
          }
         );
        }, 500);
      }
    }
  }
}
