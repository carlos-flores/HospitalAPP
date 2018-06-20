import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
  temaUrl: 'aasets/css/colors/default.css',
  tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }

  guardarAjustes(){
    console.log('Guardando ajustes...');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }
  
  cargarAjustes(){
    if(localStorage.getItem('ajustes')){
      console.log('Cargando ajustes...');
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    }else{
      console.log('Cargando ajustes predeterminados...');
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema: string){
    let urlCOLOR = `assets/css/colors/${tema}.css`;
    this.ajustes.temaUrl = urlCOLOR;
    this.ajustes.tema = tema;
    this._document.getElementById('temaColor').setAttribute('href',urlCOLOR);
    this.guardarAjustes();
  }
  
  
}


interface Ajustes{
  temaUrl: string;
  tema: string;
}