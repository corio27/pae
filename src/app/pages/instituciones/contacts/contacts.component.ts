import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Persona } from '../../../@core/data/persona';
import { Institucion } from '../../../@core/data/institucion';
import { PersonaService } from '../../../@core/data/persona.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../@core/data/users.service';
@Component({
  selector: 'ngx-contactos',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit, OnDestroy {

  personas: Persona[];
  contacts: any[];
  recent: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;

  private _institucion: Institucion;

   @Input()
   set institucion(institucion: Institucion) {
     this._institucion = institucion;
   }

   get institucion(): Institucion { return this._institucion; }

  constructor(private personaService: PersonaService,
              private userService: UserService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService, private http: HttpClient) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                  });

    }

    ngOnInit() {
       // this.personaService.getPersonas().then(personas => this.personas = personas);
    //    this.http.get('v1/persona').subscribe(data => {
    //      this.personas = data as Persona[];
    //      console.info('*r4eb', this.personas);
    //   })
    console.info('Institucionthis', this.institucion);
      this.userService.getUsers()
      .subscribe((users: any) => {
        this.contacts = [
          {user: users.nick, type: 'mobile'},
          {user: users.eva, type: 'home'},
          {user: users.jack, type: 'mobile'},
          {user: users.lee, type: 'mobile'},
          {user: users.alan, type: 'home'},
          {user: users.kate, type: 'work'},
        ];

        this.recent = [
          {user: users.alan, type: 'home', time: '9:12 pm'},
          {user: users.eva, type: 'home', time: '7:45 pm'},
          {user: users.nick, type: 'mobile', time: '5:29 pm'},
          {user: users.lee, type: 'mobile', time: '11:24 am'},
          {user: users.jack, type: 'mobile', time: '10:45 am'},
          {user: users.kate, type: 'work', time: '9:42 am'},
          {user: users.kate, type: 'work', time: '9:31 am'},
          {user: users.jack, type: 'mobile', time: '8:01 am'},
        ];
      });

   }

  ngOnDestroy() {
     this.themeSubscription.unsubscribe();
  }
}
