import { URL_SERVCIOS } from '../../config/config';
import { Hospital } from '../../modelos/hospital.model';
import { Injectable } from '@angular/core';
import { SubirArchivosService } from '../subirArchivos/subir-archivos.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})

export class HospitalService {
  public hospital: Hospital;

  constructor(
    public http: HttpClient,
    public subirArchivos: SubirArchivosService, 
    public usuarioService: UsuarioService
  ) { 
    
  }

 /*  cargarDesdeStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  } */

  cargarHospitales(){
    console.log('Se cargan hospitales...');
    
    let URL = URL_SERVCIOS + '/hospital';
    return this.http.get(URL).pipe(map((resp:any)=>{
      return resp.hospitales;
    }));
  }

  obtenerHospital(idHospital:string){
    let URL = URL_SERVCIOS + '/hospital/'+idHospital;
    return this.http.get(URL).pipe(map((resp:any)=>{
      return resp.hospital;
    }));
  }

  crearHospital(nombre:string ) {
    let url = URL_SERVCIOS + '/hospital?token='+this.usuarioService.token;
    let newHospital = new Hospital(nombre);
    return this.http.post(url,newHospital).pipe(map((resp: any) => {
      swal('Usuario Registrado', nombre, 'success');
      return resp.usuario;
    }));
  }

  borrarHospital(idHospital:string){
    let URL = URL_SERVCIOS + "/hospital/"+idHospital+"?token="+this.usuarioService.token;
    return this.http.delete(URL);
  }

  actualizarHospital(hospital: Hospital) {

    let url = URL_SERVCIOS + '/hospital/' + hospital._id + '?token=' + this.usuarioService.token;

    return this.http.put(url, hospital).pipe(map((resp: any) => {
      swal('Usuario Actualizado', hospital.nombre, 'success');
      return resp.hospital;
    }));
  }

  buscarHospital(termino: string){
    let URL = URL_SERVCIOS + "/busqueda/colleccion/hospital/"+termino;
    return this.http.get(URL);
  }
}
