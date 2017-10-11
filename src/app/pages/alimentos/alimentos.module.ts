import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AlimentosRoutingModule, routedComponents } from './alimentos-routing.module';
import { ProductosComponent } from './productos/productos.component';
import { PreparacionesComponent } from './preparaciones/preparaciones.component';
import { MenusComponent } from './menus/menus.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ComponentesComponent } from './componentes/componentes.component';
import { ComponenteService } from '../../@core/data/componente.service';
import { PreparacionService } from '../../@core/data/preparacion.service';
import {DndModule} from 'ng2-dnd';
@NgModule({
  imports: [
    ThemeModule,
    AlimentosRoutingModule,
    Ng2SmartTableModule,
    DndModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
      PreparacionesComponent,
      ProductosComponent,
      MenusComponent,
      ProveedoresComponent,
      ComponentesComponent,
    ],
  providers: [
      ComponenteService,
      PreparacionService,
  ],
})
export class AlimentosModule { }
