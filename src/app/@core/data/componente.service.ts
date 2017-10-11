import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Componente } from './componente';


@Injectable()
export class ComponenteService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private componenteUrl = '/v1/componente';
  constructor(private http: Http) { };

  getComponentes(): Promise<Componente[]> {
  return this.http.get('v1/componente')
  .toPromise()
  .then(response  => response.json() as Componente[])
  .catch(this.handleError);
}


getComponente(id: number): Promise<Componente> {
    const url = `${this.componenteUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Componente)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.componenteUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Componente> {
    console.info('nombre', name);
    return this.http
      .post(this.componenteUrl, JSON.stringify({Nombre: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Componente)
      .catch(this.handleError);
  }

  update(componente: Componente): Promise<Componente> {
    const url = `${this.componenteUrl}/${componente.Id}`;
    return this.http
      .put(url, JSON.stringify(componente), {headers: this.headers})
      .toPromise()
      .then(() => componente)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  }
