import { Component, OnInit } from '@angular/core';
import {FreeTrialService} from '../service/course/free-trial/free-trial.service';
import {BranchService} from '../service/branch/branch.service';
import {FreeTrial} from '../model/FreeTrialModel';
import {Branch} from '../model/Branch';
import {CourseType} from '../model/enum/CourseTypeEnum';
import {ElaborateCourse} from '../model/ElaborateCourse.model';
import {CourseModalComponent} from '../modal/course-modal/course-modal.component';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-free-trail',
  templateUrl: './free-trail.component.html',
  styleUrls: ['./free-trail.component.css']
})
export class FreeTrailComponent implements OnInit {

  freeTrials: FreeTrial[];

  data = [];
  displayData = [];

  searchValue ='';
  filterAddress = [];
  filterType = [];

  searchAddress = [];
  searchType = [];

  sortMap = {
    title   : null,
    releaseTime   :null,
    type    : null,
    address: null
  };

  sortName = null;
  sortValue = null;

  constructor(private freeTrial$: FreeTrialService, private branchService$: BranchService, private message: NzMessageService, private modalService: NzModalService) { }

  ngOnInit() {
    this.freeTrials = this.freeTrial$.getFreeTrials();
    for (let i = 0; i < this.freeTrials.length; i++) {
      this.data.push({'freeTrialId': this.freeTrials[i].trialId, 'title': this.freeTrials[i].title, 'url': this.freeTrials[i].url, 'status': this.freeTrials[i].statusType, 'type': this.freeTrials[i].type, 'address': this.branchService$.getBranchByBranchId(this.freeTrials[i].branchId).name, 'releaseTime': this.freeTrials[i].releaseTime})
    }
    this.displayData = [...this.data];
  }

  deleteRow(i: string): void {
    const dataSet = this.data.filter(d => d.freeTrialId !== i);
    this.displayData = dataSet;
  }


  sort(sortName: string, value: boolean): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.sortMap) {
      this.sortMap[ key ] = (key === sortName ? value : null);
    }
    this.search();
  }

  filterAddressChange(value: string[]): void {
    this.searchAddress = value;
    this.search();
  }

  filterTypeChange(value: string[]): void {
    this.searchType = value;
    this.searchCourseType();
  }

  search(): void {
    const filterFunc = (item) => {
      return (this.searchAddress.length ? this.searchAddress.some(address => item.address.indexOf(address) !== -1) : true) &&
        (item.title.indexOf(this.searchValue) !== -1);
    };
    const data = this.data.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  }

  searchCourseType() :void {
    const filterFunc = (item) => {
      return this.searchType.some(type => item.type.indexOf(type) !== -1)
    };
    const data = this.data.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  }



  edit(data: any): void {
    const modal = this.modalService.create({
      nzTitle: '修改分部',
      nzContent: CourseModalComponent,
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
        console.log(result)
        for(let i = 0; i < this.data.length; i++){
          if (this.data[i].trialId == result.trialId){
            console.log(result);
            this.data[i] = result;
          }
        }
        this.message.success('修改课程信息成功!');
        this.deleteRow('-1');
      }
    });
  }

  addNewData() {
    //const item = new ElaborateCourse(`${this.data.length+1}`, 1, '', '',  0, CourseType.JAVA, '');
    const modal = this.modalService.create({
      nzTitle: '新增课程',
      nzContent: CourseModalComponent,
      nzComponentParams: {
        //item: item
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
        this.data.push(result);
        this.message.success('添加课程信息成功!');
        this.deleteRow('-1');
      }
    });
  }

}
