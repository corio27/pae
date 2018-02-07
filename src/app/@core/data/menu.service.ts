import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Menu } from './menu';
import { Componente } from './componente';
import { ComponentesMenu } from './componentesMenu';
import { Preparacion } from './preparacion';
import { PreparacionesComponente } from './preparacionesComponente';

@Injectable()
export class MenuService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private menuUrl = 'v1/menu';
  private componentesMenuUrlQuery = 'v1/componentes_menu_temp/?query=MenuId';
  private componentesMenuUrl= 'v1/componentes_menu';
  private prepracionesComponenteUrl= 'v1/preparaciones_componente';
  private preparacionescomponenteUrlQuery = 'v1/preparaciones_componente/?query=ComponentesMenuId';
 constructor(private http: Http) { }
 objeto: string;
 body: any;
 getMenus(): Promise<Menu[]> {
   return this.http.get('v1/menu/?limit=-1')
   .toPromise()
   .then(response  => response.json() as Menu[])
   .catch(this.handleError);
}
getMenu(id: number): Promise<Menu> {
   const url = `${this.menuUrl}/${id}`;
   return this.http.get(url)
     .toPromise()
     .then(response => response.json() as Menu)
     .catch(this.handleError);
 }
 getComponentesMenu(id: number): Promise<ComponentesMenu[]> {
    const url = `${this.componentesMenuUrlQuery}:${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as ComponentesMenu[])
      .catch(this.handleError);
  }
  getPreparacionesComponente(id: number): Promise<PreparacionesComponente[]> {
     const url = `${this.preparacionescomponenteUrlQuery}:${id}`;
     return this.http.get(url)
       .toPromise()
       .then(response => response.json() as PreparacionesComponente[])
       .catch(this.handleError);
   }

 private handleError(error: any): Promise<any> {
   console.error('An error occurred', error); // for demo purposes only
   return Promise.reject(error.message || error);
 }

 delete(id: number): Promise<void> {
   const url = `${this.menuUrl}/${id}`;
   return this.http.delete(url, {headers: this.headers})
     .toPromise()
     .then(() => null)
     .catch(this.handleError);
 }

 create(name: string): Promise<Menu> {
   console.info('Codigo', JSON.stringify({Nombre: name}));
   return this.http
     .post(this.menuUrl,  JSON.stringify({Nombre: name}), {headers: this.headers})
     .toPromise()
     .then(res => res.json() as Menu)
     .catch(this.handleError);
 }

 update(menu: Menu): Promise<Menu> {
   const url = `${this.menuUrl}/${menu.Id}`;
   return this.http
     .put(url, JSON.stringify(menu), {headers: this.headers})
     .toPromise()
     .then(() => menu)
     .catch(this.handleError);
 }

 addComponente(menuId: Menu, componenteId: Componente ): Promise<ComponentesMenu> {
      this.objeto = '{"Id": null, "menuId":'
     + JSON.stringify(menuId) + ', "componenteId":' + JSON.stringify(componenteId) + '}';
   return this.http
     .post('v1/componentes_menu_temp', this.objeto, {headers: this.headers})
     .toPromise()
     .then(res => res.json() as ComponentesMenu)
     .catch(this.handleError);
 }
 addPreparacion(componenteMenuId: ComponentesMenu, preparacionId: Preparacion ): Promise<PreparacionesComponente> {
      this.objeto = '{"Id": null, "ComponentesMenuId":'
     + JSON.stringify(componenteMenuId) + ', "PreparacionId":' + JSON.stringify(preparacionId) + '}';
     console.info(this.objeto);
   return this.http
     .post(this.prepracionesComponenteUrl, this.objeto, {headers: this.headers})
     .toPromise()
     .then(res => res.json() as ComponentesMenu)
     .catch(this.handleError);
 }
}
