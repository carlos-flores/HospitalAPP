import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../modelos/usuario.model';
import { Router } from '@angular/router';



declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales(campo1:string, campo2: string){
    
      return  (group: FormGroup)=>{
        let pass1 = group.controls[campo1].value;
        let pass2 = group.controls[campo2].value;

        if(pass1 === pass2){
          return null;
        }

        return {
          sonIguales: false
        };
    };
  }

  ngOnInit() {
    init_plugins();

    this.formulario = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      apellidos: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      password2: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      condiciones: new FormControl(false, [Validators.required])
    }, {validators: this.sonIguales('password', 'password2')});

    this.formulario.setValue({
      nombre:'Carlos Augusto',
      apellidos: 'Flores Valerio',
      correo: 'carlos.flores.valerio@gmail.com',
      password:'123456',
      password2:'123456',
      condiciones: true
    });
  }

  registrar(){
    console.log('registrando usuario...');
    console.log(this.formulario.value);
    console.log('Formulario válido: ' + this.formulario.valid);

    if(this.formulario.invalid){
      console.log('Formulario invalido');
      swal("Lo sentimos", "Formulario invalido", "warning");
    }else if(!this.formulario.value.condiciones){
      console.log('Se deben de aceptar las condiciones');
      swal("Lo sentimos", "Para registrarte debes de aceptar las condiciones!!!", "warning");
    }else{
      console.log('Se registrará el usuario');

      let usuario = new Usuario(
        this.formulario.value.nombre,
        this.formulario.value.apellidos,
        this.formulario.value.correo,
        this.formulario.value.password);

        this.usuarioService.crearUsuario(usuario).subscribe(
          resp=>{
            console.log(resp);
            this.router.navigate(['/login']);
          },(err)=>{
            console.log(err);
            swal("Lo sentimos", "Error: " + err.error.mensaje, "warning")
          }
        );
     
      
    }
    
  }

}
