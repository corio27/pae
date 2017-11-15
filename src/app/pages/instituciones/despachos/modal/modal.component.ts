import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
declare var Sbi: any;

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span></span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <iframe id="execiframe" [attr.src]="url | safe" height="400px" width="100%"></iframe>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="closeModal()">Save changes</button>
    </div>
  `,
})
export class ModalComponent {

  modalHeader: string;
  url: string;
  sanitizer: DomSanitizer;
  constructor(private activeModal: NgbActiveModal, sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
    Sbi.sdk.services.setBaseUrl({
     protocol: 'https',
     host: 'intelligentia.udistrital.edu.co',
     port: '8443',
     contextPath: 'SpagoBI',
     controllerPath: 'servlet/AdapterHTTP',
    });
    const cb = function(result, args, success) {
     if ( success === true ) {
       this.execTest1();
     } else {
       alert('ERROR: Wrong username or password');
     }
    };
     Sbi.sdk.api.authenticate({params: {user: 'biconsulta', password: 'biconsulta'}, callback: {
          fn: cb, scope: this,
        // , args: {arg1: 'A', arg2: 'B', ...}
      },
    });
  }

  closeModal() {
    this.activeModal.close();
  }
 execTest1() {
       this.url = Sbi.sdk.api.getDocumentUrl({
        documentLabel: 'RteFunDep'
        , executionRole: '/spagobi/user'
        , displayToolbar: true
        , displaySliders: true
        , iframe: {
          style: 'border: 0px;',
        },
      });
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }


}
