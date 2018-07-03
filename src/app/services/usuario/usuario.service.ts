import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { HttpClient} from '@angular/common/http';
import { URL_SERVCIOS } from '../../config/config';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public token: string;
  public usuario: Usuario;

  constructor(
    public http: HttpClient,
    public router: Router) { 
    console.log('Servicio de Usuario listo...');
    this.cargarDesdeStorage();
  }

  estaLogueado(){
    return (this.token.length)? true: false;
  }

  cargarDesdeStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token='';
      this.usuario = null;
    }
  }
  registrarEnStorage(resp){
    localStorage.setItem('id',resp.id);
    localStorage.setItem('token', resp.token);
    localStorage.setItem('usuario', JSON.stringify(resp.usuario));
    this.token=resp.token;
    this.usuario = resp.usuario;
  }

  crearUsuario(usuario: Usuario){

    let url = URL_SERVCIOS+'/usuario';
    return this.http.post(url, usuario).pipe(map((resp:any)=>{
      swal('Usuario Registrado', usuario.email, 'success');
      return resp.usuario
    }));
  }

  login(usuario: Usuario, recordar: boolean = false){
    if(recordar){
      localStorage.setItem('email',usuario.email);
    }else{
      localStorage.removeItem('email');
    }
    let url = URL_SERVCIOS+'/login';
    return this.http.post(url, usuario).pipe(map((resp:any)=>{
      // localStorage.setItem('id',resp.id);
      // localStorage.setItem('token', resp.token);
      // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
      this.registrarEnStorage(resp);
      swal('Bienvenido', usuario.email, 'success');
      return true;
    }));    
  }

  loginGoogle(token:string){
    let url = URL_SERVCIOS+'/login/google';
    return this.http.post(url, {token}).pipe(map((resp:any)=>{
      this.registrarEnStorage(resp);
      swal('Bienvenido', this.usuario.email, 'success');
      return true;
    }));
    }
    
  logout(){
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.token='';
    this.usuario = null;
    this.router.navigate(['/login']);
  }


  }


}
