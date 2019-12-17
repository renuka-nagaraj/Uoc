import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
// import { FormControl, NgForm } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormControlDirective } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userData: any;
  userName: string;
  newDomainId: any;
  followingDomain: any;
  showDomainNames = false;
  notShowDomainNames = false;
  skillActive: any;
  interestActive: any;
  showDomain = false;
  domainNames: any;
  domainTitle = [];
  domainId = [];
  showButton = true;
  followedDomain = [];
  contactValue: any;
  findAge: any;
  followingPerticularDomain = [];
  followingPerticularDomainId = [];
  finalDomains = [];
  finalDomainsArrayList = [];
  showSkillDetails = false;
  notShowHardskillsNames = false;
  showHardSkillNames = false;
  notShowSoftSkillsNames = false;
  showSoftSkillNames = false;
  showSkillDetailsActive: any;
  hardSkills: any;
  hardSkillsList = [];
  softSkills: any;
  softskillsList = [];
  finalFollowingDomain = [];
  idValues = [];
  interestedDomain: any;
  count: any;
  color1 = '#5856D6';
  color2 = 'white';
  sortingValue = [];
  finalIdValues = [];
  newFilteredSelectedValue = [];
  remainingValue = [];
  clossedValue = [];
  clossedIdValue = [];
  addedHardSkills = [];
  addedSoftSkills = [];
  userName1: any;
  selectedSkill: any;
selectedSoftSkills = [];
selectedSoftSkillsId = [];
selectedHardSkills = [];
selectedHardSkillsId = [];
finalFollowingSoftSkills = [];
finalFollowingHardSkills = [];
finalRemainingSkills = [];
finalRemainingHardSkills = [];
softSkillsTittle = [];
softSkillsId = [];
hardSkillsTitle = [];
hardSkilsId = [];
newFilteredClosedValue = [];
userSoftSkillId = [];
userHardSkillId = [];
 colorValue: any;
  profilePic_flag: boolean;
  fileSelectData: any;
  userIcon: any;
  url: any;
  showPic = false;
  notShowPic = true;
  date  =  new  FormControl(new  Date());
  language: any;
  city: any;
  createSocialMediaNetwork = [];
  updatedResults: Object;
  isReadOnly: boolean;
  socialNetworks: any;
  selectedCity: any;
  firstName: FormControl;
  lastName: FormControl;
  dateofbirth: FormControl;
  selectedlanguage: FormControl;
  selectedcity: FormControl;
  pincode: FormControl;
  profileForm: FormGroup;
  aboutMe: FormControl;
  gender: FormControl;
  occupation: FormControl;
  socialNetwork: FormControl;
  link: FormControl;
  socialnetwork: FormArray;
  userFirstName: any;
  userLastName: any;
  read: FormControl;
  speak: FormControl;
  write: FormControl;
  selectedFollowingDomain: any;
  cntValue: any;
  mailId: any;
  constructor( private appService: DataService ,  private _snackBar: MatSnackBar, private route: Router,
     private formbuilder: FormBuilder) { }
    userEmail = sessionStorage.getItem('email');
  // userEmail = 7588287021;
  ngOnInit() {
   // console.log('profile form' , this.profileForm);
   this.createForm();
    this.appService.getUserDetails(this.userEmail).subscribe( data => {
      this.userData = data;
      this.userName = this.userData.firstName.charAt(0).toUpperCase() + this.userData.firstName.slice(1);
      this.userFirstName = this.userData.firstName;
      this.userLastName = this.userData.lastName;
      sessionStorage.setItem('userName' , this.userName);
      sessionStorage.setItem('id', this.userData.id);
      console.log('userDetails', this.userData);
      this.appService.getProfilePic(this.userData.id).subscribe(data1 => {
        // this.pic = data1;
         //  this.url = 'data:image/jpeg;base64,' + data1;
         this.showPic = true;
         this.notShowPic = false;
         this.url = 'data:image/jpeg;base64,' + data1;
       console.log('img', this.url);
      });
      this.appService.getSocialNetwork().subscribe ( network => {
        this.socialNetworks = network;
        console.log('network' , network);
      });

      this.appService.getCity().subscribe ( city => {
        this.city = city;
        console.log('district' , city);
      });
      this.appService.getLanguage().subscribe ( lang => {
        this.language = lang;
        console.log('language' , lang);
      });
      this.appService.getUserContactDetails(this.userData.id).subscribe( data1 => {
        this.cntValue = data1;
        console.log('datacode' , this.cntValue[0].contact.contactType.dataCode);
        for (let i = 0 ; i < this.cntValue.length ; i++) {
             if (this.cntValue[i].contact.contactType.dataCode === 'CONTACT_TYPE.MAIL') {
               this.mailId = this.cntValue[i].contact.contactValue;
             } else if (this.cntValue[i].contact.contactType.dataCode === 'CONTACT_TYPE.MOBILE') {
               this.contactValue = this.cntValue[i].contact.contactValue;
             }
        }
       // this.contactValue = data1[1]['contact']['contactValue'];
       // this.mailId = data1[0]['contact']['contactValue'];
       console.log('contact value',  data1 , this.mailId, this.contactValue);
       });
      sessionStorage.setItem('firstName' , this.userData.firstName);
      sessionStorage.setItem('lastName' , this.userData.lastName);
      sessionStorage.setItem('id', this.userData.id);
     // console.log('id' , this.id)

        // getFollowing domains
        this.getFollowingDomains(this.userData.id);
         // get skills
         this.getSkills(this.userData.id);


    });
  }

  createForm() {
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.dateofbirth = new FormControl('', [Validators.required]);
    this.gender = new FormControl('' , [Validators.required]);
    this.aboutMe = new FormControl('' , [Validators.required]);
    this.selectedlanguage = new FormControl('', [Validators.required]);
    this.selectedcity = new FormControl('', [Validators.required]);
    this.pincode = new FormControl('', [Validators.required]);
    this.occupation = new FormControl('' , [Validators.required]);
    this.socialNetwork = new FormControl('' , [Validators.required]);
    this.link = new FormControl('' , [Validators.required]);
    this.read = new FormControl('false' , [Validators.required]);
    this.speak = new FormControl('false' , [Validators.required]);
    this.write = new FormControl('false' , [Validators.required]);
    this.profileForm = this.formbuilder.group(
      {
        // firstName: this.firstName,
        // lastName: this.lastName,
        dateofbirth: this.dateofbirth,
        gender : this.gender,
        aboutMe : this.aboutMe,
        languageSel: this.formbuilder.array([]),
        selectedcity: this.selectedcity,
        occupation: this.occupation,
        socialnetwork: this.formbuilder.array([ ]),
        pincode: this.pincode,
        // link: this.link
    });
    this.addItem();
    this.addLanguage();
  }
  createItem(): FormGroup {
    return this.formbuilder.group({
      socialNetwork: '',
      link: ''
    });
  }
  createLanguage(): FormGroup {
    return this.formbuilder.group({
      selectedlanguage:  '',
      read: '',
      speak: '',
      write: ''
    });
  }
addLanguage() {
  let controls = <FormArray>this.profileForm.controls.languageSel;
  console.log('from language' , controls);
  controls.push(this.createLanguage());
}
removeLanguage(index) {
  let controls = <FormArray>this.profileForm.controls.languageSel;
  controls.removeAt(index );
}
  getFormControlForLang(frmGrp: FormGroup, key: string) {
    // console.log(key , (<FormArray>frmGrp.controls[key]).controls);
    return (<FormArray>frmGrp.controls[key]).controls;
  }
  getFormControl(frmGrp: FormGroup, key: string) {
   // console.log(key , (<FormArray>frmGrp.controls[key]).controls);
    return (<FormArray>frmGrp.controls[key]).controls;
  }
  addItem() {
    let controls = <FormArray>this.profileForm.controls.socialnetwork;
    controls.push(this.createItem());
 // this.socialnetwork.push(this.createItem());
}
removeItem(index) {
  let controls = <FormArray>this.profileForm.controls.socialnetwork;
  controls.removeAt(index );
}
  onFormSubmit(formValue) {
      console.log('form submit value' , formValue ,  this.idValues.length ,  this.addedHardSkills.length , this.addedSoftSkills.length);
     if ( (this.idValues.length != 0) && (this.addedHardSkills.length != 0) && (this.addedSoftSkills.length != 0)) {
      console.log('everything perfect');
     this.updateDetails(formValue);
     this.updateFollowingDomain();
     this.updateSkills();
    } else {
      this._snackBar.open('Please select domains and skills', 'undo' , { duration: 3000});

    }

      // this.updateDetails(formValue);
     // this.updateFollowingDomain();
     // this.updateSkills();
  //   console.log('form submit value' , formValue);
  //   console.log('form values' , formValue.languageSel);

  //  // console.log('form submit value' , this.createSocialMediaNetwork);
  //     // console.log('social networks' , formValue.socialnetwork[i] );
  //    this.updateDetails(formValue);
  //    this.updateFollowingDomain();
  //    this.updateSkills();

}
  // addUserInterestedDetails(form: NgForm) {

  //   if (form.invalid) {
  //     console.log('value not present from form');
  //   //  this._snackBar.open('Please enter valid details', 'undo' , { duration: 3000});
  //    return;
  //  } else {
  //    console.log(form.value);
  //  //   this.updateDetails(form.value);
  //   //  this.updateFollowingDomain();
  //    // this.updateSkills();
  //  }
  // }

  uploadProfilePic(imgFile) {
    this.profilePic_flag = false;
    console.log('pic upload called..', imgFile);
    this.fileSelectData = imgFile.target.files[0];
    console.log('selectedFiles' , this.fileSelectData);
    if (imgFile.target.files && imgFile.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(imgFile.target.files[0]);
      reader.onload = ((e) => {
       this.userIcon = e.target['result'];
       this.url = e.target['result'];
      });
    }
    const formData = new FormData();
        formData.append('id', this.userData.id);
        formData.append('file', this.fileSelectData);
    this.appService.changeUserprofilepic(formData).subscribe(data => {
      console.log('pic result' , data);
    } , error => {
      console.log('error' , error.status);
    });

  }


////////////////////////// domain starting ///////////////////////////////////////////////////
  getFollowingDomains(userIdValue) {
    this.appService.getFollowingDomain(userIdValue).subscribe( data => {
      console.log('following domain', this.newDomainId , data);
        if (data[0]) {
         console.log('not null');
         this.newDomainId = data[0].id;
         console.log('newdomainId', this.newDomainId);
         this.followingDomain = data[0]['bRNETInterestList'];
         this.showDomainNames = false;
         this.notShowDomainNames = true;
         for (let i = 0; i < this.followingDomain.length; i++) {
           this.followingPerticularDomain.push(this.followingDomain[i].title);
           this.followingPerticularDomainId.push(this.followingDomain[i].id);
         }
         // removing duplicate values
     this.followingPerticularDomain =  this.followingPerticularDomain.filter((v, i) =>  this.followingPerticularDomain.indexOf(v) === i);
      this.followingPerticularDomainId = this.followingPerticularDomainId.filter((v, i) =>
       this.followingPerticularDomainId.indexOf(v) === i);
     console.log('afterfiltervalue', this.followingPerticularDomain);

     this.finalFollowingDomain = this.followingPerticularDomainId.map (function (x, i ) {   // mapping title and id
          return {'title': this.followingPerticularDomain[i], 'id' : x};
        }.bind(this));
         console.log('afterfilter', this.followingPerticularDomain, this.followingPerticularDomainId);
          // get domains
       if (this.followingPerticularDomain != null) {
         console.log('value present');
         this.appService.getDomains().subscribe( data1 => {
           this.domainNames = data1;
           for (let i = 0; i < this.domainNames.length; i++) {
             this.domainTitle.push( this.domainNames[i].title);  // title value alone
             this.domainId.push(this.domainNames[i].id); // title id alone
             this.domainTitle = this.domainTitle.filter(val => !this.followingPerticularDomain.includes(val)); // filtering title value
             this.domainId = this.domainId.filter(val => !this.followingPerticularDomainId.includes(val)); // filtering id value
           }
           this.domainTitle =  this.domainTitle.filter((v, i) =>  this.domainTitle.indexOf(v) === i);
           this.domainId = this.domainId.filter((v, i) => this.domainId.indexOf(v) === i);
           this.finalDomains = this.domainId.map (function (x, i ) {   // mapping title and id
             return {'title': this.domainTitle[i], 'id' : x};
           }.bind(this));

           console.log(this.domainNames, this.domainTitle, this.domainId, 'final domiansssss', this.finalDomains);
         });
       } else {
         // console.log ('no value')
       this.appService.getDomains().subscribe( data2 => {
         this.domainNames = data2;
         console.log('domianNames' , this.domainNames);
       });
     }
       } else {
         this.appService.getDomains().subscribe( data3 => {
           this.domainNames = data3;
           this.showDomainNames = true;
           this.notShowDomainNames = false;
           console.log('domianNames' , this.domainNames);
         });
         console.log('null');
       }
     });
  }

  close(clossedValue, clossedId) {

    this.clossedValue.push(clossedValue);
    this.clossedIdValue.push(clossedId);
   console.log('clossedvalues', this.clossedValue, this.clossedIdValue);
    this.followingPerticularDomainId = this.followingPerticularDomainId.filter(( el ) =>
    !this.clossedValue.includes( el )); // removing selected values
     this.followingPerticularDomain = this.followingPerticularDomain.filter(( el ) => !this.clossedIdValue.includes( el ));
    console.log('clossed', this.clossedValue, this.clossedIdValue, this.followingPerticularDomain, this.followingPerticularDomainId);
  console.log('clossed', this.clossedValue, this.clossedIdValue, this.followingPerticularDomain, this.followingPerticularDomainId);
  this.remainingValue = this.followingPerticularDomainId.map (function (x, i ) {   // mapping title and id
    return {'title': this.followingPerticularDomain[i] , 'id' : x};
  }.bind(this));
  // console.log('remianing value',  this.remainingValue, this.interestedDomain);
}

addToFollowDomain(id , event) {
  console.log('clicked' , id , event.target.textContent);
     let target = event.target;
     if (target.textContent === 'add') {
      target.textContent = 'close';
     } else {
      target.textContent = 'add';
     }
   let parent = event.target;
    console.log('eventtarget', parent.parentNode.parentNode.parentNode.classList);
   let status3 = parent.parentNode.parentNode.parentNode.classList.contains('active1');
  parent.parentNode.parentNode.parentNode.classList.add(status3 ? 'inactive1' : 'active1');
  parent.parentNode.parentNode.parentNode.classList.remove(status3 ? 'active1' : 'inactive1');

  this.idValues.push(id);
  this.sortingValue = this.idValues.slice().sort();
  for (let i = 0; i < this.sortingValue.length - 1; i++) {
    if (this.sortingValue[i + 1] === this.sortingValue[i]) {

      this.finalIdValues.push(this.sortingValue[i]);
    }
  }
 // this.newFilteredSelectedValue = this.idValues.filter(( el ) => !this.finalIdValues.includes( el ));
   this.idValues = this.idValues.filter(( el ) => !this.finalIdValues.includes( el ));

  this.newFilteredSelectedValue =  this.idValues.map (function (x, i ) {   // mapping title and id
    return {'id' : x, 'title': ''};
  }.bind(this));
  this.finalIdValues = [];
 // this.idValues = [];
// this.idValues.push({'id' : this.idValues , 'title': ''});
//   console.log('idValues', this.idValues);
  this.interestedDomain =  {                             // create json to post domain value
    'id': 0,
    'isActive': true,
    'actorId': this.userData.id.toString(),
    'actorType': {
      'code': 'ACTOR_TYPE.BRIDGE_USER'
    },
    'bRNETInterestList':
    this.newFilteredSelectedValue
        };
    console.log('interestDomain', this.interestedDomain);
    console.log('idValues', this.idValues, this.finalIdValues, this.newFilteredSelectedValue);
}

updateFollowingDomain() {
// console.log('post value', this.interestedDomain , 'idVALUE', this.idValues.length, 'emainvalue' , this.remainingValue.length);
  if (this.followingDomain == null) {
    console.log('new value');
    this.appService.selecteddomain(this.interestedDomain).subscribe( data => {
     // this.newDomainId = data.body['id'];
      console.log('following domain', data.body['id']);
      this.getFollowingDomains(this.userData.id);
      // console.log('following domain', data.body);
    });
    // --------------------------------------------------------------------------close vlue--------------
  } else if ( this.remainingValue !== null &&  this.newFilteredSelectedValue.length === 0 ) {
    this.interestedDomain = {                             // create json to post domain value
    'id': this.newDomainId,
    'isActive': true,
    'actorId': this.userData.id.toString(),
    'actorType': {
      'code': 'ACTOR_TYPE.BRIDGE_USER'
    },
    'bRNETInterestList':
    this.remainingValue
  };
  console.log('before remianingvLUE', this.remainingValue);
this.appService.updateIntrestedDomains(this.interestedDomain).subscribe( data => {
        console.log('newintrested domains', data);
       this.getFollowingDomains(this.userData.id);
      // this.remainingValue = null;
      });
      this.clossedValue = [];
// this.remainingValue = null;
  console.log('closedVLALUESSS alone', this.interestedDomain, 'remianing value', this.remainingValue);
  this.remainingValue = [];
  }

  ///////////////////////////////////// add values //////////////////////
   else if ( this.newFilteredSelectedValue !== null && this.remainingValue.length == 0 ) {
    console.log('old value',  this.newFilteredSelectedValue.concat(this.finalFollowingDomain));
    this.interestedDomain =
      {                             // create json to post domain value
    'id': this.newDomainId,
    'isActive': true,
    'actorId': this.userData.id.toString(),
    'actorType': {
      'code': 'ACTOR_TYPE.BRIDGE_USER'
    },
    'bRNETInterestList':
    this.newFilteredSelectedValue.concat(this.finalFollowingDomain)
  };
  console.log('beforeIdvalues', this.newFilteredSelectedValue);
      this.appService.updateIntrestedDomains(this.interestedDomain).subscribe( data => {
        console.log('newintrested domains', data);
       // this.idValues = null;
       this.getFollowingDomains(this.userData.id);
      // this.idValues = null;
      });
    // console.log('add domain values alone', this.idValues, this.interestedDomain,
    // 'final idvalue',  this.newFilteredSelectedValue , 'final remaining values', this.remainingValue);
      this.clossedValue = [];
      this.clossedIdValue = [];
      this.idValues = [];
      this.newFilteredSelectedValue = [];
  }
}
///////////////////////// domain ends ///////////////////////////////////////////

///////////////////////// skills starts /////////////////////////////////////////

getSkills(id) {
  this.appService.getSelectedSkills(id).subscribe(data => {
    this.selectedSkill = data;
    console.log('selectedSkills' , this.selectedSkill);
    if (this.selectedSkill.length !== 0) {
      console.log('selectedValue present');
    for (let i = 0; i < this.selectedSkill.length; i++) {
      console.log('activedomainlength', this.selectedSkill[i].isActive === true);
      if (this.selectedSkill[i].skill.skillType.code === 'SKILL_TYPE.JOURNEY_USER_SKILL') {
        this.selectedSoftSkills.push(this.selectedSkill[i].skill.skillName[0].text);
        this.selectedSoftSkillsId.push(this.selectedSkill[i].skill.id);
        this.userSoftSkillId.push(this.selectedSkill[i].id);
      } else if (this.selectedSkill[i].skill.skillType.code === 'SKILL_TYPE.JOURNEY_USER_HARD_SKILL') {
        this.selectedHardSkills.push(this.selectedSkill[i].skill.skillName[0].text);
        this.selectedHardSkillsId.push(this.selectedSkill[i].skill.id);
        this.userHardSkillId.push(this.selectedSkill[i].id);
      }
    }
  console.log('selectedsoftskills', this.selectedSoftSkills,
  this.selectedSoftSkillsId, 'harskills', this.selectedHardSkills, this.selectedHardSkillsId);
  console.log('afterfiltervalue', this.selectedSoftSkills, this.selectedSoftSkillsId);
      // removing duplicate values
      this.selectedSoftSkills =  this.selectedSoftSkills.filter((v, i) =>  this.selectedSoftSkills.indexOf(v) === i);
      this.selectedSoftSkillsId = this.selectedSoftSkillsId.filter((v, i) => this.selectedSoftSkillsId.indexOf(v) === i);
     console.log('afterfiltervalue', this.selectedSoftSkills, this.selectedSoftSkillsId);

     this.selectedHardSkills =  this.selectedHardSkills.filter((v, i) =>  this.selectedHardSkills.indexOf(v) === i);
     this.selectedHardSkillsId = this.selectedHardSkillsId.filter((v, i) => this.selectedHardSkillsId.indexOf(v) === i);
    console.log('afterfiltervalue', this.selectedHardSkills, this.selectedHardSkillsId);
  this.finalFollowingSoftSkills = this.selectedSoftSkillsId.map (function (x, i ) {   // mapping title and id for softskillssss
    return {'title': this.selectedSoftSkills[i], 'id' : x , 'userId' : this.userSoftSkillId[i]};
  }.bind(this));

  this.finalFollowingHardSkills = this.selectedHardSkillsId.map (function (x, i ) {   // mapping title and id for Hardskillssss
    return {'title': this.selectedHardSkills[i], 'id' : x, 'userId' : this.userHardSkillId[i]};
  }.bind(this));

   console.log('afterfilter', this.finalFollowingSoftSkills , 'hardskills', this.finalFollowingHardSkills);
   this.appService.getSoftSkills().subscribe(data => {
    this.notShowSoftSkillsNames = true;
    this.showSoftSkillNames = false;
    this.softSkills = data;
    for (let i = 0; i < this.softSkills.length; i++) {
     this.softSkillsTittle.push(this.softSkills[i].skillName[0].text);
      this.softSkillsId.push(this.softSkills[i].id);
      // this.softskillsList.push({'skillName' : this.softSkills[i].skillName[0].text ,
      //  'skillId' : this.softSkills[i].id, 'skillCode' : this.softSkills[i].skillType.code});
    }
    this.softSkillsTittle =  this.softSkillsTittle.filter((v,i) =>  this.softSkillsTittle.indexOf(v) === i);
      this.softSkillsId = this.softSkillsId.filter((v,i) => this.softSkillsId.indexOf(v) === i);
     console.log('afterfiltervalue', this.softSkillsTittle, this.softSkillsId);

    this.softSkillsTittle = this.softSkillsTittle.filter(val => !this.selectedSoftSkills.includes(val));
    this.softSkillsId = this.softSkillsId.filter(val => !this.selectedSoftSkillsId.includes(val));
    this.finalRemainingSkills = this.softSkillsId.map (function (x, i ) {   // mapping title and id
      return {'title': this.softSkillsTittle[i], 'id' : x};
    }.bind(this));
    console.log('softskills', data , this.softSkillsTittle , this.softSkillsId , this.finalRemainingSkills);
    this.selectedSoftSkills = [];
    this.selectedSoftSkillsId = [];
    this.userSoftSkillId = [];
  });
// =========================================================================harskills====================================================
    this.appService.getHardSkills().subscribe( data => {
      this.showHardSkillNames = false;
      this.notShowHardskillsNames = true;
      this.hardSkills = data;
      for (let i = 0; i < this.hardSkills.length; i++) {
        this.hardSkillsTitle.push(this.hardSkills[i].skillName[0].text);
        this.hardSkilsId.push(this.hardSkills[i].id);
      }
      this.hardSkillsTitle =  this.hardSkillsTitle.filter((v, i) =>  this.hardSkillsTitle.indexOf(v) === i);
      this.hardSkilsId = this.hardSkilsId.filter((v, i) => this.hardSkilsId.indexOf(v) === i);
     console.log('afterfiltervalue', this.hardSkillsTitle, this.hardSkilsId);

      this.hardSkillsTitle = this.hardSkillsTitle.filter(val => !this.selectedHardSkills.includes(val));
      this.hardSkilsId = this.hardSkilsId.filter(val => !this.selectedHardSkillsId.includes(val));
      console.log('harskills----------------' , this.hardSkillsTitle, this.hardSkilsId);
      this.finalRemainingHardSkills = this.hardSkilsId.map (function (x, i) {
        return {'title': this.hardSkillsTitle[i], 'id' : x};
      }.bind(this));
      this.selectedHardSkills = [];
        this.selectedHardSkillsId = [];
        this.userHardSkillId = [];
      console.log('hardskills', data , this.hardSkilsId , this.hardSkillsTitle , this.finalRemainingHardSkills );
    });

  } else {
    console.log('selectedvalue not present')
    this.appService.getSoftSkills().subscribe(data => {
      this.showHardSkillNames = true;
      this.notShowHardskillsNames = false;
      this.softSkills = data;
      for (let i = 0; i < this.softSkills.length; i++) {
        this.softskillsList.push({'skillName' : this.softSkills[i].skillName[0].text ,
         'skillId' : this.softSkills[i].id, 'skillCode' : this.softSkills[i].skillType.code});
      }
      console.log('softskills', data);
    });
     // get hard skills
     this.appService.getHardSkills().subscribe( data => {
      this.notShowSoftSkillsNames = false;
      this.showSoftSkillNames = true;
      this.hardSkills = data;
      for (let i = 0; i < this.hardSkills.length; i++) {
         this.hardSkillsList.push({'skillName': this.hardSkills[i].skillName[0].text,
          'skillId' : this.hardSkills[i].id, 'skillCode' : this.hardSkills[i].skillType.code});
        // console.log('firstloop', this.hardSkills[i].skillName[0].text);
      }
      console.log('hardskills', data,  this.hardSkillsList);
    });
  }
  this.selectedSkill = [];
  console.log('end of selectedSkill' , this.selectedSkill);
  });
}
addHardSkills( id , event) {
  console.log('added HardSkills' , id);
  let target = event.target;
  if (target.textContent === 'add') {
   target.textContent = 'close';
  } else {
   target.textContent = 'add';
  }
  let parent = event.target;
  console.log('eventtarget', parent.parentNode.parentNode.parentNode.classList);
  let status3 = parent.parentNode.parentNode.parentNode.classList.contains('active1');
  parent.parentNode.parentNode.parentNode.classList.add(status3 ? 'inactive1' : 'active1');
  parent.parentNode.parentNode.parentNode.classList.remove(status3 ? 'active1' : 'inactive1');
  let sortingValue = [];
  let skillId = [];
  this.addedHardSkills.push(id);
  sortingValue = this.addedHardSkills.slice().sort();
      for (let i = 0; i < sortingValue.length - 1; i++) {
        if (sortingValue[i + 1] === sortingValue[i]) {

          skillId.push(sortingValue[i]);
        }
      }
     // this.newFilteredSelectedValue = this.idValues.filter(( el ) => !this.finalIdValues.includes( el ));
       this.addedHardSkills = this.addedHardSkills.filter(( el ) => !skillId.includes( el ));
  console.log('harSkillss', this.addedHardSkills);
  }

  addSoftSkills( id , event) {
    let target = event.target;
    console.log('eventTarget' , event);
    if (target.textContent === 'add') {
     target.textContent = 'close';
    } else {
     target.textContent = 'add'
    }
    let parent = event.target;
  console.log('eventtarget', parent.parentNode.parentNode.parentNode.classList);
  let status3 = parent.parentNode.parentNode.parentNode.classList.contains('active1');
  parent.parentNode.parentNode.parentNode.classList.add(status3 ? 'inactive1' : 'active1');
  parent.parentNode.parentNode.parentNode.classList.remove(status3 ? 'active1' : 'inactive1');
    console.log('softSkillID', id);
    let skillId = [];
    let sortingValue = []
    this.addedSoftSkills.push(id);
    sortingValue = this.addedSoftSkills.slice().sort();
      for (let i = 0; i < sortingValue.length - 1; i++) {
        if (sortingValue[i + 1] === sortingValue[i]) {

          skillId.push(sortingValue[i]);
        }
      }
     // this.newFilteredSelectedValue = this.idValues.filter(( el ) => !this.finalIdValues.includes( el ));
       this.addedSoftSkills = this.addedSoftSkills.filter(( el ) => !skillId.includes( el ));
    console.log('softSkills' , this.addedSoftSkills);
  }

  closeSkills(id, userId) {
    console.log('closedSkill id ----------------', id , userId);
    this.appService.removeSelectedSkills(userId).subscribe( data => {
      console.log('afterRemoving', data);
       this.getSkills(this.userData.id);
      userId = '';
    });
  }
  updateSkills() {
    let createdSoftSkillsJson = [];
    let createdHardSkillsJson = [];
    for (let i = 0 ; i < this.addedSoftSkills.length; i++) {
      createdSoftSkillsJson.push({
        'id': 0,
      'skill': {
        'id': this.addedSoftSkills[i],
        'skillType': {

         'code' : 'SKILL_TYPE.JOURNEY_USER_HARD_SKILL'
        }
      },
      'user': this.userData.id,
      'isActive': true
      });
    }

    for (let i = 0; i < this.addedHardSkills.length; i++) {
      createdHardSkillsJson.push({
        'id': 0,
      'skill': {
        'id': this.addedHardSkills[i],
        'skillType': {
         'code' : 'SKILL_TYPE.JOURNEY_USER_HARD_SKILL'
        }
      },
      'user': this.userData.id,
      'isActive': true
      });
    }
    this.appService.updateSkills(createdSoftSkillsJson.concat(createdHardSkillsJson)).subscribe( data => {
      console.log('response from selected skills' , data);
      this.getSkills(this.userData.id);
    });
    createdSoftSkillsJson = [];
    createdHardSkillsJson = [];
    this.addedSoftSkills = [];
    this.addedHardSkills = [];
    console.log('createdjson' , createdSoftSkillsJson.concat(createdHardSkillsJson));
  }

  updateDetails(forms) {
    if (this.userData.hasOwnProperty('person')) {
      console.log('old person');
      const createSocialMedia = [];
      for (let i = 0 ; i < forms.socialnetwork.length ; i++) {
        createSocialMedia.push(
         {
           'id': 0,
           'isActive': true,
           'notes': 'string',
           'socialMediaAccount': {
             'id': 0,
             'isActive': true,
             'socialMediaType': {
               'globalRefClass': {
                 'classCode': 'GREF.SOCIAL_NETWORK',
                 'name': 'social Network'
               },
               'isActive': true,
               'label': '',
               'language': {
                 'language': 'English',
                 'languageCode': 'ENG'
               },
               'dataCode': forms.socialnetwork[i].socialNetwork
             },
             'socialMediaValue': forms.socialnetwork[i].link
         }
       });
         }
         console.log('old person userdetails' , createSocialMedia);
         let accumulatedLanguage = [];
    for (let i = 0; i < forms.languageSel.length; i++ ) {
      if (forms.languageSel[i].read === true ) {
        accumulatedLanguage.push( {
            'isActive': true,
            'id': 0,
            'language': {
              'languageCode': 'ENG',
              'language': 'English'
            },
            'canRead': {
              'dataCode': forms.languageSel[i].selectedlanguage,
              'globalRefClass': {
                'classCode': 'GREF.LANG_KNOWN',
                'name': 'Language'
              }
            }
          })
       // accumulatedLanguage.push({canreadValue});
        console.log('can read', forms.languageSel[i].selectedlanguage );
      } else if (forms.languageSel[i].speak === true ) {
        accumulatedLanguage.push({
          'isActive': true,
          'id': 0,
          'language': {
            'languageCode': 'ENG',
            'language': 'English'
          },
          'canSpeak': {
            'dataCode': forms.languageSel[i].selectedlanguage,
            'globalRefClass': {
              'classCode': 'GREF.LANG_KNOWN',
              'name': 'Language'
            }
          }
        })
     // accumulatedLanguage.push({canspeakValue});
        console.log('can speak', forms.languageSel[i].selectedlanguage );
      } else if (forms.languageSel[i].write === true ) {
      accumulatedLanguage.push({
          'isActive': true,
          'id': 0,
          'language': {
            'languageCode': 'ENG',
            'language': 'English'
          },
          'canWrite': {
            'dataCode': forms.languageSel[i].selectedlanguage,
            'globalRefClass': {
              'classCode': 'GREF.LANG_KNOWN',
              'name': 'Language'
            }
          }
        })
     // accumulatedLanguage.push({canwriteValue});
        console.log('can write' , forms.languageSel[i].selectedlanguage);
        }
    }
    console.log('acumulatedLanguage' , accumulatedLanguage );
      const editUserDetails = {
        'id': this.userData.id,
        'firstName': this.userData.firstName,
        'lastName':  this.userData.lastName,
        'login': this.userData.login,
        'isActive': true,
        'person': {
          'isActive': true,
          'id': this.userData.person.personProfile.id,
          'notes': forms.aboutMe,
          'personProfile': {
            'isActive': true,
            'id': this.userData.person.personProfile.id,
            'firstName': this.userData.firstName,
            'dateOfBirth': forms.dateofbirth,
            'occupation': forms.occupation,
          },
          'personAddresses': [
            {
              'isActive': true,
              'id': this.userData.person.personAddresses[0].id,
              'address': {
                'isActive': true,
                'id': this.userData.person.personAddresses[0].address.id,
                'addressLine1': '',
                'country': {
                  'dataCode': 'IN',
                  'label': '',
                  'globalRefClass': {
                    'classCode': 'GREF.COUNTRY',
                    'name': 'Country'
                  },
                  'language': {
                    'languageCode': 'ENG',
                    'language': 'English'
                  }
                },
                'city': {
                  'dataCode':  forms.selectedcity,
                  'label': '',
                  'globalRefClass': {
                    'classCode': 'GREF.CITY',
                    'name': 'City'
                  },
                  'language': {
                    'languageCode': 'ENG',
                    'language': 'English'
                  }
                },
                'pinCode': forms.pincode,
                'state': {
                  'dataCode': 'IN-KA',
                  'label': '',
                  'globalRefClass': {
                    'classCode': 'GREF.STATE',
                    'name': 'State'
                  },
                  'language': {
                    'languageCode': 'ENG',
                    'language': 'English'
                  }
                },
                'verified': false,
                'localityGrid': []
              }
            }
          ],
          'personContacts': [
            {
              'isActive': true,
              'id': this.userData.person.personContacts[0].id,
              'contact': {
                'isActive': true,
                'id': this.userData.person.personContacts[0].contact.id,
                'contactType': {
                  'dataCode': 'CONTACT_TYPE.MOBILE',
                  'label': 'Mobile',
                  'globalRefClass': {
                    'classCode': 'GREF.CONTACT_TYPE',
                    'name': 'Contact Type'
                  },
                  'language': {
                    'languageCode': 'ENG',
                    'language': 'English'
                  }
                },
                'contactValue': this.contactValue,
                'verified': false
              }
            }
          ],
          'personSocialMedia': createSocialMedia ,
          'personBankDetailList': [],
          'personIdentifierList': [],
          'personEducationList': [
            {
              'isActive': true,
              'id': this.userData.person.personEducationList[0].id,
            }
          ],
          'personFamilyList': [],
          'personInsuranceList': [],
          'personLanguageList': accumulatedLanguage
          // [
          //   {
          //     'isActive': true,
          //     'id': this.userData.person.personLanguageList[0].id,
          //     'language': {
          //       'languageCode': 'ENG',
          //       'language': 'English'
          //     },
          //     'canSpeak': {
          //       'dataCode': forms.selectedlanguage,
          //       'globalRefClass': {
          //         'classCode': 'GREF.LANG_KNOWN',
          //         'name': 'Language'
          //       }
          //     }
          //   }
          // ]
        }
    };
    this.appService.updateUserDetails(editUserDetails).subscribe( data => {
      console.log('resultupdate', data);
      this.updatedResults = data;
      this._snackBar.open('Person Details Updated SuccessFully', 'undo' , { duration: 3000});
      this.route.navigateByUrl('viewProfile');
      console.log('Person Details Updated SuccessFully');
      // this.toster.successToastr('Person Details Updated SuccessFully');
    }, error => {
      // this.toster.errorToastr('Enter Valid Details', 'Alert!');
      this._snackBar.open('please enter valid values', 'undo' , { duration: 3000});
      console.log('please enter valid values');
    });
    console.log('saved data', editUserDetails );

  } else {
    console.log('new person');
    const createSocialMedia = [];
    for (let i = 0 ; i < forms.socialnetwork.length ; i++) {
     createSocialMedia.push(
      {
        'id': 0,
        'isActive': true,
        'notes': 'string',
        'socialMediaAccount': {
          'id': 0,
          'isActive': true,
          'socialMediaType': {
            'globalRefClass': {
              'classCode': 'GREF.SOCIAL_NETWORK',
              'name': 'social Network'
            },
            'isActive': true,
            'label': '',
            'language': {
              'language': 'English',
              'languageCode': 'ENG'
            },
            'dataCode': forms.socialnetwork[i].socialNetwork
          },
          'socialMediaValue': forms.socialnetwork[i].link
      }
    });
      }
      console.log('socialmedia' , createSocialMedia );
      let accumulatedLanguage = [];
      for (let i = 0; i < forms.languageSel.length; i++ ) {
        if (forms.languageSel[i].read === true ) {
          accumulatedLanguage.push( {
              'isActive': true,
              'id': 0,
              'language': {
                'languageCode': 'ENG',
                'language': 'English'
              },
              'canRead': {
                'dataCode': forms.languageSel[i].selectedlanguage,
                'globalRefClass': {
                  'classCode': 'GREF.LANG_KNOWN',
                  'name': 'Language'
                }
              }
            })
         // accumulatedLanguage.push({canreadValue});
          console.log('can read', forms.languageSel[i].selectedlanguage );
        } else if (forms.languageSel[i].speak === true ) {
          accumulatedLanguage.push({
            'isActive': true,
            'id': 0,
            'language': {
              'languageCode': 'ENG',
              'language': 'English'
            },
            'canSpeak': {
              'dataCode': forms.languageSel[i].selectedlanguage,
              'globalRefClass': {
                'classCode': 'GREF.LANG_KNOWN',
                'name': 'Language'
              }
            }
          })
       // accumulatedLanguage.push({canspeakValue});
          console.log('can speak', forms.languageSel[i].selectedlanguage );
        } else if (forms.languageSel[i].write === true ) {
        accumulatedLanguage.push({
            'isActive': true,
            'id': 0,
            'language': {
              'languageCode': 'ENG',
              'language': 'English'
            },
            'canWrite': {
              'dataCode': forms.languageSel[i].selectedlanguage,
              'globalRefClass': {
                'classCode': 'GREF.LANG_KNOWN',
                'name': 'Language'
              }
            }
          })
       // accumulatedLanguage.push({canwriteValue});
          console.log('can write' , forms.languageSel[i].selectedlanguage);
          }
      }
    const editUserDetails = {
      'id': this.userData.id,
      'firstName': this.userData.firstName,
      'lastName':  this.userData.lastName,
      'login': this.userData.login,
      'isActive': true,
      'person': {
        'isActive': true,
        'id': 0,
        'notes': forms.aboutMe,
        'personProfile': {
          'isActive': true,
          'id': 0,
          'firstName': this.userData.firstName,
          'dateOfBirth': forms.dateofbirth,
          'occupation': forms.occupation
        },
        'personAddresses': [
          {
            'isActive': true,
            'id': 0,
            'address': {
              'isActive': true,
              'id': 0,
              'addressLine1': '',
              'country': {
                'dataCode': 'IN',
                'label': '',
                'globalRefClass': {
                  'classCode': 'GREF.COUNTRY',
                  'name': 'Country'
                },
                'language': {
                  'languageCode': 'ENG',
                  'language': 'English'
                }
              },
              'city': {
                'dataCode':  forms.selectedcity,
                'label': '',
                'globalRefClass': {
                  'classCode': 'GREF.CITY',
                  'name': 'City'
                },
                'language': {
                  'languageCode': 'ENG',
                  'language': 'English'
                }
              },
              'pinCode': forms.pincode,
              'state': {
                'dataCode': 'IN-KA',
                'label': '',
                'globalRefClass': {
                  'classCode': 'GREF.STATE',
                  'name': 'State'
                },
                'language': {
                  'languageCode': 'ENG',
                  'language': 'English'
                }
              },
              'verified': false,
              'localityGrid': []
            }
          }
        ],
        'personContacts': [
          {
            'isActive': true,
            'id': 0,
            'contact': {
              'isActive': true,
              'id': 0,
              'contactType': {
                'dataCode': 'CONTACT_TYPE.MOBILE',
                'label': 'Mobile',
                'globalRefClass': {
                  'classCode': 'GREF.CONTACT_TYPE',
                  'name': 'Contact Type'
                },
                'language': {
                  'languageCode': 'ENG',
                  'language': 'English'
                }
              },
              'contactValue': this.contactValue,
              'verified': false
            }
          }
        ],
        'personSocialMedia': createSocialMedia,
        //   {
        //     'id': 0,
        //     'isActive': true,
        //     'notes': 'string',
        //     'socialMediaAccount':{
        //       'id': 0,
        //       'isActive': true,
        //       'socialMediaType': {
        //         'globalRefClass': {
        //           'classCode': 'GREF.SOCIAL_NETWORK',
        //           'name': 'social Network'
        //         },
        //         'isActive': true,
        //         'label': '',
        //         'language': {
        //           'language': 'English',
        //           'languageCode': 'ENG'
        //         },
        //         'dataCode': forms.socialnetwork[0].socialNetwork
        //       },
        //       'socialMediaValue': forms.socialnetwork[0].link
        //   }
        //
        'personBankDetailList': [],
        'personIdentifierList': [],
        'personEducationList': [
          {
            'isActive': true,
            'id': 0
          }
        ],
        'personFamilyList': [],
        'personInsuranceList': [],
        'personLanguageList': accumulatedLanguage
        //  [
        //   {
        //     'isActive': true,
        //     'id': 0,
        //     'language': {
        //       'languageCode': 'ENG',
        //       'language': 'English'
        //     } ,
        //     'canSpeak': {
        //       'dataCode': forms.selectedlanguage,
        //       'globalRefClass': {
        //         'classCode': 'GREF.LANG_KNOWN',
        //         'name': 'Language'
        //       }
        //     }
        //   }
        // ]
      }
  };

  this.appService.updateUserDetails(editUserDetails).subscribe( data => {
    console.log('resultupdate', data);
    this.updatedResults = data;
    this._snackBar.open('Person Details Updated SuccessFully' , 'undo' , { duration: 3000});
    this.route.navigateByUrl('viewProfile');
    console.log('Person Details Updated SuccessFully');
    // this.toster.successToastr('Person Details Updated SuccessFully');
  }, error => {
    // this.toster.errorToastr('Enter Valid Details', 'Alert!');
    this._snackBar.open('please enter valid values' , 'undo' , { duration: 3000});
    console.log('please enter valid values');
  });
  console.log('saved data', editUserDetails );
    }

}
}
