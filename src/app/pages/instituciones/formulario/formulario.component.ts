import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Departamento } from '../../../@core/data/departamento';
import { DepartamentoService } from '../../../@core/data/departamento.service';
import { Municipio } from '../../../@core/data/municipio';
import { MunicipioService } from '../../../@core/data/municipio.service';
import { Etc } from '../../../@core/data/etc';
import { TipoMinuta } from '../../../@core/data/tipoMinuta';
import { TipoModalidad } from '../../../@core/data/tipoModalidad';
import { TipoInstitucion } from '../../../@core/data/tipoInstitucion';
import { EtcService } from '../../../@core/data/etc.service';
import { InstitucionService } from '../../../@core/data/institucion.service';
import { TipoMinutaService } from '../../../@core/data/tipoMinuta.service';
import { TipoInstitucionService } from '../../../@core/data/tipoInstitucion.service';
import { TipoModalidadService } from '../../../@core/data/tipoModalidad.service';


@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./formulario.component.scss'],
  templateUrl: './formulario.component.html',
})

export class FormularioComponent implements OnInit, OnDestroy {
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;
  selectedDepartamento: Departamento;
  municipios: Municipio[];
  municipiosFiltrados: Municipio[];
  departamentos: Departamento[];
  selectedPrincipal: number;
  selectedMunicipio: Municipio;
  tipoMinuta: TipoMinuta;
  tipoModalidad: TipoModalidad;
  tiposModalidades: TipoModalidad[];
  tiposMinutas: TipoMinuta[];
  selectedTipoModalidad: TipoModalidad;
  selectedTipoMinuta: TipoMinuta;
  selectedTipoInstitucion: TipoInstitucion;
  tipoInstitucion: TipoInstitucion;
  tiposInstituciones: TipoInstitucion[];
  selectedEtc: Etc;
  etcs: Etc[];

  constructor( private institucionService: InstitucionService,
    private etcService: EtcService,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private tipoMinutaService: TipoMinutaService,
    private tipoModalidadService: TipoModalidadService,
    private tipoInstitucionService: TipoInstitucionService,
    private breakpointService: NbMediaBreakpointsService,  private themeService: NbThemeService) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                  });

    }
    ngOnInit() {
       this.municipioService.getMunicipios().then(municipios => this.municipios = municipios);
       this.departamentoService.getDepartamentos().then(departamentos => this.departamentos = departamentos);
       this.etcService.getEtcs().then(etcs => this.etcs = etcs);
       this.tipoMinutaService.getTiposMinutas().then(tiposMinutas => this.tiposMinutas = tiposMinutas);
       this.tipoInstitucionService.getTiposIntituciones().
       then(tiposInstituciones => this.tiposInstituciones = tiposInstituciones);
       console.info(this.tiposInstituciones);
       this.tipoModalidadService.getTiposModalidades().
       then(tiposModalidades => this.tiposModalidades = tiposModalidades);
    }

  ngOnDestroy() {
     this.themeSubscription.unsubscribe();
  }
  departamentoChanged() {
    const municipioSeleccionado = this.selectedDepartamento.Id;
    console.info(municipioSeleccionado);
    console.info(this.selectedPrincipal);
    this.municipiosFiltrados = this.municipios.filter(m => m.DepartamentoId === municipioSeleccionado);
    console.info(this.municipiosFiltrados);
  }
  add(nombre: string, descripcion: string,
    codigoDane: number, codigoDanePrincipal: number, cantidadManipuladoras: number, longitud: number, latitud: number, indicaciones: string) {
    console.info(this.selectedMunicipio.Id);
    this.institucionService.create(
    nombre, descripcion, codigoDane, codigoDanePrincipal, this.selectedEtc.Id,
    this.selectedMunicipio.Id, cantidadManipuladoras,
    this.selectedPrincipal, this.selectedTipoInstitucion.Id, this.selectedTipoMinuta.Id, this.selectedTipoModalidad.Id,
    longitud, latitud, indicaciones)
    .then(institucion => {
      console.info(institucion);
      this.selectedEtc = null;
      this.selectedMunicipio = null;
    });

  }
}
