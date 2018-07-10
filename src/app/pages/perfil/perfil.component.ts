import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../modelos/usuario.model';
import {NgForm} from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: string;

  constructor(public usuarioService: UsuarioService) { 
    this.usuario = this.usuarioService.usuario; 
    console.log(this.usuario._id);
    
  }

  ngOnInit() {
  }

   actualizar(formulario: NgForm){
     console.log(formulario);
     
    this.usuario.nombre = formulario.value.nombre;
    this.usuario.apellidos = formulario.value.apellidos;
    this.usuario.email = formulario.value.email;
    console.log('usuario id: ' + this.usuario._id);
    
    console.log('Estatus formulario: ' + formulario.valid);

    if(formulario.invalid){
      return;
    }else{
      console.log(formulario.value);
      console.log(this.usuario);
      
      this.usuarioService.actualizarUsuario(this.usuario).subscribe();
    }
    
    //
  }

  seleccionImagen(archivo: File){
    if(archivo && archivo.type.indexOf('image')>=0){
      console.log('archivo:' );
      console.log(archivo);
      this.imagenSubir = archivo;
      let reader = new FileReader();
      let urlImagenTemporal = reader.readAsDataURL(archivo);
      reader.onloadend = () =>{
        this.imagenTemporal = reader.result;
      }
      
    }else{
      swal('Error al seleccionar','No se ha seleccionado un archivo de imagen','error');
      console.log('No se tiene imagen');
      this.imagenSubir = null;
      this.imagenTemporal = null;
    }
  }

  cambiarImagen(){
    console.log('se debe de cambiar imagen...');
    console.log('usuario:');
    console.log(this.usuario);
    
    
    this.usuarioService.cambiarImagen(this.imagenSubir,this.usuario._id);
    
  }
}
