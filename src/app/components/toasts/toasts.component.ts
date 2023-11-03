import {Component, HostBinding, Input} from '@angular/core';
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [NgbToastModule, NgFor],
  template: `
    <ngb-toast
      *ngFor="let toast of toasts"
      [class]="toast.className"
      [header]="toast.header"
      [autohide]="autoHide"
      [delay]="toast.delay || 5000"
      (hidden)="remove(toast)"
      (mouseenter)="autoHide = false"
      (mouseleave)="autoHide = true"
    >
      <div [innerHtml]="toast.content"></div>
    </ngb-toast>
  `,
  host: {style: 'z-index: 1200'},
})
export class ToastsComponent {
  autoHide = true;
  private _position = 'top';

  toasts: any[] = [];

  @Input()
  set position(val: string) {
    switch (val) {
      case 'middle':
        this._position = 'top-50 start-50 translate-middle';
        break;
      case 'bottom':
        this._position = 'bottom-0 start-50 translate-middle-x';
        break;
      case 'top-start':
        this._position = 'top-0 start-0';
        break;
      case 'top-end':
        this._position = 'top-0 end-0';
        break;
      case 'bottom-start':
        this._position = 'bottom-0 start-0';
        break;
      case 'bottom-end':
        this._position = 'bottom-0 end-0';
        break;
      default:
        this._position = 'top-0 start-50 translate-middle-x';
    }
  }

  get position(): string {
    return this._position;
  }

  @HostBinding('class') get Host() {
    return 'toast-container position-fixed p-3 ' + this.position;
  }

  onShow(content: string, header: string = '', className: string = '', delay: number = 5000) {
    this.toasts.push({
      header: header,
      content: content,
      className: className,
      delay: delay
    });
    return this;
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
