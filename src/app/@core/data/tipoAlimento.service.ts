import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { TipoAlimento } from './tipoAlimento';


@Injectable()
export class TipoAlimentoService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private tipoAlimentoUrl = '/v1/tipo_alimento';
 constructor(private http: Http) { }

  getTiposAlimentos(): Promise<TipoAlimento[]> {
  return this.http.get('v1/tipo_alimento')
  .toPromise()
  .then(response  => response.json() as TipoAlimento[])
  .catch(this.handleError);
}


getTipoAlimento(id: number): Promise<TipoAlimento> {
    const url = `${this.tipoAlimentoUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as TipoAlimento)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  delete(id: number): Promise<void> {
    const url = `${this.tipoAlimentoUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(tipoAlimento: string): Promise<TipoAlimento> {
      return this.http
      .post(this.tipoAlimentoUrl, '{"Nombre":"' + tipoAlimento + '"}', {headers: this.headers})
      .toPromise()
      .then(res => res.json() as TipoAlimento)
      .catch(this.handleError);
  }

  update(tipoAlimento: TipoAlimento): Promise<TipoAlimento> {
    const url = `${this.tipoAlimentoUrl}/${tipoAlimento.Id}`;
    return this.http
      .put(url, JSON.stringify(tipoAlimento), {headers: this.headers})
      .toPromise()
      .then(() => tipoAlimento)
      .catch(this.handleError);
  }

}
