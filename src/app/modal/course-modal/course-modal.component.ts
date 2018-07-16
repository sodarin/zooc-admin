import {
  AfterContentInit, Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ElaborateCourse} from '../../model/ElaborateCourse.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzModalRef, NzModalService, UploadFile} from 'ng-zorro-antd';
import {
  CourseCategory, CourseDetail, CourseOffering,
  ElaborateCourseService
} from '../../service/course/elaborate-course/elaborate-course.service';
import {LoginService} from '../../service/login/login.service';
import {BranchService} from '../../service/branch/branch.service';
import {Branch} from '../../model/Branch';
import {LecturerService} from '../../service/lecturer/lecturer.service';
import {Lecturer} from '../../model/Lecturer.model';
import {CourseOfferingInputComponent} from './course-offering-input/course-offering-input.component';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.css']
})
export class CourseModalComponent implements OnInit {

  @Input() item: CourseDetail;


  courseOfferings: any;
  categories: CourseCategory[];

  branches: Branch[];
  lecturers: Lecturer[];


  result;

  detailContent = '';

  fileList = [];
  courseForm: FormGroup;

  previewImage = '';
  previewVisible = false;

  selectedValue: number;

  constructor(private fb: FormBuilder,
              private message: NzMessageService,
              private modal: NzModalRef,
              private loginService$: LoginService,
              private elaborateCourseService$: ElaborateCourseService,
              private branchService$: BranchService,
              private lecturerService$: LecturerService) { }

   async ngOnInit() {
    this.courseForm = this.fb.group({
      name: [this.item.name, [Validators.required]],
      price: [this.item.price, [Validators.required]],
      type: [this.item.categoryName],
      statusDesc: [this.item.statusDesc, [Validators.required]]
    });
    this.fileList = [
      {
        status: 'done',
        url: this.item.imgUrl
      }
    ];
    this.detailContent = this.item.detail;
    if(this.item.courseId != null) {
      await this.elaborateCourseService$.getCourseOfferings(this.item.courseId)
        .subscribe(result => {
          this.courseOfferings = result.list;
          let i = 1;
          this.courseOfferings.forEach(item => item.id = i++)
        });
      await this.elaborateCourseService$.getCourseDetail(this.item.courseId)
        .subscribe(result => {
          this.detailContent = result.detail;
        })
    }else{
      this.courseOfferings = this.item.courseOfferings;
    }
    await this.elaborateCourseService$.getCategories()
      .subscribe(categoryResult => {
        this.categories = categoryResult;
        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i].name == this.item.categoryName) {
            this.selectedValue = i + 1;
            break;
          }
        }
      });
    await this.branchService$.getBranchById(this.loginService$.currentAdmin.enterpriseId)
       .subscribe(branchResult => {
         this.branches = branchResult.list;
       });
    await this.lecturerService$.getLecturersWithoutPageIndex(this.loginService$.currentAdmin.enterpriseId)
       .subscribe(lecturerResult => {
         this.lecturers = lecturerResult.list;
       });

  }



  submit() {
    this.courseOfferings = this.courseOfferings.filter(item => item.lecturerId !== undefined || item.branchId !== undefined);
    if (this.courseForm.value.name == '' || this.courseForm.value.price == null || this.courseForm.value.type == '' || this.detailContent == '' || this.detailContent == null) {
      this.message.error('内容不能为空');
    }else {
      this.result = {
        courseId: this.item.courseId,
        name: this.courseForm.value.name,
        detail: this.detailContent,
        imgUrl: this.item.imgUrl,
        categoryId: this.courseForm.value.type,
        price: this.courseForm.value.price,
        courseOfferings: this.courseOfferings
      };
      this.modal.destroy(this.result);
    }
  }

  closeDialog() {
    this.modal.destroy(this.result);
  }

  receiveDetail(event: string) {
    this.detailContent = event;
  }



  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  addInput() {
    this.courseOfferings.push(new CourseOffering(this.courseOfferings.length + 1));
    console.log(this.courseOfferings.length)
  }

  deleteInputById(event: any) {
    if (this.courseOfferings[event - 1].courseOfferingId == undefined) {
      this.courseOfferings.splice(event - 1, 1);
      let i = 1;
      this.courseOfferings.forEach(item => item.id = i++);
    }else {
      this.elaborateCourseService$.deleteCourseOffering(this.courseOfferings[event - 1].courseOfferingId)
        .subscribe(result => {
          this.courseOfferings.splice(event - 1, 1);
          let i = 1;
          this.courseOfferings.forEach(item => item.id = i++);
        })
    }

  }

  changeBranch(event: any) {
    console.log(event);
    this.courseOfferings[event.id - 1].branchName = event.value;
    this.branches.forEach(item => {
      if(item.name == event.value){
        this.courseOfferings[event.id - 1].branchId = item.branchId;
      }
    });
  }

  changeLecturer(event: any) {
    console.log(event);
    this.courseOfferings[event.id - 1].lecturerName = event.value;
    this.lecturers.forEach(item => {
      if(item.name == event.value){
        this.courseOfferings[event.id - 1].lecturerId = item.lecturerId;
      }
    });
    console.log(this.courseOfferings);
  }

}
