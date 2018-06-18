import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  public avance1: number = 30; 
  public avance2: number = 50; 
  constructor() { }

  ngOnInit() {
  }

  public actualizarProgreso1(event: number){
    this.avance1 = event;
  }
  public actualizarProgreso2(event: number){
    this.avance2 = event;
  }

}
