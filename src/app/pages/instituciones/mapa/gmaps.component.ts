import { Component, Input } from '@angular/core';
import { Institucion } from '../../../@core/data/institucion';
@Component({
  selector: 'ngx-gmaps',
  styleUrls: ['./gmaps.component.scss'],
  template: `
    <nb-card>
      <nb-card-header>Información de Ubicación</nb-card-header>
      <nb-card-body>
        <agm-map [latitude]="lat" [longitude]="lng">
          <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
        </agm-map>
      </nb-card-body>
      <nb-card-footer *ngIf="institucion">
        {{institucion.Indicaciones}}
      </nb-card-footer>
    </nb-card>
  `,
})
export class GmapsComponent {
  @Input() institucion: Institucion;
  lat: number = 11.501557;
  lng: number = -72.894287;
}
