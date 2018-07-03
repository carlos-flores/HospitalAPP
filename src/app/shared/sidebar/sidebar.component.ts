import { Component, OnInit } from '@angular/core';
import { SideBarService, UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public _sidebar:SideBarService,
    public usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  logout(){
    this.usuarioService.logout();
  }
}
