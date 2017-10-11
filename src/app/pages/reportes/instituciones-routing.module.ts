import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstitucionesComponent } from './instituciones.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { FormCrearComponent } from './crear/form-crear.component';
const routes: Routes = [{
  path: '',
  component: InstitucionesComponent,
  children: [{
    path: 'smart-table',
    component: SmartTableComponent,
  },
  {
    path: 'crear',
    component: FormCrearComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitucionesRoutingModule { }

export const routedComponents = [
  InstitucionesComponent,
  SmartTableComponent,
  FormCrearComponent,
];
