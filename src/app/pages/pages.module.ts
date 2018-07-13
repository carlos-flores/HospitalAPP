import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { IncrementadorComponent } from '../reutilizables/incrementador/incrementador.component';
import { GraficaDonaComponent } from '../reutilizables/grafica-dona/grafica-dona.component';
import { ChartsModule } from 'ng2-charts';
import { AcountSettingComponent } from './acount-setting/acount-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from './modal-upload/modal-upload.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { HospitalesComponent } from './hospitales/hospitales.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficaDonaComponent,
        AcountSettingComponent,
        PromesasComponent,
        RxjsComponent,
        PerfilComponent,
        UsuariosComponent,
        ModalUploadComponent,
        MedicosComponent,
        HospitalesComponent,
        MedicoComponent
      ],
      exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
      ],
      imports: [
          CommonModule,
          SharedModule,
          FormsModule,
          ChartsModule,
          PAGES_ROUTES,
          PipesModule
      ]
})
export class PagesModule{}