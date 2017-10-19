import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Producto } from '../../../@core/data/producto';
import { TipoAlimento } from '../../../@core/data/tipoAlimento';
import { ProductoService } from '../../../@core/data/producto.service';
import { TipoAlimentoService } from '../../../@core/data/tipoAlimento.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../@core/data/users.service';
import { saveAs } from 'file-saver/FileSaver';
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
  tiposAlimentos: TipoAlimento[];
  selectedProducto: Producto;
  selectedTipoAlimento: TipoAlimento;
  constructor(private productoService: ProductoService,
              private tipoAlimentoService: TipoAlimentoService,
              private userService: UserService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService, private http: HttpClient) {
                this.breakpoints = breakpointService.getBreakpointsMap();
                this.themeSubscription = themeService.onMediaQueryChange()
                  .subscribe(([oldValue, newValue]) => {
                    this.breakpoint = newValue;
                  });
                  this.selectedTipoAlimento = null;

    }

    ngOnInit() {
     this.productoService.getProductos().then(productos => this.productos = productos);
     this.tipoAlimentoService.getTiposAlimentos().then(tiposAlimentos => this.tiposAlimentos = tiposAlimentos)
     }

  ngOnDestroy() {
     this.themeSubscription.unsubscribe();
  }

  add(name: string, codigo: number): void {
      name = name.trim();
      if (!name) { return; }
      if ( null === this.selectedTipoAlimento) { return;
         }
         this.productoService.create(name, codigo, this.selectedTipoAlimento)
         .then(producto => {
           console.info(producto);
           this.productos.push(producto);
           this.selectedProducto = null;
           this.selectedTipoAlimento = null;
         });
    }
    onUploadFinished(event) {
       console.info(event.file);
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
    }
}
