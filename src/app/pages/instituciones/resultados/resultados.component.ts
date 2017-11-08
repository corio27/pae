import { Component, OnInit } from '@angular/core';
import { NbSearchService } from '@nebular/theme'
import { Institucion } from '../../../@core/data/institucion';
import { InstitucionService } from '../../../@core/data/institucion.service';

@Component({
  selector: 'ngx-resultados',
  templateUrl: './resultados.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ResultadosComponent implements OnInit {

instituciones: Institucion[] = [];
institucion: Institucion;
tamano: number;
term: string = '';
filteredInstituciones: Institucion[] = [];
  constructor(private searchService: NbSearchService, private institucionService: InstitucionService) {
  }


  ngOnInit() {
    this.institucionService.getInstituciones().then(instituciones => this.instituciones = instituciones);
    this.assignCopy();
  }
   assignCopy() {
   this.filteredInstituciones = Object.assign([], this.instituciones);
}
filterItem(value) {
   console.info(value);
   if ( !value ) { this.assignCopy(); }
   this.filteredInstituciones = Object.assign([], this.instituciones).filter(
      institucion => institucion.Nombre.toLowerCase().indexOf(value.toLowerCase()) > -1 ,
   )
   console.info( this.filteredInstituciones );
}

tamanoString(value) {
  return value.length - 1;
}
   enBuscar(event) {
      if ( event.data == null ) {
        this.tamano = this.tamanoString( this.term ) ;
         this.term = this.term.substring(0, this.tamano);
         console.info( this.term );
      } else {
          this.term += event.data;
      }

      console.info(this.term);
      this.filterItem(this.term);
    }
}
