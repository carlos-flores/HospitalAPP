import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AcountSettingComponent } from './acount-setting/acount-setting.component';
import { PromesasComponent } from './promesas/promesas.component'
import { RxjsComponent } from './rxjs/rxjs.component'
import { LoginGuardGuard } from '../services/service.index';
import { PerfilComponent } from './perfil/perfil.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'DashBoard', description: 'Pagina que muestra el dashborad de la aplicación ' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil del Usuario', description: 'Pagina que muestra el perfíl del usuario' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress', description: 'Pagina que muestra el progreso' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas', description: 'Pagina que muestra las graficas del sistema' } },
            { path: 'account-settings', component: AcountSettingComponent, data: { titulo: 'Settings', description: 'Pagina que permite cambiar el color del tema' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas', description: 'Pagina que permite utilizar una promesa ' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJS', description: 'Pagina que permite usar observables' } },
            { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);