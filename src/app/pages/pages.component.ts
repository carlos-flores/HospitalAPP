import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  year: number = 111;
  constructor() { }

  ngOnInit() {
    init_plugins();
    var d = new Date();
    this.year = d.getFullYear();
  }

}
