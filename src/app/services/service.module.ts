import { SettingsService, SideBarService, SharedService, UsuarioService, LoginGuardGuard } from './service.index';
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
    LoginGuardGuard 
  ],
  declarations: []
})
export class ServiceModule { }
