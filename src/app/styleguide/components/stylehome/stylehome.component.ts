import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stylehome',
  templateUrl: './stylehome.component.html',
  styleUrls: ['./stylehome.component.scss']
})
export class StylehomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // history.pushState(null, null, location.href);
    // window.onpopstate = function () {
    //   history.go(1);
    // };
  }


}
