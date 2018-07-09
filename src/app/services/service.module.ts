import { SettingsService, SideBarService, SharedService, UsuarioService, LoginGuardGuard, SubirArchivosService } from './service.index';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
    SubirArchivosService 
  ],
  declarations: []
})
export class ServiceModule { }
