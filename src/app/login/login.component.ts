import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../service/login/login.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private message: NzMessageService, private fb: FormBuilder, private loginService$: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      id: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.loginService$.getAdmin(this.loginForm.value.id, this.loginForm.value.password)
      .subscribe(
        result => {
          console.log(result);
          this.loginService$.currentAdmin = result;
          this.router.navigateByUrl('/home');
        },
        error => {
          alert(error.error);
        }
      );
  }

}
