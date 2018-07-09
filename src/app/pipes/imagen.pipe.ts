import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVCIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'usuarios'): any {
    let url = URL_SERVCIOS + '/img/'+tipo+'/';
    if (!imagen) {
      return url + 'xxx.png'
    } else if(imagen.indexOf('https')>= 0 ){
      return imagen;
    }else{
      return url + imagen;
    }
  }

}
