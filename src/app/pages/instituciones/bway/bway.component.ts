import { Component, OnInit } from '@angular/core';
import { NbSearchService } from '@nebular/theme'
import { Plan } from '../../../@core/data/plan';
import { PlanService } from '../../../@core/data/plan.service';

@Component({
  selector: 'ngx-bway',
  templateUrl: './bway.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class BwayComponent implements OnInit {

planes: Plan[] = [];
plan: Plan;
tamano: number;
term: string = '';
filteredPlanes: Plan[] = [];
  constructor(private searchService: NbSearchService, private planService: PlanService) {
  }


  ngOnInit() {
    this.planService.getPlanes().then(planes => this.planes = planes);
    this.assignCopy();
  }
   assignCopy() {
   this.filteredPlanes = Object.assign([], this.planes);
}
filterItem(value) {
   console.info(value.toLowerCase());
   if ( !value ) { this.assignCopy(); }
   this.filteredPlanes = Object.assign([], this.planes).filter(
      plan => plan.Uid.toLowerCase().indexOf(value.toLowerCase()) > -1 ,
   )
   console.info( this.filteredPlanes );
}

tamanoString(value) {
  return value.length - 1;
}
   enBuscar(event) {
      if ( event.data == null ) {
        this.tamano = this.tamanoString( this.term ) ;
         this.term = this.term.substring(0, this.tamano);
         console.info( this.term );
      } else {
          this.term += event.data;
      }


      this.filterItem(this.term);
    }
}
