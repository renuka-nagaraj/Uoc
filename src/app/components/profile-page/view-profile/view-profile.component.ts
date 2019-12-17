import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../shared/services/data.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  userData: any;
  userName: any;
  aboutMe: any;
  occupation: any;
  socialNetworkLable = [];
  socialMediaLink = [];
  showPic: boolean;
  notShowPic: boolean;
  url: string;

  constructor( private appService: DataService) { }
  userEmail = sessionStorage.getItem('email');

  ngOnInit() {
    this.appService.getUserDetails(this.userEmail).subscribe( data => {
      this.userData = data;
      // get username
      this.userName = this.userData.firstName.charAt(0).toUpperCase() + this.userData.firstName.slice(1);
      // about person
      this.aboutMe = this.userData.person.notes;
      // person occupation
      this.occupation = this.userData.person.personProfile.occupation;
      // getting social medias and links
      for ( let i = 0; i < this.userData.person.personSocialMedia.length; i++ ) {
        this.socialNetworkLable.push(this.userData.person.personSocialMedia[i].socialMediaAccount.socialMediaType.label);
        this.socialMediaLink.push({ 'lable' : this.userData.person.personSocialMedia[i].socialMediaAccount.socialMediaType.label ,
        'link' : this.userData.person.personSocialMedia[i].socialMediaAccount.socialMediaValue});
      }
      console.log('socialmedia vales' , this.socialNetworkLable, this.socialMediaLink);
      sessionStorage.setItem('userName' , this.userName);
      sessionStorage.setItem('id', this.userData.id);
      console.log('userDetails',  this.userData , 'aboutme' ,  this.aboutMe, this.occupation , 'network' ,  this.socialNetworkLable);

      this.appService.getUserContactDetails(this.userData.id).subscribe( data1 => {
        // this.contactValue = data1[0]['contact']['contactValue'];
         console.log('contact value', data1[0]['contact']['contactValue']);
      });

      this.appService.getProfilePic(this.userData.id).subscribe(data1 => {
        // this.pic = data1;
         //  this.url = 'data:image/jpeg;base64,' + data1;
         this.showPic = true;
         this.notShowPic = false;
         this.url = 'data:image/jpeg;base64,' + data1;
       console.log('img', this.url);
      });
      sessionStorage.setItem('firstName' , this.userData.firstName);
      sessionStorage.setItem('lastName' , this.userData.lastName);
      sessionStorage.setItem('id', this.userData.id);
     // console.log('id' , this.id)
    });

  }

}
