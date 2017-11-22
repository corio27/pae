import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Despacho } from '../../../@core/data/despacho';
import { DespachoService } from '../../../@core/data/despacho.service';
import { ModalComponent } from './modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
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
  constructor( private modalService: NgbModal, private despachoService: DespachoService, sanitizer: DomSanitizer,
    private breakpointService: NbMediaBreakpointsService,  private themeService: NbThemeService) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                    });
                    this.sanitizer = sanitizer;
    }
    ngOnInit() {
    }

  ngOnDestroy() {
     this.themeSubscription.unsubscribe();
  }
  procesar( menuInicial: number, menuFinal: number ) {
    Sbi.sdk.services.setBaseUrl({
     protocol: 'http',
     host: '10.48.78.17',
     port: '8080',
     contextPath: 'SpagoBI',
     controllerPath: 'servlet/AdapterHTTP',
    });
    const cb = function(result, args, success) {
    if ( success === true ) {
       this.execTest1();
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
  verReporte() {


      }
  execTest1() {
        this.url = Sbi.sdk.api.getDocumentUrl({
         documentLabel: 'pae_waybill'
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
