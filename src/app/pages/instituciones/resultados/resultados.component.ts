import { Component, OnInit } from '@angular/core';
import { NbSearchService } from '@nebular/theme'

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

  constructor(private searchService: NbSearchService ) {
  }
  term: string = '';
  ngOnInit() {
    this.searchService.onSearchSubmit().subscribe((data: {term: string, tag: string }) => {
      console.info(`term: ${data.term}, from search: ${data.tag}`);
    });
   }
   enBuscar(event) {
        if ( event.data != null ) {
         this.term += event.data;
         this.searchService.submitSearch(this.term, 'prueba');
       }
   }
}
