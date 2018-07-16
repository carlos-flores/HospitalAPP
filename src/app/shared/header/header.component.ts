import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public usuarioService: UsuarioService,
  public router:Router) { }

  ngOnInit() {
  }

  logout(){
    this.usuarioService.logout();
  }

  busquedaGeneral(texto){
    console.log('Se realiza busqueda general: '+ texto);
    this.router.navigate(['/busqueda',texto]);
  }
}
