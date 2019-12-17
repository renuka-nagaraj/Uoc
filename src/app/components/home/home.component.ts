import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { LoginviewDirective } from '../../auth/directives/loginview.directive';
import { LoginComponent } from 'src/app/auth/components/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(LoginviewDirective) hostDirective: LoginviewDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.loadComponent(LoginComponent);
    // history.pushState(null, null, location.href);
    // window.onpopstate = function () {
    //   history.go(1);
    // };
  }

  loadComponent(name) {
    const componentresolver = this.componentFactoryResolver.resolveComponentFactory(name);
    const viewContainer = this.hostDirective.viewContainerRef;
    viewContainer.clear();
    const createComp = viewContainer.createComponent(componentresolver);
  }
}
