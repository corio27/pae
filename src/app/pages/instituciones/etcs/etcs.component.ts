import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Etc } from '../../../@core/data/etc';
import { EtcService } from '../../../@core/data/etc.service';


@Component({
  selector: 'ngx-tipos-alimentos',
  templateUrl: './etcs.component.html',
})
export class EtcsComponent implements OnInit, OnDestroy {

  etcs: Etc[];
  selectedEtc: Etc;
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;
  constructor(private etcService: EtcService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                  });

    }

  ngOnInit() {
      this.etcService.getEtcs().then(etcs => this.etcs = etcs);

}
ngOnDestroy() {
   this.themeSubscription.unsubscribe();
}
add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    console.info('nombre', name);
    this.etcService.create(name)
      .then(etc => {
        this.etcs.push(etc);
        this.selectedEtc = null;
      });
  }

  delete(etc: Etc): void {
    this.etcService
        .delete(etc.Id)
        .then(() => {
          this.etcs = this.etcs.filter(h => h !== etc);
          if (this.selectedEtc === etc) { this.selectedEtc = null; }
        });
  }
  onSelect(etc: Etc): void {
    this.selectedEtc = etc;
    console.info('nombre', etc.Nombre);
  }
}
