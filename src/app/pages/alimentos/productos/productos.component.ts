import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Producto } from '../../../@core/data/producto';
import { ProductoService } from '../../../@core/data/producto.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../@core/data/users.service';
@Component({
  selector: 'ngx-productos',
  styleUrls: ['./productos.component.scss'],
  templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit, OnDestroy {

  productos: Producto[];
  contacts: any[];
  recent: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;
  selectedProducto: Producto;
  constructor(private productoService: ProductoService,
              private userService: UserService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService, private http: HttpClient) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                  });

    }

    ngOnInit() {
     this.productoService.getProductos().then(productos => this.productos = productos);
     }

  ngOnDestroy() {
     this.themeSubscription.unsubscribe();
  }

  add(name: string, codigo: number): void {
      name = name.trim();
      if (!name) { return; }
      console.info('nombre', name);
      this.productoService.create(name, codigo)
        .then(producto => {
          this.productos.push(producto);
          this.selectedProducto = null;
        });
    }

    delete(producto: Producto): void {
      this.productoService
          .delete(producto.Id)
          .then(() => {
            this.productos = this.productos.filter(h => h !== producto);
            if (this.selectedProducto === producto) { this.selectedProducto = null; }
          });
    }
    onSelect(producto: Producto): void {
      this.selectedProducto = producto;
      console.info('nombre', producto.Nombre);
    }
}
