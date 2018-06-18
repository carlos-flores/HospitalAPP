import { NgModule } from '@angular/core';
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

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficaDonaComponent
      ],
      exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
      ],
      imports: [
          SharedModule,
          FormsModule,
          ChartsModule,
          PAGES_ROUTES
      ]
})
export class PagesModule{}