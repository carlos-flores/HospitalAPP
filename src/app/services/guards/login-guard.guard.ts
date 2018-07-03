import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(
    public usuarioService: UsuarioService,
    public router: Router){

  }
  canActivate() {
    
    if(this.usuarioService.estaLogueado()){
      console.log('GUARD: Esta logueado');
      return true;
    }else{
      console.log('GUARD: NO Esta logueado');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
