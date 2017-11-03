import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Rol } from '../../../@core/data/rol';
import { RolService } from '../../../@core/data/rol.service';


@Component({
  selector: 'ngx-roles',
  templateUrl: './roles.component.html',
})
export class RolesComponent implements OnInit, OnDestroy {

  roles: Rol[] = [];
  selectedRol: Rol;
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;
  constructor(private rolService: RolService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                  });

    }

  ngOnInit() {
      this.rolService.getRoles().then(roles => this.roles = roles);

}
ngOnDestroy() {
   this.themeSubscription.unsubscribe();
}
add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    console.info('nombre', name);
    this.rolService.create(name)
      .then(rol => {
        this.roles.push(rol);
        this.selectedRol = null;
      });
  }

  delete(rol: Rol): void {
    this.rolService
        .delete(rol.Id)
        .then(() => {
          this.roles = this.roles.filter(h => h !== rol);
          if (this.selectedRol === rol) { this.selectedRol = null; }
        });
  }
  onSelect(rol: Rol): void {
    this.selectedRol = rol;
    console.info('nombre', rol.Nombre);
  }
}
