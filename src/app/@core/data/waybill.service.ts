import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Waybill } from './waybill';


@Injectable()
export class WaybillService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private waybillUrl = 'v1/waybill';
 constructor(private http: Http) { }

getWaybill(): Promise<Waybill[]> {
  return this.http.get('v1/waybill/?limit=-1')
  .toPromise()
  .then(response  => response.json() as Waybill[])
  .catch(this.handleError);
}
update(waybill: Waybill): Promise<Waybill> {
    const url = `${this.waybillUrl}/${waybill.Id}`;
    console.info(JSON.stringify(waybill));
    return this.http
      .put(url, JSON.stringify(waybill), {headers: this.headers})
      .toPromise()
      .then(() => waybill)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
