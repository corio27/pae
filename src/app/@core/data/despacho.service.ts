import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Despacho } from './despacho';


@Injectable()
export class DespachoService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private despachoUrl = 'v1/planeacion';
  objeto: string;
 constructor(private http: Http) { }

  getDespachos(menuIncial: number, menuFinal: number): Promise<Despacho[]> {
  return this.http.get('v1/planeacion/?limit=-1')
  .toPromise()
  .then(response  => response.json() as Despacho[])
  .catch(this.handleError);
}
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
