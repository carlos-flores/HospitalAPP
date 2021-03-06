import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  paginaActual: any;
  

  constructor(private router: Router,
  titulo: Title,
  meta: Meta) {
    this.getDataRoute().subscribe(
      evento => {
        this.paginaActual = evento;
        titulo.setTitle(this.paginaActual.titulo);

        const metaTag: MetaDefinition = {
          name:'description',
          content:this.paginaActual.description
        }
        
        meta.updateTag(metaTag);
      }
    );
   }

  ngOnInit() {
  }

  getDataRoute(){
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }

}
