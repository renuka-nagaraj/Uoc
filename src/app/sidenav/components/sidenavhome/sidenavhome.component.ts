import {
  Component,
  OnInit
} from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidenavhome',
  templateUrl: './sidenavhome.component.html',
  styleUrls: ['./sidenavhome.component.scss']
})
export class SidenavhomeComponent implements OnInit {
  showSideNav$: BehaviorSubject<boolean>;
  menus: any;
  attr: any;
  loginData$: Observable<boolean>;
  selectedItem = 'active';
  selectedSubIndex$: BehaviorSubject<any>;
  selectedMainIndex$: BehaviorSubject<any>;
  sidenavClass$: BehaviorSubject<string>;
  constructor(
    private service: DataService,
    private authservice: AuthService
  ) {
    this.loginData$ = this.authservice.authStatus$;
    this.selectedSubIndex$ = this.service.deSelectSubMenu$;
    this.selectedMainIndex$ = this.service.deSelectMainMenu$;
    this.showSideNav$ = this.service.showSidenav$;
    this.sidenavClass$ = this.service.setSidenavClass$;
  }

  ngOnInit() {

    this.service.getSideMenuItems().subscribe(data => {
      this.menus = data;
    });
    this.service.getSideMenuItems().subscribe(data => {
      this.menus = data;
      if (this.menus[0]['title'] !== null) {
        sessionStorage.setItem('selectedmainmenu', this.menus[0]['title']);
      }
      if (this.menus[0]['submenu'][0] !== undefined) {
        sessionStorage.setItem('selectedsubmenu', this.menus[0]['submenu'][0]['title']);
      } else {
        sessionStorage.setItem('selectedsubmenu', '');
      }
      if (sessionStorage.getItem('selectedmainmenu') !== null) {
        this.service.deSelectMainMenu$.next(sessionStorage.getItem('selectedmainmenu'));
      } if (sessionStorage.getItem('selectedsubmenu') !== null) {
        this.service.deSelectSubMenu$.next(sessionStorage.getItem('selectedsubmenu'));
      }
    });
    if (sessionStorage.getItem('selectedmainmenu') !== null) {
      this.service.deSelectMainMenu$.next(sessionStorage.getItem('selectedmainmenu'));
      this.selectedMainIndex$ = this.service.deSelectMainMenu$;
    } if (sessionStorage.getItem('selectedsubmenu') !== null) {
      this.service.deSelectSubMenu$.next(sessionStorage.getItem('selectedsubmenu'));
      this.selectedSubIndex$ = this.service.deSelectSubMenu$;
    }
  }

  showfull(mainmenu?: any, submenulength?: any) {
    // this.renderer.removeClass(this.sidebar.nativeElement, 'fliph');
    if (window.screen.width >= 320 && window.screen.width <= 1023) {
      this.service.showSidenav$.next(false);
      this.service.setSidenavClass$.next('fliph');
    } else {
      this.service.showSidenav$.next(true);
      this.service.setSidenavClass$.next('');
    }
    this.service.setSidenavClass$.next('');
    sessionStorage.setItem('selectedmainmenu', mainmenu);
    this.service.deSelectMainMenu$.next(sessionStorage.getItem('selectedmainmenu'));
    this.selectedMainIndex$ = this.service.deSelectMainMenu$;
    if (submenulength) {

    } else {
      sessionStorage.setItem('selectedsubmenu', 'empty');
      this.service.deSelectSubMenu$.next(sessionStorage.getItem('selectedsubmenu'));
      this.selectedSubIndex$ = this.service.deSelectSubMenu$;
    }

  }
  select(mainmenu: any, submenu?: any, ) {
    if (window.screen.width >= 320 && window.screen.width <= 1023) {
      this.service.showSidenav$.next(false);
      this.service.setSidenavClass$.next('fliph');
    } else {
      this.service.showSidenav$.next(true);
      this.service.setSidenavClass$.next('');
    }
    if (submenu === undefined) {
      sessionStorage.setItem('selectedsubmenu', '');
    } else {
      sessionStorage.setItem('selectedsubmenu', submenu);
      this.service.deSelectSubMenu$.next(sessionStorage.getItem('selectedsubmenu'));
      this.selectedSubIndex$ = this.service.deSelectSubMenu$;
      sessionStorage.setItem('selectedmainmenu', mainmenu);
      this.service.deSelectMainMenu$.next(sessionStorage.getItem('selectedmainmenu'));
      this.selectedMainIndex$ = this.service.deSelectMainMenu$;
    }
  }

}
