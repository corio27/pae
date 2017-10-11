import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
export class Hero {
  id: number;
  name: string;
}
const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' },
];
@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-crear.component.scss'],
  templateUrl: './form-crear.component.html',
})

export class FormCrearComponent implements OnInit, OnDestroy {
  heroes = HEROES;
  selectedHero: number;
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;
  constructor(private breakpointService: NbMediaBreakpointsService,  private themeService: NbThemeService) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                  });

    }
    ngOnInit() {}
  onSelect() {
    this.selectedHero = this.selectedHero;
  }
  ngOnDestroy() {
     this.themeSubscription.unsubscribe();
  }
}
