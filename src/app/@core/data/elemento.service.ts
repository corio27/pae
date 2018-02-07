import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Elemento } from './elemento';
import { TipoAlimento } from './tipoAlimento';

@Injectable()
export class ElementoService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private elementoUrl = 'v1/elemento';
  objeto: string;
 constructor(private http: Http) { }

  getElementos(): Promise<Elemento[]> {
  return this.http.get('v1/elemento/?limit=-1')
  .toPromise()
  .then(response  => response.json() as Elemento[])
  .catch(this.handleError);
}


getElemento(id: number): Promise<Elemento> {
    const url = `${this.elementoUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Elemento)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  delete(id: number): Promise<void> {
    const url = `${this.elementoUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string, codigo: string, tipoAlimentoId: TipoAlimento): Promise<Elemento> {
    this.objeto =
    '{"Nombre":"' + name + '", "Codigo":"' + codigo + '", "TipoAlimentoId":' + tipoAlimentoId + '}';
    console.info(this.objeto);
    return this.http
      .post(this.elementoUrl, this.objeto, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Elemento)
      .catch(this.handleError);
  }

  update(id: number, nombre: string,
    codigo: number, codigoNutricional: number, tipoAlimentoId: number): Promise<Elemento> {
    this.objeto =
    '{"Id":' + id + ', "Nombre":"' + nombre + '", "Codigo":' + codigo
   + ', "TipoAlimentoId":{"Id":' + tipoAlimentoId + '}}';
    console.info(this.objeto);
    const url = `${this.elementoUrl}/${id}`;
    return this.http
      .put(url, this.objeto, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Elemento)
      .catch(this.handleError);
  }

}
