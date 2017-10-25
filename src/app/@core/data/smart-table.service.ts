import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Persona } from './persona';
@Injectable()
export class SmartTableService {
constructor(private http: Http) { }
  getData() {
    return this.http.get('v1/proveedor')
    .toPromise()
    .then(response  => response.json() as Persona[])
    .catch(this.handleError);
  }
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
