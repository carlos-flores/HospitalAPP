import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../modelos/hospital.model';
import { Router } from '@angular/router';
import { ModalUploadService } from '../modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  tam: number = 5;
  loading: boolean = false;

  constructor(
    public hospitalService: HospitalService,
    private router: Router,
    public modalService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this.modalService.notificacion.subscribe(resp => {
      this.cargarHospitales();
    });
  }

  buscarHospital(termino: string) {
    if(termino.length<=0){
      this.cargarHospitales();
      return;
    }
    this.loading = true;
    this.hospitalService.buscarHospital(termino).subscribe(
      (resp:any)=>{
        this.totalRegistros = resp.hospital.length;
        this.hospitales = resp.hospital;
        this.loading = false;
      }
    );
  }

  cargarHospitales() {
    this.loading = true;
    this.hospitalService.cargarHospitales().subscribe(
      (resp: any) => {
        this.totalRegistros = resp.length;
        this.hospitales = resp;
        this.loading = false;

      }
    );
  }

  mostrarModal(id:string){
    this.modalService.mostrarModal('hospitales',id);
  }

  guardarHospital(hospitalGuardar: Hospital){
    this.hospitalService.actualizarHospital(hospitalGuardar).subscribe();
  }

  borrarHospital(hospitalBorrar:Hospital){

      swal({
        title: "¿Estas seguro?",
        text: "Se borrará el hospital " + hospitalBorrar.nombre,
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
      .then((willDelete) => {
        if (willDelete) {
          this.hospitalService.borrarHospital(hospitalBorrar._id).subscribe(
            (resp:any)=>{
              swal("Hospital eliminado ["+resp.hospital.name+"]", {
                icon: "success",
              });
            this.cargarHospitales();
            }
          )
        } else {
          console.log('No se borra ningun hospital');
          
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
    this.cargarHospitales();
  }

  nuevoHospital(){
    console.log('Se debe crear un nuevo hospital');
    swal({
      title: "Nuevo Hospital",
      text: "Nombre:" ,
      buttons: true,
      dangerMode: true,
      content: {
        element: "input",
        attributes: {
          placeholder: "Nombre hospital",
          type: "text",
        },
      }
    })
    .then((nombreHospital) => {
      if (nombreHospital) {
        console.log(nombreHospital);
        
        this.hospitalService.crearHospital(nombreHospital).subscribe(
          (resp:any)=>{
            swal("Hospital creado ", {
              icon: "success",
            });
          this.cargarHospitales();
          }
        )
      } else {
        console.log('No se creará ningun hospital');
        
      }
    });
  }

}
