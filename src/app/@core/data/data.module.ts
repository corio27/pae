import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './users.service';
import { ElectricityService } from './electricity.service';
import { StateService } from './state.service';
import { SmartTableService } from './smart-table.service';
import { PlayerService } from './player.service';
import { InstitucionService } from './institucion.service';
import { PersonaService } from './persona.service';
import { ProductoService } from './producto.service';
import { ComponenteService } from './componente.service';
import { ComponentesMenuService } from './componentesMenu.service';
import { PlanService } from './plan.service';
import { PreparacionService } from './preparacion.service';
import { TipoAlimentoService } from './tipoAlimento.service';
import { DepartamentoService } from './departamento.service';
import { MunicipioService } from './municipio.service';
import { EtcService } from './etc.service';
import { TipoInstitucionService } from './tipoInstitucion.service';
import { TipoMinutaService } from './tipoMinuta.service';
import { TipoModalidadService } from './tipoModalidad.service';
import { ProveedorService } from './proveedor.service';
import { MenuService } from './menu.service';
import { UnidadMedidaService } from './unidadMedida.service';
import { RolService } from './rol.service';
import { ComplementoService } from './complemento.service';
import { DespachoService } from './despacho.service';
import { WaybillService } from './waybill.service';
import { ElementoService } from './elemento.service';


const SERVICES = [
  UserService,
  ElectricityService,
  StateService,
  SmartTableService,
  PlayerService,
  InstitucionService,
  PersonaService,
  ProductoService,
  ComponenteService,
  PreparacionService,
  TipoAlimentoService,
  DepartamentoService,
  MunicipioService,
  EtcService,
  TipoMinutaService,
  TipoModalidadService,
  TipoInstitucionService,
  ProveedorService,
  MenuService,
  UnidadMedidaService,
  RolService,
  ComplementoService,
  DespachoService,
  WaybillService,
  PlanService,
  ComponentesMenuService,
    ElementoService,
  ];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
