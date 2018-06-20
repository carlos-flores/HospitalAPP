import { SettingsService, SideBarService, SharedService } from './service.index';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

SharedService

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[
    SettingsService, 
    SideBarService, 
    SharedService 
  ],
  declarations: []
})
export class ServiceModule { }
