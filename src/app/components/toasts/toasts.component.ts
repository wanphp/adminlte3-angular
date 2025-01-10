import {Component, HostBinding, Input} from '@angular/core';
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";
import {NgFor} from "@angular/common";

interface Toast {
  header: string;
  content: string;
  className?: string;
  delay?: number;
}

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

  toasts: Toast[] = [];

  @Input()
  set position(val: string) {
    const positions: { [key: string]: string } = {
      middle: 'top-50 start-50 translate-middle',
      bottom: 'bottom-0 start-50 translate-middle-x',
      'top-start': 'top-0 start-0',
      'top-end': 'top-0 end-0',
      'bottom-start': 'bottom-0 start-0',
      'bottom-end': 'bottom-0 end-0',
    };
    this._position = positions[val] || 'top-0 start-50 translate-middle-x';
  }

  get position(): string {
    return this._position;
  }

  @HostBinding('class') get Host() {
    return 'toast-container position-fixed p-3 ' + this.position;
  }

  @Input() customStyles: Partial<CSSStyleDeclaration> = {};

  @HostBinding('style') get hostStyles(): Partial<CSSStyleDeclaration> {
    return {zIndex: '1200', ...this.customStyles};
  }

  onShow(content: string, header: string = '', className: string = '', delay: number = 5000) {
    if (!this.toasts.some(toast => toast.content === content)) {
      this.toasts.push({header, content, className, delay});
    }
    return this;
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    while (this.toasts.length) {
      this.remove(this.toasts[0]);
    }
  }
}
