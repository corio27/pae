import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Despacho } from '../../../@core/data/despacho';
import { DespachoService } from '../../../@core/data/despacho.service';
import { ModalComponent } from './modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import { Departamento } from '../../../@core/data/departamento';
import { DepartamentoService } from '../../../@core/data/departamento.service';
import { Municipio } from '../../../@core/data/municipio';
import { Institucion } from '../../../@core/data/institucion';
import { MunicipioService } from '../../../@core/data/municipio.service';
import { TipoMinuta } from '../../../@core/data/tipoMinuta';
import { InstitucionService } from '../../../@core/data/institucion.service';
import { TipoMinutaService } from '../../../@core/data/tipoMinuta.service';


declare var Sbi: any;
@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./despachos.component.scss'],
  templateUrl: './despachos.component.html',
})

export class DespachosComponent implements OnInit, OnDestroy {
  sanitizer: DomSanitizer;
  url: string;
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;
  despachos: Despacho[];
  selectedDepartamento: Departamento;
  municipios: Municipio[];
  municipiosFiltrados: Municipio[];
  departamentos: Departamento[];
  selectedMunicipio: Municipio;
  tipoMinuta: TipoMinuta;
  tiposMinutas: TipoMinuta[];
  selectedTipoMinuta: TipoMinuta;
  instituciones: Institucion[];
  selectedInstitucion: Institucion;
  institucionesFiltradas: Institucion[];
  constructor(
    private institucionService: InstitucionService,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private tipoMinutaService: TipoMinutaService,
    private modalService: NgbModal,
    private despachoService: DespachoService,
    sanitizer: DomSanitizer,
    private breakpointService: NbMediaBreakpointsService,
    private themeService: NbThemeService) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                    });
                    this.sanitizer = sanitizer;
    }
    ngOnInit() {
      this.municipioService.getMunicipios().then(municipios => this.municipios = municipios);
      this.departamentoService.getDepartamentos().then(departamentos => this.departamentos = departamentos);
      this.tipoMinutaService.getTiposMinutas().then(tiposMinutas => this.tiposMinutas = tiposMinutas);
      this.institucionService.getInstituciones().then(instituciones => this.instituciones = instituciones);
    }

  ngOnDestroy() {
     this.themeSubscription.unsubscribe();
  }
  procesar() {
    Sbi.sdk.services.setBaseUrl({
     protocol: 'http',
     host: '192.168.0.183',
     port: '8080',
     contextPath: 'SpagoBI',
     controllerPath: 'servlet/AdapterHTTP',
    });
    const cb = function(result, args, success) {
    if ( success === true ) {
       this.execTest1('pae_planeacion');
     } else {
       alert('ERROR: Wrong username or password');
     }
    };
     Sbi.sdk.api.authenticate({params: {user: 'biconsulta', password: 'biconsulta'}, callback: {
          fn: cb, scope: this,
        // , args: {arg1: 'A', arg2: 'B', ...}
      },
    });
  }
  waybill() {
    Sbi.sdk.services.setBaseUrl({
     protocol: 'http',
     host: '192.168.0.183',
     port: '8080',
     contextPath: 'SpagoBI',
     controllerPath: 'servlet/AdapterHTTP',
    });
    const cb = function(result, args, success) {
    if ( success === true ) {
       this.execTest1('pae_waybill');
     } else {
       alert('ERROR: Wrong username or password');
     }
    };
     Sbi.sdk.api.authenticate({params: {user: 'biconsulta', password: 'biconsulta'}, callback: {
          fn: cb, scope: this,
        // , args: {arg1: 'A', arg2: 'B', ...}
      },
    });

      }
      ajustes() {
        Sbi.sdk.services.setBaseUrl({
         protocol: 'http',
         host: '192.168.0.183',
         port: '8080',
         contextPath: 'SpagoBI',
         controllerPath: 'servlet/AdapterHTTP',
        });
        const cb = function(result, args, success) {
        if ( success === true ) {
           this.execTest1('pae_waybill');
         } else {
           alert('ERROR: Wrong username or password');
         }
        };
         Sbi.sdk.api.authenticate({params: {user: 'biconsulta', password: 'biconsulta'}, callback: {
              fn: cb, scope: this,
            // , args: {arg1: 'A', arg2: 'B', ...}
          },
        });

          }
          asistencias() {
            Sbi.sdk.services.setBaseUrl({
             protocol: 'http',
             host: '192.168.0.183',
             port: '8080',
             contextPath: 'SpagoBI',
             controllerPath: 'servlet/AdapterHTTP',
            });
            const cb = function(result, args, success) {
            if ( success === true ) {
               this.execTest1('pae_asistencias');
             } else {
               alert('ERROR: Wrong username or password');
             }
            };
             Sbi.sdk.api.authenticate({params: {user: 'biconsulta', password: 'biconsulta'}, callback: {
                  fn: cb, scope: this,
                // , args: {arg1: 'A', arg2: 'B', ...}
              },
            });

              }

  execTest1(reporte: string) {
        this.url = Sbi.sdk.api.getDocumentUrl({
         documentLabel: reporte
         , executionRole: '/spagobi/biconsulta'
         , displayToolbar: true
         , displaySliders: true
         , iframe: {
           style: 'border: 0px;',
         },
       });
      this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });

     activeModal.componentInstance.modalHeader = 'REPORTE';
     activeModal.componentInstance.url = this.url;
     }

}
