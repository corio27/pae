import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { AdministracionRoutingModule, routedComponents } from './administracion-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { AngularEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    ThemeModule,
    AdministracionRoutingModule,
    Ng2SmartTableModule,
    AngularEchartsModule,
  ],
  declarations: [
    ...routedComponents,

  ],
  providers: [
    SmartTableService,
  ],
})
export class AdministracionModule { }
