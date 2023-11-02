import {Injectable} from '@angular/core';
import {ComponentService} from "@components/component.service";
import {ToastsComponent} from "@components/toasts/toasts.component";

@Injectable({providedIn: 'root'})
export class ToastService extends ComponentService {
  position: string = '';
  componentRef: any;

  /**
   * 设置显示位置 top|meddle|bottom|top-start|top-end|bottom-start|bottom-end
   * @param position
   */
  setPosition(position: string) {
    this.position = position;
    return this;
  }

  /**
   * 构建toast并显示
   * @param content
   * @param header
   * @param className
   * @param delay
   */
  show(content: string, header: string = '', className: string = '', delay: number = 5000): ToastsComponent {
    if (!this.componentRef) this.componentRef = this.build(ToastsComponent);
    this.componentRef.instance.position = this.position;
    return this.componentRef.instance.onShow(content, header, className, delay);
  }

  /**
   * 关闭toast
   */
  hide(): void {
    this.componentRef.instance.clear();
  }

  /**
   *
   * @param text 文本
   * @param [position] 显示位置 top|meddle|bottom|top-start|top-end|bottom-start|bottom-end（可选）
   * @param [delay] 显示时长后自动关闭（单位：ms）（可选）
   */
  default(text: string, position: string = 'top', delay: number = 2000) {
    this.setPosition(position).show(text, '', '', delay);
  }

  /**
   *
   * @param text 文本
   * @param [position] 显示位置 top|meddle|bottom|top-start|top-end|bottom-start|bottom-end（可选）
   * @param [delay] 显示时长后自动关闭（单位：ms）（可选）
   */
  success(text: string, position: string = 'top', delay: number = 2000) {
    this.setPosition(position).show(text, '', 'bg-success text-light', delay);
  }

  /**
   *
   * @param text 文本
   * @param [position] 显示位置 top|meddle|bottom|top-start|top-end|bottom-start|bottom-end（可选）
   * @param [delay] 显示时长后自动关闭（单位：ms）（可选）
   */
  warn(text: string, position: string = 'top', delay: number = 2000) {
    this.setPosition(position).show(text, '', 'bg-danger text-light', delay);
  }
}
