import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <iframe id="execiframe" [attr.src]="url | safe" height="400px" width="100%"></iframe>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="closeModal()">Cerrar</button>
    </div>
  `,
})
export class ModalComponent {
    modalHeader: string;
    url: string;
    constructor(private activeModal: NgbActiveModal) {
  }

  closeModal() {
    this.activeModal.close();
  }


}
