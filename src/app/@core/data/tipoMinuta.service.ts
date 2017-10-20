import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { TipoMinuta } from './tipoMinuta';


@Injectable()
export class TipoMinutaService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private tipoMinutaUrl = 'v1/tipo_minuta';
 constructor(private http: Http) { }

  getTiposMinutas(): Promise<TipoMinuta[]> {
  return this.http.get('v1/tipo_minuta')
  .toPromise()
  .then(response  => response.json() as TipoMinuta[])
  .catch(this.handleError);
}


getTipoMinuta(id: number): Promise<TipoMinuta> {
    const url = `${this.tipoMinutaUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as TipoMinuta)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  delete(id: number): Promise<void> {
    const url = `${this.tipoMinutaUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(tipoMinuta: string): Promise<TipoMinuta> {
      return this.http
      .post(this.tipoMinutaUrl, '{"Nombre":"' + tipoMinuta + '"}', {headers: this.headers})
      .toPromise()
      .then(res => res.json() as TipoMinuta)
      .catch(this.handleError);
  }

  update(tipoMinuta: TipoMinuta): Promise<TipoMinuta> {
    const url = `${this.tipoMinutaUrl}/${tipoMinuta.Id}`;
    return this.http
      .put(url, JSON.stringify(tipoMinuta), {headers: this.headers})
      .toPromise()
      .then(() => tipoMinuta)
      .catch(this.handleError);
  }

}
