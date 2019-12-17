import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginData$: Observable<boolean>;
  showToggle$: Observable<boolean>;
  data: any;
  menus: any;
  currentRoute;
  menuList  = [];
  constructor(private authservice: AuthService, private route: Router,
    private appService: DataService) {
    this.loginData$ = this.authservice.authStatus$;
    this.showToggle$ = this.appService.setSideToggleButton$;
  }

  ngOnInit() {
    this.getAppDetail();
    this.appService.getMenuItems().subscribe((data: any) => {
      this.menus = data;
      this.getRouterSnap(this.menus);
    });
  }
  getRouterSnap(data) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url.split('/');
        console.log(event.url);
        if (data !== undefined) {
          this.appService.setSideToggleButton$.next(false);
          const rsidenav = data.filter((res) => {
            return res.link === this.currentRoute[1];
          });
          if (rsidenav[0] !== undefined) {
            this.checkRoute(rsidenav[0]['sidenav']);
          }
        }
      }
    });
  }
  catalogue(value) {
    console.log('clicked', value);
    if (value === 'catalogue') {
      this.route.navigateByUrl('catalogue');
    } else if (value === 'explore') {
      this.route.navigateByUrl('profile');
    }
  }
  logout() {
    sessionStorage.clear();
    this.appService.reload();
    this.authservice.changeStatus(false);
    this.route.navigateByUrl('login');
    setTimeout(() => {
      window.location.reload();
       }, 200);
  }
  checkRoute(status: boolean) {
    if (status) {
      this.appService.setSideToggleButton$.next(true);
    } else {
      this.appService.setSideToggleButton$.next(false);
    }
  }
  getAppDetail() {
    this.appService.getAppDetail().subscribe(
      result => {
        this.data = result;


      });
  }
  toggleSidenav() {
    if (this.appService.showSidenav$.value) {
      this.appService.setSidenavClass$.next('fliph');
      this.appService.showSidenav$.next(false);
    } else {
      this.appService.showSidenav$.next(true);
      this.appService.setSidenavClass$.next('');
    }
  }

}
