import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVCIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators'
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { SubirArchivosService } from '../subirArchivos/subir-archivos.service';
import { throwError } from 'rxjs/internal/observable/throwError';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public token: string;
  public usuario: Usuario;
  public menu: any[] = [];

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
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }
  registrarEnStorage(id, token, usuario, menu:any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.token = token;
    this.usuario = usuario;
    this.menu = menu;
  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVCIOS + '/usuario';
    return this.http.post(url, usuario).pipe(map((resp: any) => {
      swal('Usuario Registrado', usuario.email, 'success');
      return resp.usuario;
    }),catchError(error => {
      console.log(error);
      swal('Errorrrrr', error.error.mensaje, 'error');
      return throwError(error);
    }));
  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVCIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    console.log(usuario);

    return this.http.put(url, usuario).pipe(map((resp: any) => {
      console.log('resp:');

      console.log(resp);

      if(resp.usuario._id === this.usuario._id){
        this.registrarEnStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
      }
      
      swal('Usuario Actualizado', resp.usuario.email, 'success');
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
      console.log(resp);
      this.registrarEnStorage(resp.id, resp.token, resp.usuario, resp.menu);
      swal('Bienvenido', usuario.email, 'success');
      return true;
    }),catchError(error => {
      console.log(error.status);
      swal('Error', error.error.mensaje, 'error');
      return throwError(error);
    }));
  }

  loginGoogle(token: string) {
    let url = URL_SERVCIOS + '/login/google';
    return this.http.post(url, { token }).pipe(map((resp: any) => {
      console.log(resp);
      this.registrarEnStorage(resp.id, resp.token, resp.usuario, resp.menu);
      swal('Bienvenido', this.usuario.email, 'success');
      return true;
    }));
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.token = '';
    this.usuario = null;
    this.menu = [];
    this.router.navigate(['/login']);
  }

  cambiarImagen(file:File, id: string){
    this.subirArchivoService.subirArchivo(file, 'usuarios', id)
    .then((resp: any) =>{
      console.log('OK:');
      console.log(resp);
      
      this.usuario.img = resp.usuarioActualizado.img;
      this.registrarEnStorage(resp.usuarioActualizado._id, this.token, resp.usuarioActualizado, this.menu);
      swal('Imagen Actualizada', 'La imagen del perfil ha sido actualizada correctamente','success');
      
    }).catch( resp => {
      console.log(resp);
      
    });
  }

  cargarUsuarios(desde: number, tam: number){
    let URL = URL_SERVCIOS + "/usuario?desde="+desde+'&tam='+tam;
    return this.http.get(URL);
  }

  buscarUsuarios(termino: string){
    let URL = URL_SERVCIOS + "/busqueda/colleccion/usuario/"+termino;
    return this.http.get(URL);
  }

  borrarUsuario(idUsuario: string){
    let URL = URL_SERVCIOS + "/usuario/"+idUsuario+"?token="+this.token;
    return this.http.delete(URL);
  }

}

