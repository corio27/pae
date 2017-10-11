import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Institucion } from './institucion';


@Injectable()
export class InstitucionService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private institucionesUrl = 'v1/institucion';
   constructor(private http: Http) { }
   getInstituciones(): Promise<Institucion[]> {
  return this.http.get(this.institucionesUrl)
             .toPromise()
             .then(response => response.json() as Institucion[])
             .catch(this.handleError);
}

getInstitucion(id: number): Promise<Institucion> {
    const url = `${this.institucionesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Institucion)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
