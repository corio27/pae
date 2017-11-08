import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Complemento } from './complemento';


@Injectable()
export class ComplementoService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private complementoUrl = 'v1/complemento';
  constructor(private http: Http) { };

  getComplementos(): Promise<Complemento[]> {
  return this.http.get('v1/complemento')
  .toPromise()
  .then(response  => response.json() as Complemento[])
  .catch(this.handleError);
}


getComplemento(id: number): Promise<Complemento> {
    const url = `${this.complementoUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Complemento)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.complementoUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Complemento> {
    console.info('nombre', name);
    return this.http
      .post(this.complementoUrl, JSON.stringify({Nombre: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Complemento)
      .catch(this.handleError);
  }

  update(complemento: Complemento): Promise<Complemento> {
    const url = `${this.complementoUrl}/${complemento.Id}`;
    return this.http
      .put(url, JSON.stringify(complemento), {headers: this.headers})
      .toPromise()
      .then(() => complemento)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  }
