import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService } from '../../services/service.index';
import { HospitalService } from '../../services/hospital/hospital.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Hospital } from '../../modelos/hospital.model';
import { Medico } from '../../modelos/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public medico: Medico = new Medico('', '', '', '', '', '');
  public hospital: Hospital = new Hospital('');

  constructor(
    public medicoService: MedicoService,
    public hospitalService: HospitalService,
    public usuarioService: UsuarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalService: ModalUploadService) { 
      activatedRoute.params.subscribe(
        resp => {
          let id = resp['id'];
          if(id !=='nuevo'){
            this.cargarMedico(id);
          }
        }
      );
    }

  ngOnInit() {
    this.hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.hospitales = resp;
    });

    this.modalService.notificacion.subscribe(
      (resp)=>{
        console.log('Se ha actualizado la imagen');
        console.log(resp);
        this.medico.img = resp.medicoActualizado.img;
        
      }
    );
  }

  guardarMedico(formulario: NgForm) {
    if(this.medico._id){
      this.medicoService.actualizarMedico(this.medico).subscribe((resp: any) => {
        this.medico= resp;
        this.router.navigate(['/medico',resp._id]);
      });
    }else{
      this.medicoService.crearMedico(this.medico).subscribe((resp: any) => {
        this.medico= resp;
        this.router.navigate(['/medico',resp._id]);
      });
    }
    

  }

  cargarMedico(id: string){
    console.log('cargando médico...');
    
  this.medicoService.obtenerMedico(id).subscribe(
    (resp)=>{
      console.log(resp);
      
      this.medico=resp;
      this.medico.hospital = resp.hospital._id;
      this.cargarHospital(this.medico.hospital);
    });
  }

  cargarHospital(id) {
    if (id) {
      this.hospitalService.obtenerHospital(id).subscribe((resp: any) => {
        this.hospital = resp;
      })
    }else{
      this.hospital = null
    }
  }

  cambiarFoto(id:string){
    this.modalService.mostrarModal('medicos',id);
 }
}
