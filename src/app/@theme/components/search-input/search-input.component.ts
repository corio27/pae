import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Institucion } from '../../../@core/data/institucion';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { InstitucionService } from '../../../@core/data/institucion.service';
// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
@Component({
  selector: 'ngx-search-input',
  styleUrls: ['./search-input.component.scss'],
  template: `
    <i class="control-icon ion ion-ios-search"
       (click)="showInput()"></i>
    <input placeholder="Buscar Institución ..."
           #buscar
           [class.hidden]="!isInputShown"
           (blur)="hideInput()"
           (search)="onBuscarPadre($event)">
  `,
})
export class SearchInputComponent {
  @ViewChild('buscar') buscar: ElementRef;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  instituciones: Observable<Institucion[]>;
  private searchTerms = new Subject<string>();
  isInputShown: boolean = false;
    constructor(private institucionService: InstitucionService ) {
}


  showInput() {
    this.isInputShown = true;
    this.buscar.nativeElement.focus();
  }

  hideInput() {
    this.isInputShown = false;
  }

  onBuscar(val: string) {
    console.info('val', val);
    this.search.emit(val);
  }
  onBuscarPadre(val: string) {
    console.info(this.searchTerms);
    this.instituciones = this.searchTerms
  .debounceTime(300)        // wait 300ms after each keystroke before considering the term
  .distinctUntilChanged()   // ignore if next search term is same as previous
  .switchMap(ins => val   // switch to new observable each time the term changes
    // return the http search observable
    ? this.institucionService.search(ins)
    // or the observable of empty heroes if there was no search term
    : Observable.of<Institucion[]>([]))
  .catch(error => {
    // TODO: add real   error handling
    console.info(error);
    return Observable.of<Institucion[]>([]);
  });
      console.info(this.instituciones);
  }
}
