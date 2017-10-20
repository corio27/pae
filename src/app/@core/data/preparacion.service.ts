import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Preparacion } from './preparacion';
import { Producto } from './producto';
import { ProductosPreparacion } from './productosPreparacion';


@Injectable()
export class PreparacionService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private preparacionUrl = 'v1/preparacion';
  private productosPreparacionUrlQuery = '/v1/productos_preparacion/?query=PreparacionId';
  private productosPreparacionUrl= '/v1/productos_preparacion';
 constructor(private http: Http) { }
 objeto: string;
 body: any;
 getPreparaciones(): Promise<Preparacion[]> {
   return this.http.get('v1/preparacion')
   .toPromise()
   .then(response  => response.json() as Preparacion[])
   .catch(this.handleError);
}
getPreparacion(id: number): Promise<Preparacion> {
   const url = `${this.preparacionUrl}/${id}`;
   return this.http.get(url)
     .toPromise()
     .then(response => response.json() as Preparacion)
     .catch(this.handleError);
 }
 getProductosPreparacion(id: number): Promise<ProductosPreparacion[]> {
    const url = `${this.productosPreparacionUrlQuery}:${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as ProductosPreparacion[])
      .catch(this.handleError);
  }

 private handleError(error: any): Promise<any> {
   console.error('An error occurred', error); // for demo purposes only
   return Promise.reject(error.message || error);
 }

 delete(id: number): Promise<void> {
   const url = `${this.preparacionUrl}/${id}`;
   return this.http.delete(url, {headers: this.headers})
     .toPromise()
     .then(() => null)
     .catch(this.handleError);
 }

 create(name: string): Promise<Preparacion> {
   console.info('Codigo', JSON.stringify({Nombre: name}));
   return this.http
     .post(this.preparacionUrl,  JSON.stringify({Nombre: name}), {headers: this.headers})
     .toPromise()
     .then(res => res.json() as Preparacion)
     .catch(this.handleError);
 }

 update(preparacion: Preparacion): Promise<Preparacion> {
   const url = `${this.preparacionUrl}/${preparacion.Id}`;
   return this.http
     .put(url, JSON.stringify(preparacion), {headers: this.headers})
     .toPromise()
     .then(() => preparacion)
     .catch(this.handleError);
 }

 add(preparacionId: Preparacion, productoId: Producto ): Promise<ProductosPreparacion> {
      this.objeto = '{"Id": null, "preparacionId":'
     + JSON.stringify(preparacionId) + ', "productoId":' + JSON.stringify(productoId) + '}';
   return this.http
     .post(this.productosPreparacionUrl, this.objeto, {headers: this.headers})
     .toPromise()
     .then(res => res.json() as ProductosPreparacion)
     .catch(this.handleError);
 }
}
