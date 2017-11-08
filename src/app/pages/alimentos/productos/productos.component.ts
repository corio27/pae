import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Producto } from '../../../@core/data/producto';
import { TipoAlimento } from '../../../@core/data/tipoAlimento';
import { Lista } from '../../../@core/data/lista';
import { ProductoService } from '../../../@core/data/producto.service';
import { TipoAlimentoService } from '../../../@core/data/tipoAlimento.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../@core/data/users.service';
import { saveAs } from 'file-saver/FileSaver';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'ngx-productos',
  styleUrls: ['./productos.component.scss'],
  templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit, OnDestroy {

  productos: Producto[] = [];
  producto: Producto;
  contacts: any[];
  recent: any[];
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  currentTheme: string;
  tiposAlimentos: TipoAlimento[] = [];
  selectedProducto: Producto;
  selectedTipoAlimento: TipoAlimento;
  lista: Lista[] = [];
  settings: any;
  source: LocalDataSource;
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
      this.source = new LocalDataSource();
      this.tipoAlimentoService.getTiposAlimentos().then
      (
        tiposAlimentos => {
        this.tiposAlimentos = tiposAlimentos;
        tiposAlimentos.forEach(tipoAlimento => {
               const nuevaLista = new Lista( tipoAlimento.Id , tipoAlimento.Nombre );
               this.lista.push(nuevaLista);
         });
         console.info(this.tiposAlimentos);
         this.settings = {
           add: {
             addButtonContent: '<i class="nb-plus"></i>',
             createButtonContent: '<i class="nb-checkmark"></i>',
             cancelButtonContent: '<i class="nb-close"></i>',
           },
           edit: {
             confirmSave: true,
             editButtonContent: '<i class="nb-edit"></i>',
             saveButtonContent: '<i class="nb-checkmark"></i>',
             cancelButtonContent: '<i class="nb-close"></i>',
           },
           delete: {
             deleteButtonContent: '<i class="nb-trash"></i>',
             confirmDelete: true,
           },
           columns: {
             Id: {
                 editor: false,
               title: 'ID',
               type: 'number',
             },
             Nombre: {
               title: 'Nombre',
               type: 'string',
             },
             Codigo: {
               title: 'Código',
               type: 'string',
             },
             TipoAlimentoId: {
               title: 'Tipo Alimento',
               valuePrepareFunction: (value) => {
              const act = value as TipoAlimento;
              return  act.Nombre ;
                },
                filter: false,
          editor: {
          type: 'list',
          config: {
            list: this.lista,
          },
          },
             },
           },
         };
      });
        this.productoService.getProductos().then((producto) => {this.source.load(producto); console.info(producto); });
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
    onSaveConfirm(event) {
     if (window.confirm('¿Seguro de salvar?')) {
        this.producto = event.newData;
        console.info(this.producto);
        this.productoService.update(this.producto);
        event.confirm.resolve(event.newData);
     } else {
       event.confirm.reject();
     }
   }
   onDeleteConfirm(event): void {
     if (window.confirm('¿Seguro de querer eliminar?')) {
       event.confirm.resolve();
     } else {
       event.confirm.reject();
     }
   }
}
