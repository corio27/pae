import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Municipio } from './municipio';


@Injectable()
export class MunicipioService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private municipioUrl = 'v1/municipio';
 constructor(private http: Http) { }

  getMunicipios(): Promise<Municipio[]> {
  return this.http.get('v1/municipio/?limit=-1')
  .toPromise()
  .then(response  => response.json() as Municipio[])
  .catch(this.handleError);
}


getProducto(id: number): Promise<Municipio> {
    const url = `${this.municipioUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Municipio)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  delete(id: number): Promise<void> {
    const url = `${this.municipioUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(municipio: string): Promise<Municipio> {
      return this.http
      .post(this.municipioUrl, '{"Nombre":"' + municipio + '"}', {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Municipio)
      .catch(this.handleError);
  }

  update(municipio: Municipio): Promise<Municipio> {
    const url = `${this.municipioUrl}/${municipio.Id}`;
    return this.http
      .put(url, JSON.stringify(municipio), {headers: this.headers})
      .toPromise()
      .then(() => municipio)
      .catch(this.handleError);
  }

}
