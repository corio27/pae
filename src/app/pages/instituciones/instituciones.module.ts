import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AgmCoreModule } from '@agm/core';
import { ThemeModule } from '../../@theme/theme.module';
import { InstitucionesRoutingModule, routedComponents } from './instituciones-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ContactsComponent } from './contacts/contacts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularEchartsModule } from 'ngx-echarts';
import { KittenComponent } from './kitten/kitten.component';
import { CuposComponent } from './cupos/cupos.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { EchartsLineComponent } from './echarts/echarts-line.component';
import { EchartsPieComponent } from './echarts/echarts-pie.component';
import { EchartsBarComponent } from './echarts/echarts-bar.component';
import { EchartsMultipleXaxisComponent } from './echarts/echarts-multiple-xaxis.component';
import { EchartsAreaStackComponent } from './echarts/echarts-area-stack.component';
import { EchartsBarAnimationComponent } from './echarts/echarts-bar-animation.component';
import { EchartsRadarComponent } from './echarts/echarts-radar.component';

@NgModule({
  imports: [
    ThemeModule,
    InstitucionesRoutingModule,
    Ng2SmartTableModule,
    AngularEchartsModule,
    AgmCoreModule.forRoot(),
    NgxChartsModule,
    ChartModule,
  ],

  declarations: [
    ...routedComponents,
      DashboardComponent,
      ContactsComponent,
      KittenComponent,
      CuposComponent,
      EchartsLineComponent,
      EchartsPieComponent,
      EchartsBarComponent,
      EchartsMultipleXaxisComponent,
      EchartsAreaStackComponent,
      EchartsBarAnimationComponent,
      EchartsRadarComponent,

  ],
  providers: [
    SmartTableService,
  ],
})
export class InstitucionesModule { }
