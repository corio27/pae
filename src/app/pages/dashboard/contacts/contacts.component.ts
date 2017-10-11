import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Institucion } from '../../../@core/data/institucion';
import { Persona } from '../../../@core/data/persona';
import { PersonaService } from '../../../@core/data/persona.service';
import { InstitucionService } from '../../../@core/data/institucion.service';

@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit, OnDestroy {

  personas: Persona[];
  instituciones: Institucion[];
  recent: any;
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;

  constructor(private institucionService: InstitucionService,
              private personaService: PersonaService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                  });

    }

    ngOnInit() {
      // TODO refactizar para utilizar el servicio
     //  this.personaService.getPersonas().then(personas => this.personas = personas);
      this.institucionService.getInstituciones().then(instituciones => this.instituciones = instituciones);
      //  this.http.get('v1/persona').subscribe(data => {
      //    this.personas = data as Persona[];
      //    console.info('*r4eb', this.personas);
    //   })

   }

  ngOnDestroy() {
     this.themeSubscription.unsubscribe();
  }
}
