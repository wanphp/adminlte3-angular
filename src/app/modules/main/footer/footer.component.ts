import {Component, HostBinding} from '@angular/core';
import packageInfo from './../../../../../package.json';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    @HostBinding('class') classes: string = 'main-footer';
    public appVersion = packageInfo.version;
    public currentYear: number = (new Date()).getFullYear();
}
