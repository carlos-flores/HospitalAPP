import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AcountSettingComponent } from './acount-setting/acount-setting.component';
import { PromesasComponent } from './promesas/promesas.component'
import { RxjsComponent } from './rxjs/rxjs.component'
import { LoginGuardGuard, AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const pagesRoutes: Routes = [
            { path: 'dashboard', component: DashboardComponent, canActivate:[VerificaTokenGuard], data: { titulo: 'DashBoard', description: 'Pagina que muestra el dashborad de la aplicación ' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil del Usuario', description: 'Pagina que muestra el perfíl del usuario' } },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador', description: 'Muestra el resultado de una busqueda general' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress', description: 'Pagina que muestra el progreso' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas', description: 'Pagina que muestra las graficas del sistema' } },
            { path: 'account-settings', component: AcountSettingComponent, data: { titulo: 'Settings', description: 'Pagina que permite cambiar el color del tema' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas', description: 'Pagina que permite utilizar una promesa ' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJS', description: 'Pagina que permite usar observables' } },
            { path: 'usuarios', canActivate:[AdminGuard], component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios', description: 'Página que permites gestionar a los usuarios' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos', description: 'Página que permites gestionar a los médicos' } },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de Médico', description: 'Página que permites gestionar un médico' } },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales', description: 'Página que permite gestionar a los hospitales' } },
            { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);