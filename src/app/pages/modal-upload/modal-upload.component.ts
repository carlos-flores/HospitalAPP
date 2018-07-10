import { Component, OnInit } from '@angular/core';
import { SubirArchivosService } from '../../services/subirArchivos/subir-archivos.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  public imagenSubir: File;
  public imagenTemporal: string;

  constructor(
    public subirArchivoService: SubirArchivosService,
    public modalService: ModalUploadService) {
   }

  ngOnInit() {
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
    this.subirArchivoService.subirArchivo(this.imagenSubir,this.modalService.modelo,this.modalService.id)
    .then(resp => {
      this.modalService.notificacion.emit(resp);
      this.cerrarModal();
    })
    .catch(err=>{
      console.log('Error en la carga...');
    });
    
  }

  cerrarModal(){
    this.imagenSubir = null;
    this.imagenTemporal = null;
    this.modalService.ocultarModal();
  }

}
