import { Component, OnInit } from '@angular/core';
import {CourseDetail, ElaborateCourseService} from '../service/course/elaborate-course/elaborate-course.service';
import {ElaborateCourse} from '../model/ElaborateCourse.model';
import {BranchService} from '../service/branch/branch.service';
import {Branch} from '../model/Branch';
import {CourseType} from '../model/enum/CourseTypeEnum';
import {BranchModalComponent} from '../modal/branch-modal/branch-modal.component';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CourseModalComponent} from '../modal/course-modal/course-modal.component';
import {Lecturer} from '../model/Lecturer.model';
import {LecturerModalComponent} from '../modal/lecturer-modal/lecturer-modal.component';
import {LoginService} from '../service/login/login.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses: CourseDetail[];
  displayData: CourseDetail[];


  searchValue ='';
  filterType = [];

  searchType = [];
  sortMap = {
    title   : null,
    price   :null,
    type    : null,
  };

  sortName = null;
  sortValue = null;

  constructor(private loginService$: LoginService, private elaborateCourse$: ElaborateCourseService, private branchService$: BranchService, private message: NzMessageService, private modalService: NzModalService) { }

  ngOnInit() {
    this.elaborateCourse$.getElaborateCourseByEnterpriseId(this.loginService$.currentAdmin.enterpriseId)
      .subscribe(result => {
        this.courses = result.list;
        this.displayData = this.courses;
      });
    this.filterType = [
      {text: 'JAVA', value: 'JAVA'},
      {text: 'HTML', value: 'HTML'},
      {text: 'C++', value: 'C++'}
      ];
  }

  deleteRow(i: number): void {
    const dataSet = this.courses.filter(d => d.courseId !== i);
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

  filterTypeChange(value: string[]): void {
    this.searchType = value;
    this.searchCourseType();
  }

  // search(): void {
  //   const filterFunc = (item) => {
  //     return (this.searchAddress.length ? this.searchAddress.some(address => item.address.indexOf(address) !== -1) : true) &&
  //       (item.title.indexOf(this.searchValue) !== -1);
  //   };
  //   const data = this.courses.filter(item => filterFunc(item));
  //   this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  // }

  searchCourseType() :void {
    const filterFunc = (item) => {
      return this.searchType.some(type => item.type.indexOf(type) !== -1)
    };
    const data = this.courses.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  }

  edit(data: any): void {
    const modal = this.modalService.create({
      nzTitle: '修改课程',
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
        for(let i = 0; i < this.courses.length; i++){
          if (this.courses[i].courseId == result.courseId){
            console.log(result);
            this.courses[i] = result;
          }
        }
        this.message.success('修改课程信息成功!');
        this.deleteRow(-1);
      }
    });
  }

  addNewData() {
    //const item = new ElaborateCourse(`${this.courses.length+1}`, 1, '', '',  0, CourseType.JAVA, '');
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
        this.courses.push(result);
        this.message.success('添加课程信息成功!');
        this.deleteRow(-1);
      }
    });
  }

}
