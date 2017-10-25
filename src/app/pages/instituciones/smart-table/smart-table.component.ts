import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { PersonaService } from '../../../@core/data/persona.service';
import { Persona } from '../../../@core/data/persona';
@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent  {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      Id: {
        title: 'ID',
        type: 'number',
      },
      PrimerNombre: {
        title: 'Primer Nombre',
        type: 'string',
      },
      PrimerApellido: {
        title: 'Primer Apellido',
        type: 'string',
      },
      NombreCompleto: {
        title: 'Nombre Completo',
        type: 'string',
      },
      Email: {
        title: 'E-mail',
        type: 'string',
      },
      Edad: {
        title: 'Edad',
        type: 'number',
      },
    },
  };
 source: LocalDataSource;
 persona: Persona;
  constructor(private service: PersonaService) {
    this.source = new LocalDataSource();
    service.getPersonas().then((persona) => {this.source.load(persona); });
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
      this.persona = event.newData;
      this.service.update(this.persona);
      console.info(this.persona);
       event.confirm.resolve(event.newData);
   } else {
     event.confirm.reject();
   }
 }
}
