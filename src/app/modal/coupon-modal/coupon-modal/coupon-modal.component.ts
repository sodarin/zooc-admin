import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lecturer} from '../../../model/Lecturer.model';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-coupon-modal',
  templateUrl: './coupon-modal.component.html',
  styleUrls: ['./coupon-modal.component.less']
})
export class CouponModalComponent implements OnInit {

  couponForm: FormGroup;
  result: any;

  constructor(private fb: FormBuilder, private modal: NzModalRef) { }

  ngOnInit() {
    this.couponForm = this.fb.group({
      value: [1],
      threshold: [1]
    })
  }

  submit() {
    this.result = {value: this.couponForm.value.value, threshold: this.couponForm.value.threshold};
    this.modal.destroy(this.result);

  }

  closeDialog() {
    this.modal.destroy();
  }

}
