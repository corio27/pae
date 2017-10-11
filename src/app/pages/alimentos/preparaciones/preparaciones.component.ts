import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Preparacion } from '../../../@core/data/preparacion';
import { PreparacionService } from '../../../@core/data/preparacion.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-preparaciones',
  styleUrls: ['./preparaciones.component.scss'],
  templateUrl: './preparaciones.component.html',
})
export class PreparacionesComponent implements OnInit, OnDestroy {

  preparaciones: Preparacion[];
  contacts: any[];
  recent: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;
  selectedPreparacion: Preparacion;
  constructor(private preparacionService: PreparacionService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService, private http: HttpClient) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                  });

    }

    ngOnInit() {
        this.preparacionService.getPreparaciones().then(preparaciones => this.preparaciones = preparaciones);
        console.info(this.preparaciones);

  }
  ngOnDestroy() {
     this.themeSubscription.unsubscribe();
  }
  add(name: string): void {
      name = name.trim();
      if (!name) { return; }

      this.preparacionService.create(name)
        .then(preparacion => {
          this.preparaciones.push(preparacion);
          this.selectedPreparacion = null;
        });
    }

    delete(preparacion: Preparacion): void {
      this.preparacionService
          .delete(preparacion.Id)
          .then(() => {
            this.preparaciones = this.preparaciones.filter(h => h !== preparacion);
            if (this.selectedPreparacion === preparacion) { this.selectedPreparacion = null; }
          });
    }
    onSelect(preparacion: Preparacion): void {
      this.selectedPreparacion = preparacion;
      this.getProductosPreparacion(this.selectedPreparacion);
    }
    getProductosPreparacion(preparacion: Preparacion): void {

    }
}
