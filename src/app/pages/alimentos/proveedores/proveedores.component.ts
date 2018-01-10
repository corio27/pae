import { Component, OnDestroy, OnInit } from '@angular/core';
import { Proveedor } from '../../../@core/data/proveedor';
import { Producto } from '../../../@core/data/producto';
import { Municipio } from '../../../@core/data/municipio';
import { UnidadMedida } from '../../../@core/data/unidadMedida';
import { ProductosProveedor } from '../../../@core/data/productosProveedor';
import { MunicipiosProveedor } from '../../../@core/data/municipiosProveedor';
import { ProveedorService } from '../../../@core/data/proveedor.service';
import { ProductoService } from '../../../@core/data/producto.service';
import { UnidadMedidaService } from '../../../@core/data/unidadMedida.service';
import { MunicipioService } from '../../../@core/data/municipio.service';


@Component({
  selector: 'ngx-proveedores',
  styleUrls: ['./proveedores.component.scss'],
  templateUrl: './proveedores.component.html',
})
export class ProveedoresComponent implements OnInit, OnDestroy {

  proveedores: Proveedor[];
  productos: Producto[];
  municipios: Municipio[];
  selectedProveedor: Proveedor;
  selectedMunicipio: Municipio;
  productosProveedor: ProductosProveedor[];
  municipiosProveedor: MunicipiosProveedor[];
  unidadMedidas: UnidadMedida[];
  selectedValue: Producto;
  selectedUnidadMedida: UnidadMedida;
  constructor(private proveedorService: ProveedorService, private productoService: ProductoService,
    private unidadMedidaService: UnidadMedidaService, private municipioService: MunicipioService,
       ) { }

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
      this.getMunicipiosProveedor(this.selectedProveedor);
    }
    getProductosProveedor(proveedor: Proveedor): void {
      this.proveedorService.getProductosProveedor(proveedor.Id)
      .then(productosProveedor => { this.productosProveedor = productosProveedor;
        console.info(this.productosProveedor);
       });
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
      addMunicipio(): void {
          this.proveedorService.addMunicipio(this.selectedProveedor, this.selectedMunicipio)
            .then(municipiosProveedor => {
                          this.municipiosProveedor.push(municipiosProveedor);
          });
        }
        getMunicipiosProveedor(proveedor: Proveedor): void {
          console.info('entro', proveedor);
          this.proveedorService.getMunicipiosProveedor(proveedor.Id)
          .then(municipiosProveedor => { this.municipiosProveedor = municipiosProveedor;
console.info(this.municipiosProveedor);
           });
            this.municipios = null;
            this.getMunicipios();
        }
        getMunicipios() {
          this.municipioService.getMunicipios()
          .then(municipios => this.municipios = municipios);
        }

    }
