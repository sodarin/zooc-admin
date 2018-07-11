import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {LoginService} from '../service/login/login.service';
import {Admin} from '../model/Admin.model';
import {AdminEnum} from '../model/enum/AdminEnum';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adminEnum = AdminEnum;
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  admin: Admin;

  constructor(private message: NzMessageService, private loginService$: LoginService, private router: Router) { }

  ngOnInit() {
    this.admin = this.loginService$.currentAdmin;
    if (!this.admin){
      this.admin = new Admin(2, 'admin', '1', AdminEnum.ENTERPRISE, 1);
    }
    this.message.create('success', `欢迎回来，${this.admin.username}`);
  }


  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  navToNewPage(url: string) {
    this.router.navigateByUrl(url);
  }

}
