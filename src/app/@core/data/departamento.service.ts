import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Departamento } from './departamento';


@Injectable()
export class DepartamentoService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private departamentoUrl = '/v1/departamento';
 constructor(private http: Http) { }

  getDepartamentos(): Promise<Departamento[]> {
  return this.http.get('v1/departamento/?limit=-1')
  .toPromise()
  .then(response  => response.json() as Departamento[])
  .catch(this.handleError);
}


getProducto(id: number): Promise<Departamento> {
    const url = `${this.departamentoUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Departamento)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  delete(id: number): Promise<void> {
    const url = `${this.departamentoUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(departamento: string): Promise<Departamento> {
      return this.http
      .post(this.departamentoUrl, '{"Nombre":"' + departamento + '"}', {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Departamento)
      .catch(this.handleError);
  }

  update(departamento: Departamento): Promise<Departamento> {
    const url = `${this.departamentoUrl}/${departamento.Id}`;
    return this.http
      .put(url, JSON.stringify(departamento), {headers: this.headers})
      .toPromise()
      .then(() => departamento)
      .catch(this.handleError);
  }

}
