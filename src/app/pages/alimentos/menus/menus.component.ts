import { Component, OnDestroy, OnInit } from '@angular/core';
import { Menu } from '../../../@core/data/menu';
import { Componente } from '../../../@core/data/componente';
import { ComponentesMenu } from '../../../@core/data/componentesMenu';
import { Preparacion } from '../../../@core/data/preparacion';
import { PreparacionesComponente } from '../../../@core/data/preparacionesComponente';
import { MenuService } from '../../../@core/data/menu.service';
import { ComponenteService } from '../../../@core/data/componente.service';
import { PreparacionService } from '../../../@core/data/preparacion.service';


@Component({
  selector: 'ngx-menus',
  styleUrls: ['./menus.component.scss'],
  templateUrl: './menus.component.html',
})
export class MenusComponent implements OnInit, OnDestroy {

  menus: Menu[] = [];
  componentes: Componente[] = [];
  selectedMenu: Menu;
  selectedPreparacion: Preparacion;
  preparaciones: Preparacion[] = [];
  preparacionesComponente: PreparacionesComponente[] = [];
  componentesMenu: ComponentesMenu[] = [];
  selectedComponente: Componente;
  selectedComponenteMenu: ComponentesMenu;
  constructor(private menuService: MenuService,
    private componenteService: ComponenteService, private preparacionService: PreparacionService) { }

    ngOnInit() {
        this.menuService.getMenus()
        .then(menus => this.menus = menus);
        this.getComponentes();
  }
  ngOnDestroy() { }
  add(name: string): void {
      name = name.trim();
      if (!name) { return; }

      this.menuService.create(name)
        .then(menu => {
          this.menus.push(menu);
            console.info(menu);
            this.componentes.forEach(componente => {
              this.menuService.addComponente(menu, componente)
              .then(componenteMenu => {
                console.info(menu);
                console.info(componente);
                  //          this.componentesMenu.push(componenteMenu);
            });
            this.selectedMenu = null;
          });
        });


    }

    delete(menu: Menu): void {
      this.menuService
          .delete(menu.Id)
          .then(() => {
            this.menus = this.menus.filter(h => h !== menu);
            if (this.selectedMenu === menu) { this.selectedMenu = null; }
          });
    }
    onSelect(menu: Menu): void {
      this.selectedMenu = menu;
      this.getComponentesMenu(this.selectedMenu);
    }
    onSelectComponenteMenu(componenteMenu: ComponentesMenu): void {
      this.selectedComponenteMenu = componenteMenu;
      this.getPreparacionesComponente(this.selectedComponenteMenu);
    }
    getComponentesMenu(menu: Menu): void {
      this.menuService.getComponentesMenu(menu.Id)
      .then(componentesMenu => this.componentesMenu = componentesMenu);

    }
    getPreparacionesComponente(componenteMenu: ComponentesMenu): void {
      this.menuService.getPreparacionesComponente(componenteMenu.Id)
      .then(preparacionesComponente => this.preparacionesComponente = preparacionesComponente);
        this.getPreparaciones();
        console.info(this.preparacionesComponente);
    }
    getComponentes() {
      this.componenteService.getComponentes()
      .then(componentes => this.componentes = componentes);
    }
    addComponente(): void {
        this.menuService.addComponente(this.selectedMenu, this.selectedComponente)
          .then(componentesMenu => {
                        this.componentesMenu.push(componentesMenu);
        });
      }
      getPreparaciones() {
        this.preparacionService.getPreparaciones()
        .then(preparaciones => this.preparaciones = preparaciones);
      }
      addPreparacion(): void {
          this.menuService.addPreparacion(this.selectedComponenteMenu, this.selectedPreparacion)
            .then(preparacionesComponente => {
                          this.preparacionesComponente.push(preparacionesComponente);
          });
        }
    }
