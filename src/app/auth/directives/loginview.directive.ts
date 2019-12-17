import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLoginview]'
})
export class LoginviewDirective {
  data: any = 'Dir';

  constructor(public viewContainerRef: ViewContainerRef) {}
}
