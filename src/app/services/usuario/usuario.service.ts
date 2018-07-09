import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVCIOS } from '../../config/config';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { SubirArchivosService } from '../subirArchivos/subir-archivos.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public token: string;
  public usuario: Usuario;

  constructor(
    public http: HttpClient,
    public router: Router, 
    public subirArchivoService: SubirArchivosService)  {
    console.log('Servicio de Usuario listo...');
    this.cargarDesdeStorage();
  }

  estaLogueado() {
    return (this.token.length) ? true : false;
  }

  cargarDesdeStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }
  registrarEnStorage(id, token, usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.token = token;
    this.usuario = usuario;
  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVCIOS + '/usuario';
    return this.http.post(url, usuario).pipe(map((resp: any) => {
      swal('Usuario Registrado', usuario.email, 'success');
      return resp.usuario;
    }));
  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVCIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    console.log(usuario);

    return this.http.put(url, usuario).pipe(map((resp: any) => {
      console.log('resp:');

      console.log(resp);

      this.registrarEnStorage(resp.usuario._id, this.token, resp.usuario);
      swal('Usuario Actualizado', usuario.email, 'success');
      return resp.usuario;
    }));
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVCIOS + '/login';
    return this.http.post(url, usuario).pipe(map((resp: any) => {
      // localStorage.setItem('id',resp.id);
      // localStorage.setItem('token', resp.token);
      // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
      this.registrarEnStorage(resp.id, resp.token, resp.usuario);
      swal('Bienvenido', usuario.email, 'success');
      return true;
    }));
  }

  loginGoogle(token: string) {
    let url = URL_SERVCIOS + '/login/google';
    return this.http.post(url, { token }).pipe(map((resp: any) => {

      this.registrarEnStorage(resp.id, resp.token, resp.usuario);
      swal('Bienvenido', this.usuario.email, 'success');
      return true;
    }));
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.token = '';
    this.usuario = null;
    this.router.navigate(['/login']);
  }

  cambiarImagen(file:File, id: string){
    this.subirArchivoService.subirArchivo(file, 'usuarios', id)
    .then((resp: any) =>{
      console.log('OK:');
      console.log(resp);
      
      this.usuario.img = resp.usuarioActualizado.img;
      this.registrarEnStorage(resp.usuarioActualizado._id, this.token, resp.usuarioActualizado);
      swal('Imagen Actualizada', 'La imagen del perfil ha sido actualizada correctamente','success');
      
    }).catch( resp => {
      console.log(resp);
      
    });
  }


}

