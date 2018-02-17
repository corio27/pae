import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { WaybillService } from '../../../@core/data/waybill.service';
import { Waybill } from '../../../@core/data/waybill';
@Component({
  selector: 'ngx-smart-table',
  templateUrl: './devoluciones.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class DevolucionesComponent  {

  settings = {
    actions: {
      add: false,
      delete: false,
    },
  edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
  columns: {
    Id: {
      title: 'id',
      type: 'string',
      editable: false,
    },
      Anio: {
        title: 'Año',
        type: 'number',
        editable: false,
      },
      Semana: {
        title: 'Semana',
        type: 'number',
        width: '20%',
        editable: false,
      },
      Origen: {
        title: 'Origen',
        type: 'string',
        editable: false,
      },
      Institucion: {
        title: 'Institucion',
        type: 'string',
        editable: false,
      },
      Alimento: {
        title: 'Alimento',
        type: 'string',
        editable: false,
      },
      Peso: {
        title: 'Peso (gr)',
        type: 'number',
        editable: false,
      },
      Presentacion: {
        title: 'Presen- tacion',
        type: 'string',
        editable: false,
      },
      PesoPresentacion: {
        title: 'Peso Presen- tacion',
        type: 'number',
        editable: false,
      },
      Unidades: {
        title: 'Unidades',
        type: 'number',
        width: '20%',
        editable: false,
      },
      TipoAlimento: {
        title: 'Tipo Alimento',
        type: 'string',
        editable: false,
      },
      EntregaReal: {
        title: 'Entrega Real',
        type: 'number',
      },
      Observacion: {
        title: 'Obser- vacion',
        type: 'string',
      },

    },
  };
 source: LocalDataSource;
 waybill: Waybill;
  constructor(private service: WaybillService) {
    this.source = new LocalDataSource();
    service.getWaybill().then((waybill) => {this.source.load(waybill); });
  }
  onDeleteConfirm(event): void {
    if (window.confirm('¿Seguro de querer eliminar?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event) {
    console.info(event);
   if (window.confirm('¿Seguro de salvar?')) {
      this.waybill = event.newData;
      this.service.update(this.waybill);
      console.info(this.waybill);
       event.confirm.resolve(event.newData);
   } else {
     event.confirm.reject();
   }
 }
}
