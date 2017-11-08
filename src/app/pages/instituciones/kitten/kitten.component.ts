import { Component, OnDestroy, Input,  AfterViewInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Institucion } from '../../../@core/data/institucion';
import { DepartamentoService } from '../../../@core/data/departamento.service';
import { MunicipioService } from '../../../@core/data/municipio.service';
import { Municipio } from '../../../@core/data/municipio';
import { Departamento } from '../../../@core/data/departamento';
import { TipoInstitucion } from '../../../@core/data/tipoInstitucion';
@Component({
  selector: 'ngx-kitten',
  styleUrls: ['./kitten.component.scss'],
  templateUrl: './kitten.component.html',
})
export class KittenComponent implements  OnDestroy, AfterViewInit {

     @Input() institucion: Institucion;
     @Input() municipio: Municipio;
     @Input() departamento: Departamento;
     @Input() tipoInstitucion: TipoInstitucion;
     currentTheme: string;
     themeSubscription: any;


  constructor(private municipioService: MunicipioService,
    private departamentoService: DepartamentoService ,
    private themeService: NbThemeService) {

    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
  ngAfterViewInit() {
    console.info(this.institucion);
    // this.municipioService.getMunicipio(this.institucion.MunicipioId).then(municipio => this.municipio = municipio);

  }
}
