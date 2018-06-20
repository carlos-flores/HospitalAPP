import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
@Component({
  selector: 'app-acount-setting',
  templateUrl: './acount-setting.component.html',
  styles: []
})
export class AcountSettingComponent implements OnInit {

  constructor(private settingsSRV: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(color: string, link:any){
    this.aplicarCheck(link);
    console.log(color);
    this.settingsSRV.aplicarTema(color);
    
    
  }

  aplicarCheck(link:any){
    let selectores: any = document.getElementsByClassName('selector');
    for(let ref of selectores){
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck(){
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this.settingsSRV.ajustes.tema;
    for(let ref of selectores){
      ref.classList.remove('working');
    }
    for(let ref of selectores){
      if(ref.getAttribute('data-theme')=== tema){
        ref.classList.add('working');
        break;
      }
    }
  }

}
