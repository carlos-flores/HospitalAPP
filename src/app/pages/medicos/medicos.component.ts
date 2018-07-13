import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../modelos/medico.model';
import { ModalUploadService } from '../modal-upload/modal-upload.service';
import { Router } from '@angular/router';


declare var swal:any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];
  public loading:boolean = false;
  public totalRegistros: number = 0;
  public tam: number = 5;
  public desde: number =0;

  constructor(
    public medicoService: MedicoService,
    public modalService: ModalUploadService,
    public router:Router) { }

  ngOnInit() {
    this.cargarMedicos();
    this.modalService.notificacion.subscribe(resp => {
      this.cargarMedicos();
    });
  }

  cargarMedicos() {
    this.loading = true;
    this.medicoService.cargarMedicos().subscribe(
      (resp: any) => {
        this.totalRegistros = resp.length;
        this.medicos = resp;
        this.loading = false;

      }
    );
  }

  buscarMedicos(termino: string) {
    if(termino.length<=0){
      this.cargarMedicos();
      return;
    }
    this.loading = true;
    this.medicoService.buscarMedicos(termino).subscribe(
      (resp:any)=>{
        this.totalRegistros = resp.medico.length;
        this.medicos = resp.medico;
        this.loading = false;
      }
    );
  }

  nuevoMedico(){
    this.router.navigate(['/medico','nuevo'])
  }

  mostrarModal(id:string){
    this.modalService.mostrarModal('medicos',id);
  }

  editarMedico(medicoEditar: Medico){
    this.router.navigate(['/medico',medicoEditar._id])
  }

  borrarMedico(medicoBorrar:Medico){

    swal({
      title: "¿Estas seguro?",
      text: "Se borrará el médico " + medicoBorrar.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true
    })
    .then((willDelete) => {
      if (willDelete) {
        this.medicoService.borrarMedico(medicoBorrar._id).subscribe(()=>{
          this.cargarMedicos();
        });
      } else {
        console.log('No se borra ningun médico');
        
      }
    });
  
}

cambiarDesde(valor: number) {
  let desde = this.desde + valor;
  if (desde >= this.totalRegistros) {
    return;
  } else if (desde < 0) {
    return;
  }
  this.desde += valor;
  this.cargarMedicos();
}
}
