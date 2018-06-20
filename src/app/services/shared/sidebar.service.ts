import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Dashboard',
          url: '/dashboard'
        },
        {
          titulo: 'ProgressBar',
          url: '/progress'
        },
        {
          titulo: 'Gragicas',
          url: '/graficas1'
        }
      ]
    },
    {
      titulo: 'Principal2',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Dashboard',
          url: '/dashboard'
        },
        {
          titulo: 'ProgressBar',
          url: '/progress'
        },
        {
          titulo: 'Gragicas',
          url: '/graficas1'
        }
      ]
    }
  ];

  constructor() { }
}
