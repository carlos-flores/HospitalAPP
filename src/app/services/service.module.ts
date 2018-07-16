import { SettingsService, SideBarService, SharedService, UsuarioService, LoginGuardGuard, SubirArchivosService, AdminGuard } from './service.index';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../pages/modal-upload/modal-upload.service';

SharedService

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SettingsService, 
    SideBarService, 
    SharedService, 
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivosService,
    ModalUploadService 
  ],
  declarations: []
})
export class ServiceModule { }
