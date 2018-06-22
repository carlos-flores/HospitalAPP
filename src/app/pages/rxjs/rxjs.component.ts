import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription; 

  constructor() {
    
    
    this.subscription = this.regresaObservable().pipe(
      retry(5)
    ).subscribe(numero => {console.log('subs', numero);},
    (error)=>{console.log('Error:',error)},
  ()=>{console.log('ha terminado la ejecución')});
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log('la pagina se va a cerrar....');
    this.subscription.unsubscribe();
  }


  regresaObservable(): Observable<any>{
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        const salida = {
          valor:contador
        }
        observer.next(salida);

        /* if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        } */
        /* else if(contador === 2){
          clearInterval(intervalo);
          observer.error('se ha presentado un error...');
        } */
      }, 1000);
    }).pipe(map(resp=>{
      return resp.valor;
    }));
  }
}
