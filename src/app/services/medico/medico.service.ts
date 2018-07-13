import { Injectable } from '@angular/core';
import { URL_SERVCIOS } from '../../config/config';
import { Medico } from '../../modelos/medico.model';
import { SubirArchivosService } from '../subirArchivos/subir-archivos.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService) { }

  cargarMedicos(){
    console.log('Se cargan Médicos...');
    
    let URL = URL_SERVCIOS + '/medico';
    return this.http.get(URL).pipe(map((resp:any)=>{
      return resp.medicos;
    }));
  }


  buscarMedicos(termino: string){
    let URL = URL_SERVCIOS + "/busqueda/colleccion/medico/"+termino;
    return this.http.get(URL);
  }

  obtenerMedico(idMedico: string){
    let URL = URL_SERVCIOS + "/medico/"+idMedico;
    return this.http.get(URL).pipe(map((resp:any)=>{
      return resp.medico;
    }));
  }

  crearMedico(medico: Medico ) {
    let url = URL_SERVCIOS + '/medico?token='+this.usuarioService.token;
    return this.http.post(url,medico).pipe(map((resp: any) => {
      swal('Médico Registrado', medico.nombre + " " + medico.apellidos, 'success');
      return resp.medico;
    }));
  }

  borrarMedico(idMedico:string){
    let URL = URL_SERVCIOS + "/medico/"+idMedico+"?token="+this.usuarioService.token;
    return this.http.delete(URL).pipe(map((resp:any)=>{
      swal('Médico eliminado', 'Se eliminó el médico '+ resp.medico.nombre, 'success');
      return true;
    }));
  }

  actualizarMedico(medico: Medico) {

    let url = URL_SERVCIOS + '/medico/' + medico._id + '?token=' + this.usuarioService.token;

    return this.http.put(url, medico).pipe(map((resp: any) => {
      swal('Medico Actualizado', medico.nombre, 'success');
      return resp.medico;
    }));
  }
}
