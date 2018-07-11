import { Component, OnInit } from '@angular/core';
import {Lecturer} from '../../model/Lecturer.model';
import {LecturerService} from '../../service/lecturer/lecturer.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {LecturerModalComponent} from '../../modal/lecturer-modal/lecturer-modal.component';
import {LoginService} from '../../service/login/login.service';

@Component({
  selector: 'app-enterprise-lecturer-info',
  templateUrl: './enterprise-lecturer-info.component.html',
  styleUrls: ['./enterprise-lecturer-info.component.css']
})
export class EnterpriseLecturerInfoComponent implements OnInit {

  lecturers: Lecturer[];

  pageIndex = 1;
  pageSize = 5;
  total = 1;
  loading = true;
  totalPage = 1;

  constructor(private lecturerService$: LecturerService, private message: NzMessageService, private modalService: NzModalService, private loginService$: LoginService) { }

  ngOnInit() {
    this.searchData();
  }

  searchData(reset: boolean = false, pageIndex: number = this.pageIndex) {
    if(reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.lecturerService$.getLecturersById(this.loginService$.currentAdmin.enterpriseId, this.pageSize, pageIndex)
      .subscribe(result => {
        this.loading = false;
        this.total = result.total;
        this.totalPage = this.total / this.pageSize;
        this.pageIndex = pageIndex;
        this.lecturers = result.list
      });
  }

  deleteRow(i: string): void {
    const dataSet = this.lecturers.filter(d => d.lecturerId !== i);
    this.lecturers = dataSet;
  }


  edit(data: any): void {
    const modal = this.modalService.create({
      nzTitle: '修改讲师信息',
      nzContent: LecturerModalComponent,
      nzComponentParams: {
        item: data
      },
      nzFooter: [{
        label: '提交',
        onClick: (componentInstance) => componentInstance.submit()
      }, {
        label: '取消',
        onClick: componentInstance => componentInstance.closeDialog()
      }]
    });
    modal.afterClose.subscribe(result => {
      if (result){
        this.lecturerService$.updateLecturerBasicInfo(result)
          .subscribe(next => {
            this.searchData();
            this.message.success('修改讲师信息成功');
          }, error => {
            this.message.error(error.error);
          })
      }
    });
  }

  addNewData() {
    const item = new Lecturer('', this.loginService$.currentAdmin.enterpriseId, '', 'https://img.moegirl.org/common/e/e0/9694490.jpg',  '');
    const modal = this.modalService.create({
      nzTitle: '新增讲师',
      nzContent: LecturerModalComponent,
      nzComponentParams: {
        item: item
      },
      nzFooter: [{
        label: '提交',
        onClick: (componentInstance) => componentInstance.submit()
      }, {
        label: '取消',
        onClick: componentInstance => componentInstance.closeDialog()
      }]
    });
    modal.afterClose.subscribe(result => {
      if (result){
        this.lecturerService$.createLecturer(this.loginService$.currentAdmin.enterpriseId, result)
          .subscribe(next => {
            this.searchData(false, this.totalPage);
            this.message.success('新增讲师信息成功');
          }, error => {
            this.message.error(error.error);
          })
      }
    });
  }

}
