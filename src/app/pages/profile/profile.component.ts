import {Component, OnInit, ViewChild} from '@angular/core';
import {UserEntity} from "@/entities/user.entity";
import {Title} from "@angular/platform-browser";
import {UserService} from "@services/user.service";
import {ToastService} from "@components/toasts/toast.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserEntity = {} as UserEntity;
  @ViewChild('name') name!: any;
  @ViewChild('tel') tel!: any;

  constructor(private title: Title, private userService: UserService, private toastService: ToastService) {
    this.title.setTitle('用户信息');
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user
    });
  }

  updateUser() {
    if (this.name.invalid) {
      this.toastService.warn('请填写你的名字')
      return;
    }
    if (this.tel.invalid) {
      this.toastService.warn('请填写你的手机号')
      return;
    }
    this.userService.updateUser(this.user).subscribe(res => {
      this.toastService.success('已更新')
    })
  }
}
