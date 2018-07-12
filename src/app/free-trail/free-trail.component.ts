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
  styleUrls: ['./free-trail.component.css']
})
export class FreeTrailComponent implements OnInit {

  freeTrials: TrialDetail[];

  data = [];
  displayData = [];

  searchValue ='';
  filterType = [];

  searchType = [];

  sortMap = {
    name   : null,
    releaseTime   :null,
    type    : null,
  };

  pageIndex = 1;
  pageSize = 5;
  total = 1;
  loading = true;
  totalPage = 1;

  sortName = null;
  sortValue = null;

  constructor(private loginService$: LoginService, private freeTrial$: FreeTrialService, private branchService$: BranchService, private message: NzMessageService, private modalService: NzModalService) { }

  ngOnInit() {
    this.searchData()
  }

  searchData(reset: boolean = false, pageIndex: number = this.pageIndex) {
    if(reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    console.log(this.loginService$.currentAdmin.enterpriseId);
    this.freeTrial$.getFreeTrialByEnterpriseId(this.loginService$.currentAdmin.enterpriseId, this.pageSize, pageIndex)
      .subscribe(result => {
        this.loading = false;
        this.total = result.total;
        this.totalPage = Math.ceil(this.total / this.pageSize);
        this.pageIndex = pageIndex;
        this.freeTrials = result.list;
        this.displayData = this.freeTrials;
      });
  }

  deleteRow(i: string): void {
    const dataSet = this.data.filter(d => d.freeTrialId !== i);
    this.displayData = dataSet;
  }


  // sort(sortName: string, value: boolean): void {
  //   this.sortName = sortName;
  //   this.sortValue = value;
  //   for (const key in this.sortMap) {
  //     this.sortMap[ key ] = (key === sortName ? value : null);
  //   }
  //   this.search();
  // }

  // filterAddressChange(value: string[]): void {
  //   this.searchAddress = value;
  //   this.search();
  // }

  // filterTypeChange(value: string[]): void {
  //   this.searchType = value;
  //   this.searchCourseType();
  // }

  // search(): void {
  //   const filterFunc = (item) => {
  //     return (this.searchAddress.length ? this.searchAddress.some(address => item.address.indexOf(address) !== -1) : true) &&
  //       (item.title.indexOf(this.searchValue) !== -1);
  //   };
  //   const data = this.data.filter(item => filterFunc(item));
  //   this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  // }

  // searchCourseType() :void {
  //   const filterFunc = (item) => {
  //     return this.searchType.some(type => item.type.indexOf(type) !== -1)
  //   };
  //   const data = this.data.filter(item => filterFunc(item));
  //   this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  // }



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
