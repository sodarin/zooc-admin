import {Component, Input, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.css']
})
export class CourseModalComponent implements OnInit {

  @Input() item: CourseDetail;

  courseOfferings: CourseOffering[];
  categories: CourseCategory[];

  branches: Branch[];
  lecturers: Lecturer[];


  result: ElaborateCourse;

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
    await this.elaborateCourseService$.getCourseOfferings(this.item.courseId)
      .subscribe(result => this.courseOfferings = result.list);
    await this.elaborateCourseService$.getCategories()
      .subscribe(categoryResult => {
        this.categories = categoryResult;
        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i].name == this.item.categoryName){
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
       })

  }



  submit() {
    if (this.courseForm.value.title == ''|| this.courseForm.value.price == '' || this.selectedValue == '' || this.courseForm.value.address == ''){
      console.log(this.courseForm.value);
      this.message.error('内容不能为空');
    }else{
      this.result = new ElaborateCourse(this.item.courseId, this.loginService$.currentAdmin.enterpriseId, this.item.imgUrl, this.courseForm.value.name,  this.courseForm.value.price, this.courseForm.value.type, this.courseForm.value.statusDesc, this.detailContent);
      this.modal.destroy(this.result);
    }
  }

  closeDialog() {
    this.modal.destroy(this.result);
  }



  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

}
