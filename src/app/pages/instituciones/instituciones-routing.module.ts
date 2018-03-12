import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitucionesComponent } from './instituciones.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { FormularioComponent } from './formulario/formulario.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { EtcsComponent} from './etcs/etcs.component';
import { ResultadosComponent} from './resultados/resultados.component';
import { GmapsComponent} from './mapa/gmaps.component';
import { DespachosComponent} from './despachos/despachos.component';
import { EditarComponent} from './editar/editar.component';
import { DevolucionesComponent} from './devoluciones/devoluciones.component';
import { BwayComponent} from './bway/bway.component';
const routes: Routes = [{
  path: '',
  component: InstitucionesComponent,
  children: [{
    path: 'smart-table',
    component: SmartTableComponent,
  },
  {
    path: 'crear',
    component: FormularioComponent,
  },
  {
    path: 'etcs',
    component: EtcsComponent,
  },
  {
    path: 'editar/:id',
    component: EditarComponent,
  },
  {
    path: 'dashboard/:id',
    component: DashboardComponent,
  },
  {
    path: 'resultados',
    component: ResultadosComponent,
  },
  {
    path: 'bway',
    component: BwayComponent,
  },
  {
    path: 'devoluciones/:id',
    component: DevolucionesComponent,
  },
  {
    path: 'mapa',
    component: GmapsComponent,
  },
  {
    path: 'despachos',
    component: DespachosComponent,
  },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitucionesRoutingModule { }

export const routedComponents = [
  InstitucionesComponent,
  SmartTableComponent,
  FormularioComponent,
  DashboardComponent,
  EtcsComponent,
  ResultadosComponent,
  GmapsComponent,
  DespachosComponent,
  EditarComponent,
  DevolucionesComponent,
  BwayComponent,
];
