import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public modelo:string;
  public id: string;
  public oculto:string = 'oculto';
  public notificacion = new EventEmitter<any>();

  constructor() { 
    console.log('Se ha cargado el servicio del modal...');
    
  }

  ocultarModal(){
    this.oculto="oculto";
    this.modelo=null;
    this.id=null;
  }

  mostrarModal(modelo: string, id: string){
    this.oculto='';
    this.modelo=modelo;
    this.id=id;
  }
}
