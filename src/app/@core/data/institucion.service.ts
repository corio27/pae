import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Institucion } from './institucion';


@Injectable()
export class InstitucionService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private institucionesUrl = 'v1/institucion';
  private objeto: string;
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
  search(term: string): Observable<Institucion[]> {
    return this.http
               .get(`api/institucion/?name:${term}`)
               .map(response => response.json() as Institucion[]);
  }
  create(nombre: string, descripcion: string,
    codigoDane: number, codigoDanePrincipal: number, etc: number, municipio: number, cantidadManipuladoras: number,
    principal: number, tipoInstitucion: number, tipoMinuta: number, tipoModalidad: number): Promise<Institucion> {
    this.objeto =
    '{"CantidadManipuladoras":' + cantidadManipuladoras + ',' +
      '"CodigoDane":' + codigoDane + ',' +
      '"CodigoDanePrincipal":' + codigoDanePrincipal + ',' +
      '"Descripcion": "' + descripcion + '",' +
      '"EsPrincipal":' + principal + ',' +
      '"EtcId":' + etc + ',' +
      '"MunicipioId":' + municipio + ',' +
      '"Nombre": "' + nombre + '",' +
      '"TipoInstitucionId":' + tipoInstitucion + ',' +
      '"TipoModalidad":' + tipoModalidad + ',' +
      '"TipoMinuta":' + tipoMinuta + '}';
    console.info(this.objeto);
    return this.http
      .post(this.institucionesUrl, this.objeto, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Institucion)
      .catch(this.handleError);
  }

}
