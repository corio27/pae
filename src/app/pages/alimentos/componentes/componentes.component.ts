import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Componente } from '../../../@core/data/componente';
import { ComponenteService } from '../../../@core/data/componente.service';


@Component({
  selector: 'ngx-componentes',
  templateUrl: './componentes.component.html',
})
export class ComponentesComponent implements OnInit, OnDestroy {

  componentes: Componente[];
  selectedComponente: Componente;
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;
  constructor(private componenteService: ComponenteService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                  });

    }

  ngOnInit() {
      this.componenteService.getComponentes().then(componentes => this.componentes = componentes);

}
ngOnDestroy() {
   this.themeSubscription.unsubscribe();
}
add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    console.info('nombre', name);
    this.componenteService.create(name)
      .then(componente => {
        this.componentes.push(componente);
        this.selectedComponente = null;
      });
  }

  delete(componente: Componente): void {
    this.componenteService
        .delete(componente.Id)
        .then(() => {
          this.componentes = this.componentes.filter(h => h !== componente);
          if (this.selectedComponente === componente) { this.selectedComponente = null; }
        });
  }
  onSelect(componente: Componente): void {
    this.selectedComponente = componente;
    console.info('nombre', componente.Nombre);
  }
}
