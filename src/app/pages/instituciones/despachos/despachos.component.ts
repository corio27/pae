import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Despacho } from '../../../@core/data/despacho';
import { DespachoService } from '../../../@core/data/despacho.service';
import { ModalComponent } from './modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./despachos.component.scss'],
  templateUrl: './despachos.component.html',
})

export class DespachosComponent implements OnInit, OnDestroy {
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;
  despachos: Despacho[];
  constructor( private modalService: NgbModal, private despachoService: DespachoService,
    private breakpointService: NbMediaBreakpointsService,  private themeService: NbThemeService) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                  });

    }
    ngOnInit() {
    }

  ngOnDestroy() {
     this.themeSubscription.unsubscribe();
  }
  procesar( menuInicial: number, menuFinal: number ) {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
   activeModal.componentInstance.modalHeader = 'ETL';
  }
  verReporte() {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });

   activeModal.componentInstance.modalHeader = 'REPORTE';
  }
}
