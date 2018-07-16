import { Component, OnInit } from '@angular/core';
import { SideBarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../modelos/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario; 

  constructor(
    public _sidebar:SideBarService,
    public usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    this._sidebar.cargarMenu();
  }

  logout(){
    this.usuarioService.logout();
  }
}
