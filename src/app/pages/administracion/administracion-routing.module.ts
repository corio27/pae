import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { PersonasComponent } from './personas/personas.component';
import { RolesComponent } from './roles/roles.component';
const routes: Routes = [{
  path: '',
  component: AdministracionComponent,
  children: [{
    path: 'personas',
    component: PersonasComponent,
  },
  {
    path: 'roles',
    component: RolesComponent,
  },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionRoutingModule { }

export const routedComponents = [
  AdministracionComponent,
  PersonasComponent,
  RolesComponent,
];
