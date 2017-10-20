import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Etc } from './etc';


@Injectable()
export class EtcService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private etcUrl = 'v1/etc';
 constructor(private http: Http) { }

  getEtcs(): Promise<Etc[]> {
  return this.http.get('v1/etc')
  .toPromise()
  .then(response  => response.json() as Etc[])
  .catch(this.handleError);
}


getEtc(id: number): Promise<Etc> {
    const url = `${this.etcUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Etc)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  delete(id: number): Promise<void> {
    const url = `${this.etcUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(etc: string): Promise<Etc> {
      return this.http
      .post(this.etcUrl, '{"Nombre":"' + etc + '"}', {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Etc)
      .catch(this.handleError);
  }

  update(etc: Etc): Promise<Etc> {
    const url = `${this.etcUrl}/${etc.Id}`;
    return this.http
      .put(url, JSON.stringify(etc), {headers: this.headers})
      .toPromise()
      .then(() => etc)
      .catch(this.handleError);
  }

}
