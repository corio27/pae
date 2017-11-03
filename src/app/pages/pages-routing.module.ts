import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'administracion',
    loadChildren: './administracion/administracion.module#AdministracionModule',
  },
    {
    path: 'instituciones',
    loadChildren: './instituciones/instituciones.module#InstitucionesModule',
  },
  {
    path: 'alimentos',
    loadChildren: './alimentos/alimentos.module#AlimentosModule',
  },
   {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
