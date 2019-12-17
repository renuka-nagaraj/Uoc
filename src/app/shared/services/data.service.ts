import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import * as global from '../../../global';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  patchUserprofilepic(formData: FormData) {
    throw new Error("Method not implemented.");
  }
  deSelectSubMenu$: BehaviorSubject<any>;
  deSelectMainMenu$: BehaviorSubject<any>;
  showSidenav$: BehaviorSubject<boolean>;
  setSidenavClass$: BehaviorSubject<string>;
  setSideToggleButton$: BehaviorSubject<boolean>;
  marketPlaceName: any;
  constructor(private http: HttpClient) {
    this.deSelectSubMenu$ = new BehaviorSubject('');
    this.deSelectMainMenu$ = new BehaviorSubject('');
    this.setSideToggleButton$ = new BehaviorSubject(false);
    this.sideNavToggle();
    //  this.getMarketDetails();
  }


  sessionId = new HttpHeaders({ 'X-SESSIONID': sessionStorage.getItem('session_id') });
  postHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-SESSIONID': sessionStorage.getItem('session_id')
  });

  postHeaderOptions = {
    headers: this.postHeaders,
    responseType: 'json'
  };
  img_post_headers = new HttpHeaders({
    // 'Content-Type': undefined,
    'X-SESSIONID': sessionStorage.getItem('session_id')
  });
  image_post_header_options = {
    headers: this.img_post_headers
  };
  getMenuItems() {
    return this.http.get('./assets/jsons/menu.json');
  }
  getSideMenuItems() {
    return this.http.get('./assets/jsons/sidemenu.json');
  }
  getAppDetail(): Observable<any> {
    return this.http.get('../../../assets/jsons/app_details.json');
  }
  getMarketDetails() {
    return this.http.get('./assets/jsons/market_details.json');
    //  this.http.get('./assets/jsons/market_details.json').subscribe(data => {
    //    this.marketPlaceName = data['marketName'];
    console.log('service market value', this.marketPlaceName);
  }

  reload() {
    this.setSideToggleButton$.next(false);
    this.deSelectMainMenu$.next('');
    this.deSelectSubMenu$.next('');
    this.showSidenav$.next(true);
    this.setSidenavClass$.next('');
  }
  sideNavToggle() {
    if (window.screen.width >= 320 && window.screen.width <= 1023) {
      this.showSidenav$ = new BehaviorSubject(false);
      this.setSidenavClass$ = new BehaviorSubject('fliph');
    } else {
      this.showSidenav$ = new BehaviorSubject(true);
      this.setSidenavClass$ = new BehaviorSubject('');
    }
  }


  // posting user details for registration
  registration = function (userDetials) {
    console.log('from service', userDetials);
    const hdrs = new HttpHeaders({ 'X-PASS': userDetials.password });
    hdrs.append('Content-Type', 'application/json');
    return this.http.post(global.ctldurl + '/user/selfregistration/v1?tenantName=world',
      userDetials, { headers: hdrs, observe: 'response' });
  };

  // get mobile number based otp

  mobileNumberBasedOtp(user) {
    const hdrs = new HttpHeaders({'X-USER' : user + '@@world'});
    hdrs.append('content-Type', 'text/plain');
    return this.http.get(global.ctldurl + '/session/v1/otp' , { headers: hdrs, observe: 'response'});
  }


  // mobile number and otp based login
  otpBasedSession(user, password) {
    const hdrs = new HttpHeaders({'X-USER' : user + '@@world' , 'X-PASS' : password });
    hdrs.append('content-Type', 'text/plain');
    return this.http.post(global.ctldurl + '/session/v1' , {}, { headers: hdrs, observe: 'response'});
  }

  // to get session iD from service
  session(creds) {
    const hdrs = new HttpHeaders({ 'X-USER': creds.firstName, 'X-PASS': creds.password });
    hdrs.append('Content-Type', 'application/text');
    console.log('suces');
    return this.http.post(global.ctldurl + '/session/v1', {},
      { headers: hdrs, observe: 'response' });
  }

  // get otp
  getOtpResponse = function (otpDetails) {
    const hdrs = new HttpHeaders({ otp: otpDetails.otp, modKey: otpDetails.modKey, tenantName: 'world' });
    hdrs.append('content-Type', 'text/plain');
    return this.http.get(global.ctldurl + '/user/selfregistration/v1/activate?userId='
      + otpDetails.userId, { headers: hdrs, observe: 'response' });
  };

  // generate modkey
  generateModekey(username) {
    const hdrs = new HttpHeaders({ 'X-USER': username });
    hdrs.append('content-Type', 'text/plain');
    return this.http.get(global.ctldurl + '/session/v1/pass',
      { headers: hdrs, observe: 'response' });
  }


  //  get user details
  getUserDetails(username) {
    console.log('service', username);
    let headers=new HttpHeaders({ 'X-SESSIONID': sessionStorage.getItem('session_id') });
    // return this.http.get(global.ctldurl + '/tenant/user/v1?login=' + username,
    return this.http.get(global.ctldurl + '/tenant/user/v1',
      { headers: headers });
  }

  // get contact details
  getUserContactDetails(id) {
    console.log('id from servicecontact', id);
    // return this.http.get(global.ctldurl + '/tenant/user/contact/criteria/v1?criteria=user.id%3D' +
    //   id + '&includeAttributes=contact.contactValue',
    //   { headers: this.sessionId });
    return this.http.get(global.ctldurl + '/tenant/user/contact/criteria/v1?criteria=user.id%3D' +
    id,
    { headers: this.sessionId });
  }

 // get socialNetwork
 getSocialNetwork() {
   return this.http.get(global.ctldurl + '/globalrefdata/v1?refClass=GREF.SOCIAL_NETWORK',
   {headers: this.sessionId});
 }

// get language
getLanguage() {
  return this.http.get(global.ctldurl + '/globalrefdata/v1?refClass=GREF.LANG_KNOWN',
  {headers: this.sessionId});
}
 // get city
 getCity() {
  return this.http.get(global.ctldurl + '/globalrefdata/v1?refClass=GREF.CITY',
  {headers: this.sessionId});
}

  // user profile pic changing
  changeUserprofilepic(imageFileData) {
    return this.http.put(global.ctldurl + '/tenant/user/v1/iconpic',
      imageFileData, this.image_post_header_options);
  }
  // get profile pic id
  getProfilePic(id) {
    console.log('ifrom serviced', id);
    // const id = sessionStorage.getItem('id');
    return this.http.get(global.ctldurl + '/tenant/user/v1/iconpic?id=' + id +
      '&encodingType=base64', { headers: this.sessionId, responseType: 'text' });
  }

  // get domains
  getDomains() {
    return this.http.get(global.ntldurl + '/brnetinterest/v1',
      { headers: this.sessionId });
  }

  // get following domains
  getFollowingDomain(id) {
    return this.http.get
      (global.ntldurl + '/brnetactor/v1?criteria=actorType.code%3D%22ACTOR_TYPE.BRIDGE_USER%22%20AND%20actorId%3D%22' + id + '%22',
        { headers: this.sessionId });
  }

  //
  updateUserDetails(userDetials) {
    return this.http.patch(global.ctldurl + '/tenant/user/v1', userDetials,
    {headers: this.sessionId});
  }
  // update interested domains
  updateIntrestedDomains(newIntrest) {
    return this.http.patch
      (global.ntldurl + '/brnetactor/v1', [newIntrest], this.image_post_header_options);
  }

  // selected domains
  selecteddomain(intrestDetails) {
    console.log('inter from service', intrestDetails);
    const hdrs = new HttpHeaders({ 'X-SESSIONID': sessionStorage.getItem('session_id') });
    hdrs.append('Content-Type', 'application/json');
    return this.http.post(global.ntldurl + '/brnetcgs/joinnetwork/user/v1', intrestDetails,
      { headers: hdrs, observe: 'response' });
  }

  // get softskills
  getSoftSkills() {
    return this.http.get
      (global.ltldurl + '/ltldskill/v2?criteria=skillType%20.code%3D%22SKILL_TYPE.JOURNEY_USER_SKILL%22',
        { headers: this.sessionId });
  }

  // selectedSkills
  getSelectedSkills(id) {
    return this.http.get
      (global.ltldurl + '/ltldskill/ltlduserskill/v1?criteria=user%3D' + id
        + '%20and%20(skill.skillType.code%3D%22SKILL_TYPE.JOURNEY_USER_SKILL%22%20or%20skill.skillType.code%3D%22SKILL_TYPE.JOURNEY_USER_HARD_SKILL%22)%20%20and%20isActive%3Dtrue',
        { headers: this.sessionId });
  }

  getSelectedUserSkills(id) {
    return this.http.get (global.ltldurl + '/ltldskill/ltlduserskill/v1?criteria=user%3D' + id , { headers: this.sessionId});
  }

  // get hardskills
  getHardSkills() {
    return this.http.get
      (global.ltldurl + '/ltldskill/v2?criteria=skillType.code%3D%22SKILL_TYPE.JOURNEY_USER_HARD_SKILL%22%20',
        { headers: this.sessionId });
  }

  // update skills
  updateSkills(InterestedSKills) {
    console.log('interested skills', InterestedSKills);
    const hdrs = new HttpHeaders({ 'X-SESSIONID': sessionStorage.getItem('session_id') });
    hdrs.append('Content-Type', 'application/json');
    return this.http.post(global.ltldurl + '/ltldskill/ltlduserskill/v1', InterestedSKills,
      { headers: hdrs, observe: 'response' });
  }
  // remove selected skills
  removeSelectedSkills(userId) {
    return this.http.delete(global.ltldurl + '/ltldskill/ltlduserskill/v1?lTLDUserSkillId=' + userId, { headers: this.sessionId });
  }

  // load catalogue
  loadCatalogueForUser(marketname, version, format) {
    // data set calling with params

    console.log('marketplace name from load', this.marketPlaceName);
    return this.http.get(global.rtldurl +
      '/dataset/v1/execute?name=Load_Catalogue&version=1&params=World_User_ID=' + sessionStorage.getItem('id')
      + '--Market_Name=' + marketname + '&format=' + format,
      { headers: this.sessionId, observe: 'response' });
  }
  // fetch product domains
  fetchProductDomains(product_Ids) {
    return this.http.get(global.rtldurl + '/dataset/v1/execute?name=CommonEntityMapandDomain&version=1&params=Product_Ids=' + product_Ids +
      '&format=json', { headers: this.sessionId, observe: 'response' });
  }
  // fetch products
  fetchProducts(productIds) {
    return this.http.get(global.ctldurl + '/product/v1?criteria=id in ('
      + productIds + ')&includeAttributes=id,name,description,longDescription',
      {
        headers: this.sessionId, observe: 'response'
      });
  }

  // fetch partnerlogo
  fetchPartnerLogo(productTenantId) {
    return this.http.get(global.ctldurl + '/tenant/v1/iconpic?id=' + productTenantId + '&encodingType=base64',
      { headers: this.sessionId, responseType: 'text' });
  }


}
