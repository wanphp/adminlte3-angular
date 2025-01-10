import {createAction, props} from '@ngrx/store';
import {ElementRef, ViewContainerRef} from '@angular/core';


export const sidebarAction = createAction('是否展开侧边栏');

export const styleAction = createAction('是否黑暗模式');

export const dynamicBuildContainerAction = createAction(
  '动态构建组件容器',
  props<{ container: ViewContainerRef }>()
);
export const dynamicBuildElementAction = createAction(
  '动态构建组件元素',
  props<{ element: ElementRef }>()
);

export const registerWechatAction = createAction(
  '微信SDK注册',
  props<{ wx: any }>()
);
