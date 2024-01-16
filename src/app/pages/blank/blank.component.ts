import {Component} from '@angular/core';
import {UploaderConfig, uploadFile} from "@components/uploader/uploader.component";
import {Title} from "@angular/platform-browser";
import {AppState} from "@/store/state";
import {Store} from "@ngrx/store";
import {ToastService} from "@components/toasts/toast.service";

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent {
  imageConfig: UploaderConfig = {
    url: 'https://images.ztnews.net/api',
    auto: true,
    mimes: ['image'],
    limit: 1,
    size: 1024 * 1024 * 10
  } as UploaderConfig;

  pdfConfig!: UploaderConfig;

  filesPdf: uploadFile[] = [];
  filesImage: uploadFile[] = [];

  constructor(
    private title: Title,
    private store: Store<AppState>,
    private toastService: ToastService
  ) {
    this.title.setTitle('上传文件');
    this.store.select('auth').subscribe(({currentUser, token}) => {
      this.imageConfig = {
        ...this.imageConfig,
        headers: {'Authorization': token},
      }
      this.pdfConfig = {
        ...this.imageConfig,
        mimes: ['pdf']
      }
    });
  }

  uploadImage(images: uploadFile[]) {
    console.log(images, this.filesImage);
    if (images.length) this.toastService.success('文件上传成功');
  }

  uploadPdf(files: uploadFile[]) {
    console.log(files);
    if (files.length) this.toastService.success('文件上传成功');
  }

  showTop() {
    this.toastService.default('文件上传成功');
  }

  showMeddle() {
    this.toastService.success('文件上传成功','middle')
  }

  showBottom() {
    this.toastService.warn('文件上传失败','bottom')
  }

  showTopStart() {
    this.toastService.default('文件上传成功','top-start',5000)
  }

  showTopEnd() {
    this.toastService.setPosition('top-end').show('<h1>文件上传成功</h1>', '标题','',10000)
  }

  showBottomStart() {
    this.toastService.default('文件上传成功','bottom-start')
  }

  showBottomEnd() {
    this.toastService.default('文件上传成功','bottom-end')
  }
}
