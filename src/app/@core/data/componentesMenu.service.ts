import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { ComponentesMenu } from './componentesMenu';
import { TipoMinuta } from './tipoMinuta';
import { Menu } from './menu';
import { Preparacion } from './preparacion';
import { Componente } from './componente';


@Injectable()
export class ComponentesMenuService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private componenteUrl = 'v1/componentes_menu';
  constructor(private http: Http) { };

  getComponentesMenus(): Promise<ComponentesMenu[]> {
  return this.http.get('v1/componentes_menu/?limit=-1')
  .toPromise()
  .then(response  => response.json() as ComponentesMenu[])
  .catch(this.handleError);
}


getComponentesMenu(id: number): Promise<ComponentesMenu> {
    const url = `${this.componenteUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as ComponentesMenu)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
    const url = `${this.componenteUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(minuta: TipoMinuta, menu: Menu, preparacion: Preparacion, componente: Componente, estado: string)
  : Promise<ComponentesMenu> {
    console.info('nombre', name);
    return this.http
      .post(this.componenteUrl,
      JSON.stringify({ComponenteId: componente, MenuId: menu, PreparacionId: preparacion, Estado: estado}),
      {headers: this.headers})
      .toPromise()
      .then(res => res.json() as ComponentesMenu)
      .catch(this.handleError);
  }

  update(componente: ComponentesMenu): Promise<ComponentesMenu> {
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
