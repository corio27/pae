import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Rol } from './rol';


@Injectable()
export class RolService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private rolUrl = 'v1/rol';
 constructor(private http: Http) { }

  getRoles(): Promise<Rol[]> {
  return this.http.get('v1/rol')
  .toPromise()
  .then(response  => response.json() as Rol[])
  .catch(this.handleError);
}


getRol(id: number): Promise<Rol> {
    const url = `${this.rolUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Rol)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  delete(id: number): Promise<void> {
    const url = `${this.rolUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(rol: string): Promise<Rol> {
      return this.http
      .post(this.rolUrl, '{"Nombre":"' + rol + '"}', {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Rol)
      .catch(this.handleError);
  }

  update(rol: Rol): Promise<Rol> {
    const url = `${this.rolUrl}/${rol.Id}`;
    return this.http
      .put(url, JSON.stringify(rol), {headers: this.headers})
      .toPromise()
      .then(() => rol)
      .catch(this.handleError);
  }

}
