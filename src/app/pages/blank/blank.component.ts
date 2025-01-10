import {Component} from '@angular/core';
import {UploaderComponent, UploaderConfig, uploadFile} from "../../components/uploader/uploader.component";
import {Title} from "@angular/platform-browser";
import {AppState} from "../../store";
import {Store} from "@ngrx/store";
import {ToastService} from "../../components/toasts/toast.service";
import {AuthState} from '../../store/auth/reducer';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  standalone: true,
  imports: [
    UploaderComponent,
    SweetAlert2Module,
    NgbTooltip
  ],
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
    this.store.select('auth').subscribe(({accessToken}: AuthState) => {
      this.imageConfig = {
        ...this.imageConfig,
        headers: {'Authorization': accessToken},
      }
      this.pdfConfig = {
        ...this.imageConfig,
        mimes: ['pdf']
      }
    });
  }

  showAlert() {
    Swal.fire({
      title: 'Hello, Angular!',
      text: 'This is a SweetAlert2 example.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(r => console.log(r));
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
    this.toastService.success('文件上传成功', 'middle')
  }

  showBottom() {
    this.toastService.warn('文件上传失败', 'bottom')
  }

  showTopStart() {
    this.toastService.default('文件上传成功', 'top-start', 5000)
  }

  showTopEnd() {
    this.toastService.setPosition('top-end').show('<h1>文件上传成功</h1>', '标题', '', 10000)
  }

  showBottomStart() {
    this.toastService.default('文件上传成功', 'bottom-start')
  }

  showBottomEnd() {
    this.toastService.default('文件上传成功', 'bottom-end')
  }
}
