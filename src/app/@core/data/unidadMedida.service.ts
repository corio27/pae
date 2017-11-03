import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { UnidadMedida } from './unidadMedida';


@Injectable()
export class UnidadMedidaService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private unidadMedidaUrl = 'v1/unidad_medida';
 constructor(private http: Http) { }

  getUnidadesMedida(): Promise<UnidadMedida[]> {
  return this.http.get('v1/unidad_medida')
  .toPromise()
  .then(response  => response.json() as UnidadMedida[])
  .catch(this.handleError);
}


getUnidadMedida(id: number): Promise<UnidadMedida> {
    const url = `${this.unidadMedidaUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as UnidadMedida)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  delete(id: number): Promise<void> {
    const url = `${this.unidadMedidaUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(unidadMedida: string): Promise<UnidadMedida> {
      return this.http
      .post(this.unidadMedidaUrl, '{"Nombre":"' + unidadMedida + '"}', {headers: this.headers})
      .toPromise()
      .then(res => res.json() as UnidadMedida)
      .catch(this.handleError);
  }

  update(unidadMedida: UnidadMedida): Promise<UnidadMedida> {
    const url = `${this.unidadMedidaUrl}/${unidadMedida.Id}`;
    return this.http
      .put(url, JSON.stringify(unidadMedida), {headers: this.headers})
      .toPromise()
      .then(() => unidadMedida)
      .catch(this.handleError);
  }

}
