import { Component, Input, OnInit } from '@angular/core';
import { Institucion } from '../../../@core/data/institucion';
import { InstitucionService } from '../../../@core/data/institucion.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Complemento } from '../../../@core/data/complemento';
import { ComplementoService } from '../../../@core/data/complemento.service';
import { Municipio } from '../../../@core/data/municipio';
import { MunicipioService } from '../../../@core/data/municipio.service';
import { Departamento } from '../../../@core/data/departamento';
import { DepartamentoService } from '../../../@core/data/departamento.service';
import { TipoInstitucionService } from '../../../@core/data/tipoInstitucion.service';
import { TipoInstitucion } from '../../../@core/data/tipoInstitucion';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit  {
  @Input() institucion: Institucion;
  selectedInstitucion: Institucion;
  municipio: Municipio;
  tipoInstitucion: TipoInstitucion;
  departamento: Departamento;
  complementos: Complemento[] = [];
  constructor(
    private route: ActivatedRoute,
    private institucionService: InstitucionService,
    private municipioService: MunicipioService,
    private departamentoService: DepartamentoService,
    private complementoService: ComplementoService,
    private tipoInstitucionService: TipoInstitucionService,
    private location: Location,
  ) {}
  ngOnInit(): void {
    this.getInstitucion();
  }
  getInstitucion(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.institucionService.getInstitucion(id)
      .then(institucion => {
        this.selectedInstitucion = institucion;
        console.info(institucion);
        this.municipioService.getMunicipio(this.selectedInstitucion.MunicipioId).then(
          municipio => {this.municipio = municipio;
          this.departamentoService.getDepartmento(this.municipio.DepartamentoId).then(
            departamento => this.departamento = departamento);
        });
        this.tipoInstitucionService.getTipoInstitucion(this.selectedInstitucion.TipoInstitucionId)
        .then(tipoInstitucion => this.tipoInstitucion = tipoInstitucion);

      });
    this.complementoService.getComplementos().then(
      complementos => this.complementos = complementos);
  }
}
