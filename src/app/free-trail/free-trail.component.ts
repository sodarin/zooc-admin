import { Component, OnInit } from '@angular/core';
import {FreeTrialService, TrialDetail} from '../service/course/free-trial/free-trial.service';
import {BranchService} from '../service/branch/branch.service';
import {FreeTrial} from '../model/FreeTrialModel';
import {Branch} from '../model/Branch';
import {CourseType} from '../model/enum/CourseTypeEnum';
import {ElaborateCourse} from '../model/ElaborateCourse.model';
import {CourseModalComponent} from '../modal/course-modal/course-modal.component';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {LoginService} from '../service/login/login.service';
import {TrialModalComponent} from '../modal/trial-modal/trial-modal.component';
import {StatusType} from '../model/enum/StatusTypeEnum';

@Component({
  selector: 'app-free-trail',
  templateUrl: './free-trail.component.html',
  styleUrls: ['./free-trail.component.less']
})
export class FreeTrailComponent implements OnInit {

  freeTrials: TrialDetail[];

  data = [];
  displayData = [];

  searchCourseName = '';
  searchLecturerName = '';
  typeValue = '';
  addressValue = '';
  filterType = [];
  filterAddress = [];

  filterConditions = {'name': this.searchCourseName, 'branchId': this.addressValue, 'categoryId': this.typeValue, 'lecturerName': this.searchLecturerName};


  sortMap = {
    releaseTime: null,
  };

  pageIndex = 1;
  pageSize = 5;
  total = 1;
  loading = true;
  totalPage = 1;



  constructor(private loginService$: LoginService,
              private freeTrial$: FreeTrialService,
              private branchService$: BranchService,
              private message: NzMessageService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.searchData();
    this.freeTrial$.getCategories()
      .subscribe(result => {
        let categories = [];
        result.forEach(item => categories.push({'text': item.name, 'value': item.categoryId}));
        this.filterType = categories;
      });
    this.branchService$.getBranchById(this.loginService$.currentAdmin.enterpriseId)
      .subscribe(result => {
        let branches = [];
        result.list.forEach(item => branches.push({'text': item.name, 'value': item.branchId}));
        this.filterAddress = branches;
      })
  }

  searchData(reset: boolean = false, pageIndex: number = this.pageIndex) {
    if(reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    console.log(this.loginService$.currentAdmin.enterpriseId);
    this.freeTrial$.getFreeTrialByEnterpriseId(this.loginService$.currentAdmin.enterpriseId, this.pageSize, pageIndex, this.filterConditions)
      .subscribe(result => {
        this.loading = false;
        this.total = result.total;
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.pageIndex = pageIndex;
        this.freeTrials = result.list;
        this.displayData = this.freeTrials;
      });
  }

  filterData() {
    this.freeTrial$.getFreeTrialByEnterpriseId(this.loginService$.currentAdmin.enterpriseId, this.pageSize, 1, this.filterConditions)
      .subscribe(result => {
        this.loading = false;
        this.total = result.total;
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.pageIndex = 1;
        this.freeTrials = result.list? result.list: [];
        this.displayData = this.freeTrials;
      })
  }

  searchCourseByName() {
    this.filterConditions.name = this.searchCourseName;
    this.filterData();
  }

  searchLecturerByName() {
    this.filterConditions.lecturerName = this.searchLecturerName;
    this.filterData();
  }

  filterTypeChange(value: any) {
    this.typeValue = value? value: '';
    this.filterConditions.categoryId = this.typeValue;
    this.filterData();
  }

  filterAddressChange(value: any) {
    this.addressValue = value? value: '';
    this.filterConditions.branchId = this.addressValue;
    this.filterData();
  }

  deleteRow(i: string): void {
    const dataSet = this.data.filter(d => d.freeTrialId !== i);
    this.displayData = dataSet;
  }




  edit(data: any): void {
    const modal = this.modalService.create({
      nzTitle: '修改试听课程信息',
      nzContent: TrialModalComponent,
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
        console.log(result);
        this.freeTrial$.updateFreeTrial(result)
          .subscribe(result => {
            this.searchData();
            this.message.success('修改课程信息成功');
          }, error2 => {
            this.message.error(error2.error);
          })
      }
    });
  }

  addNewData() {
    const item = {
      name: '',
      detail: '',
      imgUrl: 'https://img.moegirl.org/common/e/e0/9694490.jpg',
      categoryId: 1,
      status: 'AVAILABLE',
      branchName: '',
      lecturerName: '',
      releaseTime: new Date().getTime()
    };
    const modal = this.modalService.create({
      nzTitle: '新增试听课程课程',
      nzContent: TrialModalComponent,
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
        this.freeTrial$.createFreeTrial(result)
          .subscribe(result => {
            this.searchData(false, this.totalPage);
            this.message.success('新增课程信息成功');
          }, error2 => {
            this.message.error(error2.error)
          })
      }
    });
  }

}
