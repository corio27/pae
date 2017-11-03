import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlimentosComponent } from './alimentos.component';
import { ProductosComponent } from './productos/productos.component';
import { PreparacionesComponent } from './preparaciones/preparaciones.component';
import { MenusComponent } from './menus/menus.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ComponentesComponent } from './componentes/componentes.component';
import { TiposAlimentosComponent } from './tipos_alimentos/tipos_alimentos.component';
import { UnidadesMedidaComponent } from './unidades_medida/unidadesMedida.component';
import { PlaneacionComponent } from './planeacion/planeacion.component';
const routes: Routes = [{
  path: '',
  component: AlimentosComponent,
  children: [{
    path: 'productos',
    component: ProductosComponent,
  },
  {
    path: 'preparaciones',
    component: PreparacionesComponent,
  },
  {
    path: 'menus',
    component: MenusComponent,
  },
  {
    path: 'proveedores',
    component: ProveedoresComponent,
  },
  {
    path: 'componentes',
    component: ComponentesComponent,
  },
  {
    path: 'tipos_alimentos',
    component: TiposAlimentosComponent,
  },
  {
    path: 'unidades_medida',
    component: UnidadesMedidaComponent,
  },
  {
    path: 'planeacion',
    component: PlaneacionComponent,
  },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlimentosRoutingModule { }

export const routedComponents = [
  AlimentosComponent,
  ProductosComponent,
  MenusComponent,
  ProveedoresComponent,
  ComponentesComponent,
  TiposAlimentosComponent,
  UnidadesMedidaComponent,
  PlaneacionComponent,
];
