import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../modelos/usuario.model';

declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public recuerdame = false;
  public email:string;
  public auth2:any;

  constructor(
    public router: Router,
    public usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email=localStorage.getItem('email') || '';
    if(this.email){
      this.recuerdame = true;
    }else{
      this.recuerdame = false;
    }
  }

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '65710853061-efnhq778g99qph2bo2qqthbhqfd0d9eh.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile'
      });

      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element){
    this.auth2.attachClickHandler(element, {}, (googleUser)=>{
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      console.log(token);
      this.usuarioService.loginGoogle(token)
      .subscribe((resp:any)=>{
        //this.router.navigate(['/dashboard']);
        window.location.href='#/dashboard';
      });
      
    });
  }

  ingresar(formulario: NgForm){
    console.log('Estatus formulario: ' + formulario.valid);

    if(formulario.invalid){
      return;
    }else{
      console.log(formulario.value);
      let usuarioLoguear = new Usuario(null, null, formulario.value.email, formulario.value.password);
      this.usuarioService.login(usuarioLoguear, formulario.value.recuerdame).subscribe((resp:any)=>{
        this.router.navigate(['/dashboard']);  
      });
    }
    
    //
  }

}
