import { Component, OnInit, Input, Output, EventEmitter,ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html'
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input()
  leyenda: string = '';

  @Input()
  public avance: number = 50;

  @Output()
  cambioValor: EventEmitter<number> = new EventEmitter();



  constructor() { }

  ngOnInit() {
  }

  incrementar() {
    this.cambiar(5);
  }

  decrementar() {
    this.cambiar(-5);
  }

  private cambiar(incremento) {
    this.avance = this.avance + incremento;
    if (this.avance > 100) {
      this.avance = 100;
    } else if (this.avance < 0) {
      this.avance = 0;
    }
    this.cambioValor.emit(this.avance);
  }

  onChanges(newValue: number) {
    if(newValue >100){
      this.avance = 100;
    } else if (newValue < 0) {
      this.avance = 0;
    }else{
      this.avance = newValue;
    }
    this.txtProgress.nativeElement.value = this.avance;
    this.cambioValor.emit(this.avance);
    this.txtProgress.nativeElement.focus();
  }
}
