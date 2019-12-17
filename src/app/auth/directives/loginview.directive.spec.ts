import { LoginviewDirective } from './loginview.directive';
import {ViewContainerRef, inject} from '@angular/core';
import { async } from '@angular/core/testing';
describe('LoginviewDirective', () => {
  it('should create an instance', async(
     (vref: ViewContainerRef) => {
      const directive = new LoginviewDirective(vref);
    expect(directive).toBeTruthy();
    }));
});
