import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
declare var swal: any;


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  tam: number = 5;
  loading: boolean = false;

  constructor(
    public usuariosService: UsuarioService,
    private router: Router,
    public modalService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalService.notificacion.subscribe(resp => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.loading = true;
    this.usuariosService.cargarUsuarios(this.desde, this.tam).subscribe(
      (resp: any) => {

        console.log(resp);
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.loading = false;

      }
    );
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    } else if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if(termino.length<=0){
      this.cargarUsuarios();
      return;
    }
    console.log(termino);
    this.loading = true;
    this.usuariosService.buscarUsuarios(termino).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.totalRegistros = resp.usuario.length;
        this.usuarios = resp.usuario;
        this.loading = false;
      }
    );
  }

  borrarUsuario(usuarioBorrar:Usuario){
    console.log('borrar usuario...');
    if(usuarioBorrar._id === this.usuariosService.usuario._id){
      swal('Alerta de borrado','NO se permite borrar uno mismo','error');
      return;
    }else{
      swal({
        title: "¿Estas seguro?",
        text: "Se borrará el usuario " + usuarioBorrar.nombre,
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
      .then((willDelete) => {
        if (willDelete) {
          this.usuariosService.borrarUsuario(usuarioBorrar._id).subscribe(
            (resp:any)=>{
              swal("Usuario eliminado ["+resp.usuario.email+"]", {
                icon: "success",
              });
            //this.router.navigate(['/usuarios']);
            this.cargarUsuarios();
            }
          )
        } else {
          console.log('No se borra el usuario');
          
        }
      });
    }
  }

  guardarUsuario(usuarioGuardar: Usuario){
    this.usuariosService.actualizarUsuario(usuarioGuardar).subscribe();
  }

  mostrarModal(id:string){
    this.modalService.mostrarModal('usuarios',id);
  }
}
