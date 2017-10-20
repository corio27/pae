import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { TipoInstitucion } from './tipoInstitucion';


@Injectable()
export class TipoInstitucionService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private tipoInstitucionUrl = 'v1/tipo_institucion';
 constructor(private http: Http) { }

  getTiposIntituciones(): Promise<TipoInstitucion[]> {
  return this.http.get('v1/tipo_institucion')
  .toPromise()
  .then(response  => response.json() as TipoInstitucion[])
  .catch(this.handleError);
}


getInstitucion(id: number): Promise<TipoInstitucion> {
    const url = `${this.tipoInstitucionUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as TipoInstitucion)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  delete(id: number): Promise<void> {
    const url = `${this.tipoInstitucionUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(tipoInstitucion: string): Promise<TipoInstitucion> {
      return this.http
      .post(this.tipoInstitucionUrl, '{"Nombre":"' + tipoInstitucion + '"}', {headers: this.headers})
      .toPromise()
      .then(res => res.json() as TipoInstitucion)
      .catch(this.handleError);
  }

  update(tipoInstitucion: TipoInstitucion): Promise<TipoInstitucion> {
    const url = `${this.tipoInstitucionUrl}/${tipoInstitucion.Id}`;
    return this.http
      .put(url, JSON.stringify(tipoInstitucion), {headers: this.headers})
      .toPromise()
      .then(() => tipoInstitucion)
      .catch(this.handleError);
  }

}
