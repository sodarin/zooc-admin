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


  pageIndex = 1;
  pageSize = 5;
  total = 1;
  loading = true;
  totalPage = 1;

  constructor(private loginService$: LoginService, private elaborateCourse$: ElaborateCourseService, private branchService$: BranchService, private message: NzMessageService, private modalService: NzModalService) { }

  ngOnInit() {
    this.searchData();
    this.filterType = [
      {text: 'JAVA', value: 'JAVA'},
      {text: 'HTML', value: 'HTML'},
      {text: 'C++', value: 'C++'}
      ];
  }

  searchData(reset: boolean = false, pageIndex: number = this.pageIndex) {
    // this.elaborateCourse$.getElaborateCourseByEnterpriseId(this.loginService$.currentAdmin.enterpriseId)
    //   .subscribe(result => {
    //     this.courses = result.list;
    //     this.displayData = this.courses;
    //   });
    if(reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.elaborateCourse$.getElaborateCourseByEnterpriseId(this.loginService$.currentAdmin.enterpriseId, this.pageSize, pageIndex)
      .subscribe(result => {
        this.loading = false;
        this.total = result.total;
        this.totalPage = this.total / this.pageSize;
        this.pageIndex = pageIndex;
        this.courses = result.list;
        this.displayData = this.courses;
      });
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
        console.log(result);
        result.courseOfferings.forEach(item => {
          if (item.courseOfferingId == undefined) {
            this.elaborateCourse$.createCourseOfferings(item, result.courseId).subscribe();
          }else{
            this.elaborateCourse$.updateCourseOfferings(item, result.courseId).subscribe();
          }
        });
        this.elaborateCourse$.updateCourseInfo({
          courseId: result.courseId,
          name: result.name,
          detail: result.detail,
          imgUrl: result.imgUrl,
          categoryId: result.categoryId,
          price: result.price
        }).subscribe(result =>{
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
      categoryName: 'C++',
      price: '',
      courseOfferings: [
        {id: 1}
      ]
    };
    const modal = this.modalService.create({
      nzTitle: '新增课程',
      nzContent: CourseModalComponent,
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
        console.log(result);
        this.elaborateCourse$.createNewCourse({
          name: result.name,
          detail: result.detail,
          imgUrl: result.imgUrl,
          categoryId: result.categoryId,
          price: result.price
        }, this.loginService$.currentAdmin.enterpriseId)
          .subscribe(next => {
            result.courseOfferings.forEach(item => this.elaborateCourse$.createCourseOfferings(item, next).subscribe());
            this.searchData(false, this.totalPage);
            this.message.success('新增课程成功');
          }, error2 => {
            this.message.error(error2.error);
          })
      }
      this.courses.push(result);
      this.message.success('添加课程信息成功!');
      this.deleteRow(-1);
    });
  }

}
