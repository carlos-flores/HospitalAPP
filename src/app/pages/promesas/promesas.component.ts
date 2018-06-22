import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    
    this.contar3().then(
      (resp)=>console.log("ejecutado..." + resp)
      
    ).catch(
      (error)=>console.log("con error..."+error)
    );
   }

  ngOnInit() {
  }

  contar3(): Promise<boolean>{
    return new Promise((resolve,reject){
      let contador = 0;
      let intervalo = setInterval(()=>{
        contador += 1;
        console.log(contador);
        if(contador === 3){
          resolve(true);
          clearInterval(intervalo);
        }
      },2000);
    });
  
  }
  
}
