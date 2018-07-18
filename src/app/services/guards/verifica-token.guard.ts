import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService,
  public router:Router) {

  }
  canActivate(): Promise<boolean> | boolean {
    console.log('Verificando TOKEN-Guard');
    let token = this.usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));
    
    if (this.expiroToken(payload.exp * 1000)) {
      // El token ha expirado
      console.log('Token ha expirado');
      //this.usuarioService.logout();
      this.router.navigate(['/login']);
      return false;
    } 
    
    console.log('Token válido...');
    return this.verificaRenueva(payload.exp * 1000);

  }

  expiroToken(fechaExpiracion) {
    console.log('fecha Actual:' + new Date());
    console.log('fecha expiración:' + new Date(fechaExpiracion ));
    let ahora = new Date().getTime();
    return fechaExpiracion < ahora;
  }

 

  verificaRenueva(fechaExpiracion): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tolerancia = new Date(fechaExpiracion).getTime() - 3600000;
      console.log('fecha Actual:' + new Date());
      console.log('Fecha para renovar token: ' + new Date(tolerancia));
      
      if (new Date().getTime() > tolerancia) {
        console.log('Se debe de actualizar token...');
        
        this.usuarioService.renovarTOKEN().subscribe(
          ()=>{
            console.log('Token actualizado');
            resolve(true);
          }, ()=>{
            console.log('Error al actualizar token...');
            reject(false);
            this.router.navigate(['/login']);
          }
        );
      } else {
        console.log('Innecesario actualizar token...');
        resolve(true);
      }
    });
  }
}
