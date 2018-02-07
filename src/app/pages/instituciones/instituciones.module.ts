import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AgmCoreModule } from '@agm/core';
import { ThemeModule } from '../../@theme/theme.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { InstitucionesRoutingModule, routedComponents } from './instituciones-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ContactsComponent } from './contacts/contacts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KittenComponent } from './kitten/kitten.component';
import { CuposComponent } from './cupos/cupos.component';
import { ModalComponent } from './despachos/modal/modal.component';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';

@NgModule({
  imports: [
    ThemeModule,
    InstitucionesRoutingModule,
    Ng2SmartTableModule,
    AgmCoreModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    // BrowserAnimationsModule,
    // CalendarModule.forRoot(),
  ],

  declarations: [
    ...routedComponents,
      DashboardComponent,
      ContactsComponent,
      KittenComponent,
      CuposComponent,
      ModalComponent,
  ],
  providers: [
    SmartTableService,
  ],
  entryComponents: [
    ModalComponent,
  ],
})
export class InstitucionesModule { }
