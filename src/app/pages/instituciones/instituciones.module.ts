import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { InstitucionesRoutingModule, routedComponents } from './instituciones-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ContactsComponent } from './contacts/contacts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularEchartsModule } from 'ngx-echarts';
import { KittenComponent } from './kitten/kitten.component';
@NgModule({
  imports: [
    ThemeModule,
    InstitucionesRoutingModule,
    Ng2SmartTableModule,
    AngularEchartsModule,
  ],
  declarations: [
    ...routedComponents,
      DashboardComponent,
      ContactsComponent,
      KittenComponent,
  ],
  providers: [
    SmartTableService,
  ],
})
export class InstitucionesModule { }
