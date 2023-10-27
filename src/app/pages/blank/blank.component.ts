import {Component} from '@angular/core';
import {UploaderConfig, uploadFile} from "@components/uploader/uploader.component";
import {authConfig} from "@/utils/oauth.config";
import {Title} from "@angular/platform-browser";
import {AppState} from "@/store/state";
import {Store} from "@ngrx/store";
import {SweetAlert2LoaderService} from "@sweetalert2/ngx-sweetalert2";
@Component({
    selector: 'app-blank',
    templateUrl: './blank.component.html',
    styleUrls: ['./blank.component.css']
})
export class BlankComponent {
  imageConfig: UploaderConfig = {
    url: `${authConfig.issuer}/api`,
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
    private sweetAlert2LoaderService: SweetAlert2LoaderService
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
    console.log(images,this.filesImage);
    if (images.length) this.sweetAlert2LoaderService.swal.then((sweetAlert) => {
      sweetAlert.mixin({toast: true, position: 'top', showConfirmButton: false, timer: 5000}).fire({
        icon: 'success',
        title: '文件上传成功'
      }).then();
    });
  }

  uploadPdf(files: uploadFile[]) {
    console.log(files);
    if (files.length) this.sweetAlert2LoaderService.swal.then((sweetAlert) => {
      sweetAlert.mixin({toast: true, position: 'top', showConfirmButton: false, timer: 5000}).fire({
        icon: 'success',
        title: '文件上传成功'
      }).then();
    });
  }
}
