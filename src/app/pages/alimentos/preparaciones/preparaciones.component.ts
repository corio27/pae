import { Component, OnDestroy, OnInit } from '@angular/core';
import { Preparacion } from '../../../@core/data/preparacion';
import { Producto } from '../../../@core/data/producto';
import { ProductosPreparacion } from '../../../@core/data/productosPreparacion';
import { PreparacionService } from '../../../@core/data/preparacion.service';
import { ProductoService } from '../../../@core/data/producto.service';


@Component({
  selector: 'ngx-preparaciones',
  styleUrls: ['./preparaciones.component.scss'],
  templateUrl: './preparaciones.component.html',
})
export class PreparacionesComponent implements OnInit, OnDestroy {

  preparaciones: Preparacion[];
  productos: Producto[];
  selectedPreparacion: Preparacion;
  productosPreparacion: ProductosPreparacion[];
  selectedValue: Producto;
  constructor(private preparacionService: PreparacionService, private productoService: ProductoService) { }

    ngOnInit() {
        this.preparacionService.getPreparaciones()
        .then(preparaciones => this.preparaciones = preparaciones);
        console.info(this.preparaciones);

  }
  ngOnDestroy() { }
  add(name: string): void {
      name = name.trim();
      if (!name) { return; }

      this.preparacionService.create(name)
        .then(preparacion => {
          this.preparaciones.push(preparacion);
          this.selectedPreparacion = null;
        });
    }

    delete(preparacion: Preparacion): void {
      this.preparacionService
          .delete(preparacion.Id)
          .then(() => {
            this.preparaciones = this.preparaciones.filter(h => h !== preparacion);
            if (this.selectedPreparacion === preparacion) { this.selectedPreparacion = null; }
          });
    }
    onSelect(preparacion: Preparacion): void {
      this.selectedPreparacion = preparacion;
      this.getProductosPreparacion(this.selectedPreparacion);
    }
    getProductosPreparacion(preparacion: Preparacion): void {
      this.preparacionService.getProductosPreparacion(preparacion.Id)
      .then(productosPreparacion => this.productosPreparacion = productosPreparacion);
        this.getProductos();
    }
    getProductos() {
      this.productoService.getProductos()
      .then(productos => this.productos = productos);
    }
    addProducto(): void {
        this.preparacionService.add(this.selectedPreparacion, this.selectedValue)
          .then(productosPreparacion => {
                        this.productosPreparacion.push(productosPreparacion);
        });
      }
}
