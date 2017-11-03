import { Component, OnDestroy, OnInit } from '@angular/core';
import { Proveedor } from '../../../@core/data/proveedor';
import { Producto } from '../../../@core/data/producto';
import { UnidadMedida } from '../../../@core/data/unidadMedida';
import { ProductosProveedor } from '../../../@core/data/productosProveedor';
import { ProveedorService } from '../../../@core/data/proveedor.service';
import { ProductoService } from '../../../@core/data/producto.service';
import { UnidadMedidaService } from '../../../@core/data/unidadMedida.service';

@Component({
  selector: 'ngx-proveedores',
  styleUrls: ['./proveedores.component.scss'],
  templateUrl: './proveedores.component.html',
})
export class ProveedoresComponent implements OnInit, OnDestroy {

  proveedores: Proveedor[];
  productos: Producto[];
  selectedProveedor: Proveedor;
  productosProveedor: ProductosProveedor[];
  unidadMedidas: UnidadMedida[];
  selectedValue: Producto;
  selectedUnidadMedida: UnidadMedida;
  constructor(private proveedorService: ProveedorService, private productoService: ProductoService,
    private unidadMedidaService: UnidadMedidaService ) { }

    ngOnInit() {
        this.proveedorService.getProveedores().then(proveedores => this.proveedores = proveedores);
        console.info(this.proveedores);

  }
  ngOnDestroy() { }
  add(name: string): void {
      name = name.trim();
      if (!name) { return; }

      this.proveedorService.create(name)
        .then(proveedor => {
          this.proveedores.push(proveedor);
          this.selectedProveedor = null;
        });
    }

    delete(proveedor: Proveedor): void {
      this.proveedorService
          .delete(proveedor.Id)
          .then(() => {
            this.proveedores = this.proveedores.filter(h => h !== proveedor);
            if (this.selectedProveedor === proveedor) { this.selectedProveedor = null; }
          });
    }
    onSelect(proveedor: Proveedor): void {
      this.selectedProveedor = proveedor;
      console.info('prooveedor', this.selectedProveedor);
      this.getProductosProveedor(this.selectedProveedor);
    }
    getProductosProveedor(proveedor: Proveedor): void {
      this.proveedorService.getProductosProveedor(proveedor.Id)
      .then(productosProveedor => this.productosProveedor = productosProveedor);
        this.productos = null;
        this.getProductos();
    }
    getProductos() {
      this.productoService.getProductos()
      .then(productos => this.productos = productos);
      this.unidadMedidaService.getUnidadesMedida()
      .then(unidadMedidas => this.unidadMedidas = unidadMedidas);
    }
    addProducto(): void {
        this.proveedorService.add(this.selectedProveedor, this.selectedValue)
          .then(productosProveedor => {
                        this.productosProveedor.push(productosProveedor);
        });
      }
    }
