import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
// import { Planeacion } from '../../../@core/data/planeacion';
// import { PlaneacionService } from '../../../@core/data/planeacion.service';
 import { Preparacion } from '../../../@core/data/preparacion';
 import { PreparacionService } from '../../../@core/data/preparacion.service';

@Component({
  selector: 'ngx-planeacion',
  templateUrl: './planeacion.component.html',
})
export class PlaneacionComponent implements OnInit, OnDestroy {
  preparaciones: Preparacion[];
  preparacionesMenu: Preparacion[]  = [];

  // planeaciones: Planeacion[];
  // selectedPlaneacion: Planeacion;
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;
  // private planeacionService: PlaneacionService,
  constructor(private preparacionService: PreparacionService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                  });

    }

  ngOnInit() {
    this.preparacionService.getPreparaciones()
    .then(preparaciones => this.preparaciones = preparaciones);
  }
ngOnDestroy() {
   this.themeSubscription.unsubscribe();
}
addToMenu($event: any) {
        const nuevaPreparacion: Preparacion = $event.dragData;
        console.info(nuevaPreparacion);
        this.preparacionesMenu.push(nuevaPreparacion);
        console.info(this.preparacionesMenu);
}
// add(name: string): void {
//    name = name.trim();
//    if (!name) { return; }
//    console.info('nombre', name);
    // this.planeacionService.create(name)
    //  .then(planeacion => {
    //    this.planeaciones.push(planeacion);
    //    this.selectedPlaneacion = null;
    //  });
//  }

//  delete(planeacion: Planeacion): void {
//    this.planeacionService
//        .delete(planeacion.Id)
//        .then(() => {
//          this.planeaciones = this.planeaciones.filter(h => h !== planeacion);
//          if (this.selectedPlaneacion === planeacion) { this.selectedPlaneacion = null; }
//        });
//  }
//  onSelect(planeacion: Planeacion): void {
//    this.selectedPlaneacion = planeacion;
//    console.info('nombre', planeacion.Nombre);
//  }
}
