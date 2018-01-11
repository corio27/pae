import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Plan } from './plan';



@Injectable()
export class PlanService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private planesUrl = 'v1/plan';
  private objeto: string;
   constructor(private http: Http) { }
getPlanes(): Promise<Plan[]> {
  return this.http.get('v1/plan/?limit=-1')
             .toPromise()
             .then(response => response.json() as Plan[])
             .catch(this.handleError);
}

getPlan(id: number): Promise<Plan> {
    const url = `${this.planesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Plan)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  search(term: string): Observable<Plan[]> {
    return this.http
               .get(`api/plan/?uid:${term}`)
               .map(response => response.json() as Plan[]);
  }
}
