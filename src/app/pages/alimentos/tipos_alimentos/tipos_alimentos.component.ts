import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { TipoAlimento } from '../../../@core/data/tipoAlimento';
import { TipoAlimentoService } from '../../../@core/data/tipoAlimento.service';


@Component({
  selector: 'ngx-tipos-alimentos',
  templateUrl: './tipos_alimentos.component.html',
})
export class TiposAlimentosComponent implements OnInit, OnDestroy {

  tiposAlimentos: TipoAlimento[];
  selectedTipoAlimento: TipoAlimento;
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;
  constructor(private tipoAlimentoService: TipoAlimentoService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                  });

    }

  ngOnInit() {
      this.tipoAlimentoService.getTiposAlimentos().then(tiposAlimentos => this.tiposAlimentos = tiposAlimentos);

}
ngOnDestroy() {
   this.themeSubscription.unsubscribe();
}
add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    console.info('nombre', name);
    this.tipoAlimentoService.create(name)
      .then(tipoAlimento => {
        this.tiposAlimentos.push(tipoAlimento);
        this.selectedTipoAlimento = null;
      });
  }

  delete(tipoAlimento: TipoAlimento): void {
    this.tipoAlimentoService
        .delete(tipoAlimento.Id)
        .then(() => {
          this.tiposAlimentos = this.tiposAlimentos.filter(h => h !== tipoAlimento);
          if (this.selectedTipoAlimento === tipoAlimento) { this.selectedTipoAlimento = null; }
        });
  }
  onSelect(tipoAlimento: TipoAlimento): void {
    this.selectedTipoAlimento = tipoAlimento;
    console.info('nombre', tipoAlimento.Nombre);
  }
}
