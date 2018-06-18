import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html'
})
export class GraficaDonaComponent implements OnInit {
  @Input() public leyenda = '';
  @Input() public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() public doughnutChartData:number[] = [350, 450, 100];
  @Input() public doughnutChartType:string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
