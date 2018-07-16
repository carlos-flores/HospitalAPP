import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVCIOS } from '../../config/config';
import { map } from 'rxjs/operators'
import { Hospital } from '../../modelos/hospital.model';
import { Medico } from '../../modelos/medico.model';
import { Usuario } from '../../modelos/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  public usuarios:Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    public activatedRoutes:ActivatedRoute, 
    public http: HttpClient) {
    this.activatedRoutes.params.subscribe(
      params => {
        let term = params['termino'];
        console.log('termino de busqueda:'+term);
        this.realizarBusqueda(term).subscribe(
          (resp)=>{
            console.log('usuarios: ' + this.usuarios.length);
            console.log('medicos: ' + this.medicos.length);
            console.log('hospitales: ' + this.hospitales.length);
          }
        );
      }
    );
   }

  ngOnInit() {
  }

  realizarBusqueda(termino:string){
    console.log('Se realiza busqueda general...');
    let URL = URL_SERVCIOS + "/busqueda/todo/"+termino;
    return this.http.get(URL).pipe(map((resp:any)=>{
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
      return true;
    }));
  }
}
