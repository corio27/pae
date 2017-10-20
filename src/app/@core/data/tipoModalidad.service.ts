import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { TipoModalidad } from './tipoModalidad';


@Injectable()
export class TipoModalidadService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private tipoModalidadUrl = 'v1/tipo_modalidad';
 constructor(private http: Http) { }

  getTiposModalidades(): Promise<TipoModalidad[]> {
  return this.http.get('v1/tipo_modalidad')
  .toPromise()
  .then(response  => response.json() as TipoModalidad[])
  .catch(this.handleError);
}


getTipoModalidad(id: number): Promise<TipoModalidad> {
    const url = `${this.tipoModalidadUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as TipoModalidad)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  delete(id: number): Promise<void> {
    const url = `${this.tipoModalidadUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(tipoModalidad: string): Promise<TipoModalidad> {
      return this.http
      .post(this.tipoModalidadUrl, '{"Nombre":"' + tipoModalidad + '"}', {headers: this.headers})
      .toPromise()
      .then(res => res.json() as TipoModalidad)
      .catch(this.handleError);
  }

  update(tipoModalidad: TipoModalidad): Promise<TipoModalidad> {
    const url = `${this.tipoModalidadUrl}/${tipoModalidad.Id}`;
    return this.http
      .put(url, JSON.stringify(tipoModalidad), {headers: this.headers})
      .toPromise()
      .then(() => tipoModalidad)
      .catch(this.handleError);
  }

}
