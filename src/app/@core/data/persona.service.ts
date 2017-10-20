import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Persona } from './persona';


@Injectable()
export class PersonaService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private personaUrl = 'v1/persona';
 constructor(private http: Http) { }

  getPersonas(): Promise<Persona[]> {
  return this.http.get('v1/persona')
  .toPromise()
  .then(response  => response.json() as Persona[])
  .catch(this.handleError);
}


getPersona(id: number): Promise<Persona> {
    const url = `${this.personaUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Persona)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
