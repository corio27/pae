import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { UnidadMedida } from '../../../@core/data/unidadMedida';
import { UnidadMedidaService } from '../../../@core/data/unidadMedida.service';


@Component({
  selector: 'ngx-unidades-medida',
  templateUrl: './unidadesMedida.component.html',
})
export class UnidadesMedidaComponent implements OnInit, OnDestroy {

  unidadMedidas: UnidadMedida[];
  selectedUnidadMedida: UnidadMedida;
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;
  constructor(private unidadMedidaService: UnidadMedidaService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                  });

    }

  ngOnInit() {
      this.unidadMedidaService.getUnidadesMedida().then(unidadMedidas => this.unidadMedidas = unidadMedidas);

}
ngOnDestroy() {
   this.themeSubscription.unsubscribe();
}
add( name: string, peso: string ): void {
    name = name.trim();
    if (!name) { return; }
    console.info('nombre', name);
    this.unidadMedidaService.create(name)
      .then(unidadMedida => {
        this.unidadMedidas.push(unidadMedida);
        this.selectedUnidadMedida = null;
      });
  }

  delete(unidadMedida: UnidadMedida): void {
    this.unidadMedidaService
        .delete(unidadMedida.Id)
        .then(() => {
          this.unidadMedidas = this.unidadMedidas.filter(h => h !== unidadMedida);
          if (this.selectedUnidadMedida === unidadMedida) { this.selectedUnidadMedida = null; }
        });
  }
  onSelect(unidadMedida: UnidadMedida): void {
    this.selectedUnidadMedida = unidadMedida;
    console.info('nombre', unidadMedida.Nombre);
  }
}
