import {ComponentRef, Injectable} from '@angular/core';
import {ComponentService} from '../component.service';
import {ToastsComponent} from './toasts.component';

@Injectable({providedIn: 'root'})
export class ToastService extends ComponentService {
  position: string = '';
  private componentRef?: ComponentRef<ToastsComponent>;

  /**
   * 设置显示位置 top|middle|bottom|top-start|top-end|bottom-start|bottom-end
   * @param position
   */
  setPosition(position: string) {
    const validPositions = ['top', 'middle', 'bottom', 'top-start', 'top-end', 'bottom-start', 'bottom-end'];
    if (!validPositions.includes(position)) {
      this.position = 'top';
    } else {
      this.position = position;
    }
    return this;
  }

  /**
   * 构建toast并显示
   * @param content
   * @param header
   * @param className
   * @param delay
   * @param styles
   */
  show(content: string, header: string = '', className: string = '', delay: number = 5000, styles: Partial<CSSStyleDeclaration> = {}): ToastsComponent {
    if (!this.componentRef) this.componentRef = this.build(ToastsComponent);
    this.componentRef.instance.position = this.position;

    // 设置样式
    Object.assign(this.componentRef.location.nativeElement.style, styles);

    return this.componentRef.instance.onShow(content, header, className, delay);
  }

  /**
   * 关闭toast
   */
  hide(): void {
    if (this.componentRef && !this.componentRef.hostView.destroyed) {
      this.componentRef.instance.clear();
      this.componentRef.destroy();
      this.componentRef = undefined; // 清空引用
    }
  }

  private showToast(text: string, position: string, delay: number, className: string) {
    this.setPosition(position).show(text, '', className, delay);
  }

  /**
   *
   * @param text 文本
   * @param [position] 显示位置 top|middle|bottom|top-start|top-end|bottom-start|bottom-end（可选）
   * @param [delay] 显示时长后自动关闭（单位：ms）（可选）
   */
  default(text: string, position: string = 'top', delay: number = 2000) {
    this.showToast(text, position, delay, 'bg-body-tertiary');
  }

  /**
   *
   * @param text 文本
   * @param [position] 显示位置 top|middle|bottom|top-start|top-end|bottom-start|bottom-end（可选）
   * @param [delay] 显示时长后自动关闭（单位：ms）（可选）
   */
  success(text: string, position: string = 'top', delay: number = 2000) {
    this.showToast(text, position, delay, 'bg-success text-light');
  }

  /**
   *
   * @param text 文本
   * @param [position] 显示位置 top|middle|bottom|top-start|top-end|bottom-start|bottom-end（可选）
   * @param [delay] 显示时长后自动关闭（单位：ms）（可选）
   */
  warn(text: string, position: string = 'top', delay: number = 2000) {
    this.showToast(text, position, delay, 'bg-danger text-light');
  }
}
