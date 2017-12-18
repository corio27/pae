import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Producto } from './producto';
import { TipoAlimento } from './tipoAlimento';

@Injectable()
export class ProductoService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private productoUrl = 'v1/producto';
  objeto: string;
 constructor(private http: Http) { }

  getProductos(): Promise<Producto[]> {
  return this.http.get('v1/producto/?limit=-1')
  .toPromise()
  .then(response  => response.json() as Producto[])
  .catch(this.handleError);
}


getProducto(id: number): Promise<Producto> {
    const url = `${this.productoUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Producto)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  delete(id: number): Promise<void> {
    const url = `${this.productoUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string, codigo: number, tipoAlimentoId: TipoAlimento): Promise<Producto> {
    this.objeto =
    '{"Nombre":"' + name + '", "Codigo":' + codigo + ', "TipoAlimentoId":' + tipoAlimentoId + '}';
    console.info(this.objeto);
    return this.http
      .post(this.productoUrl, this.objeto, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Producto)
      .catch(this.handleError);
  }

  update(id: number, nombre: string,
    codigo: number, codigoNutricional: number, tipoAlimentoId: number): Promise<Producto> {
    this.objeto =
    '{"Id":' + id + ', "Nombre":"' + nombre + '", "Codigo":' + codigo + ', "CodigoNutricional":'
    + codigoNutricional + ', "TipoAlimentoId":{"Id":' + tipoAlimentoId + '}}';
    console.info(this.objeto);
    const url = `${this.productoUrl}/${id}`;
    return this.http
      .put(url, this.objeto, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Producto)
      .catch(this.handleError);
  }

}
