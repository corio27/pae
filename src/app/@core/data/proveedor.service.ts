import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Proveedor } from './proveedor';
import { Producto } from './producto';
import { ProductosProveedor } from './productosProveedor';
import { Municipio } from './municipio';
import { MunicipiosProveedor } from './municipiosProveedor';



@Injectable()
export class ProveedorService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private proveedorUrl = 'v1/proveedor';
  private productosProveedorUrlQuery = 'v1/productos_proveedor/?query=ProveedorId';
  private municipiosProveedorUrlQuery = 'v1/municipios_proveedor/?query=ProveedorId';
  private productosProveedorUrl= 'v1/productos_proveedor';
  private municipiosProveedorUrl= 'v1/municipios_proveedor';
  private objeto: string;
 constructor(private http: Http) { }

  getProveedores(): Promise<Proveedor[]> {
  return this.http.get('v1/proveedor/?limit=-1')
  .toPromise()
  .then(response  => response.json() as Proveedor[])
  .catch(this.handleError);
}


getProveedor(id: number): Promise<Proveedor> {
    const url = `${this.proveedorUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Proveedor)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  delete(id: number): Promise<void> {
    const url = `${this.proveedorUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(proveedor: string): Promise<Proveedor> {
      return this.http
      .post(this.proveedorUrl, '{"Nombre":"' + proveedor + '"}', {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Proveedor)
      .catch(this.handleError);
  }

  update(proveedor: Proveedor): Promise<Proveedor> {
    const url = `${this.proveedorUrl}/${proveedor.Id}`;
    return this.http
      .put(url, JSON.stringify(proveedor), {headers: this.headers})
      .toPromise()
      .then(() => proveedor)
      .catch(this.handleError);
  }
  add(proveedorId: Proveedor, productoId: Producto ): Promise<ProductosProveedor> {
       this.objeto = '{"Id": null, "proveedorId":'
      + JSON.stringify(proveedorId) + ', "productoId":' + JSON.stringify(productoId) + '}';
    return this.http
      .post(this.productosProveedorUrl, this.objeto, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as ProductosProveedor)
      .catch(this.handleError);
  }
  getProductosProveedor(id: number): Promise<ProductosProveedor[]> {
     const url = `${this.productosProveedorUrlQuery}:${id}&limit=-1`;
     return this.http.get(url)
       .toPromise()
       .then(response => response.json() as ProductosProveedor[])
       .catch(this.handleError);
   }
   addMunicipio(proveedorId: Proveedor, municipioId: Municipio ): Promise<MunicipiosProveedor> {
        this.objeto = '{"Id": null, "proveedorId":'
       + JSON.stringify(proveedorId) + ', "municipioId":' + JSON.stringify(municipioId) + '}';
     return this.http
       .post(this.municipiosProveedorUrl, this.objeto, {headers: this.headers})
       .toPromise()
       .then(res => res.json() as MunicipiosProveedor)
       .catch(this.handleError);
   }
   getMunicipiosProveedor(id: number): Promise<MunicipiosProveedor[]> {
      const url = `${this.municipiosProveedorUrlQuery}:${id}&limit=-1`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json() as MunicipiosProveedor[])
        .catch(this.handleError);
    }

}
