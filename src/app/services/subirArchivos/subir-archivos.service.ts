import { Injectable } from '@angular/core';
import { URL_SERVCIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {

  constructor() { }

  subirArchivo(archivo: File, modelo: string, id: string){

    return new Promise(
      (resolve,reject)=>{
        let formData = new FormData();
        let xhr = new XMLHttpRequest();
        formData.append('imagen', archivo, archivo.name);
        xhr.onreadystatechange = function(){
          if(xhr.readyState === 4){
            if(xhr.status === 200){
              console.log('Imagen subida correctamente...');
              resolve(JSON.parse(xhr.response);
            }else{
              console.log('Error en carga de imagen...');
              reject(xhr.response);
            }
          }
        };

        let url = URL_SERVCIOS + '/upload/'+modelo+'/'+id;
        xhr.open('PUT', url, true);
        xhr.send(formData);
      }
    );
  
  }
}
