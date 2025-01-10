import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {UserModel} from '../../model/user.model';
import {UserService} from '../../services/user.service';
import {ToastService} from '../../components/toasts/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserModel = {} as UserModel;
  @ViewChild('name') name!: any;
  @ViewChild('tel') tel!: any;

  constructor(private title: Title, private userService: UserService, private toastService: ToastService) {
    this.title.setTitle('用户信息');
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user: any) => {
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
    this.userService.updateUser(this.user).subscribe(() => {
      this.toastService.success('已更新')
    })
  }
}
