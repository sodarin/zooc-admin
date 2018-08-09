import {Component, Input, OnInit} from '@angular/core';
import {FreeTrialService, TrialDetail} from '../../service/course/free-trial/free-trial.service';
import {CourseCategory, ElaborateCourseService} from '../../service/course/elaborate-course/elaborate-course.service';
import {Lecturer} from '../../model/Lecturer.model';
import {Branch} from '../../model/Branch';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BranchService} from '../../service/branch/branch.service';
import {LecturerService} from '../../service/lecturer/lecturer.service';
import {NzMessageService, NzModalRef, UploadFile} from 'ng-zorro-antd';
import {LoginService} from '../../service/login/login.service';
import {Status} from 'tslint/lib/runner';
import {StatusType} from '../../model/enum/StatusTypeEnum';

@Component({
  selector: 'app-trial-modal',
  templateUrl: './trial-modal.component.html',
  styleUrls: ['./trial-modal.component.less']
})
export class TrialModalComponent implements OnInit {

  @Input() item: TrialDetail;

  categories: CourseCategory[];

  branches: Branch[];
  lecturers: Lecturer[];
  branchId;
  lecturerId;

  result;

  detailContent = '';

  fileList = [];
  trialForm: FormGroup;

  previewImage = '';
  previewVisible = false;

  selectedStatus: StatusType;
  selectedType: number;


  constructor(private fb: FormBuilder,
              private message: NzMessageService,
              private modal: NzModalRef,
              private loginService$: LoginService,
              private freeTrialService$: FreeTrialService,
              private branchService$: BranchService,
              private lecturerService$: LecturerService) { }

  async ngOnInit() {
    this.trialForm = this.fb.group( {
      name: [this.item.name, [Validators.required]],
      status: [this.item.status],
      type: [this.item.categoryId],
      branchNameControl: [this.item.branchName],
      lecturerControl: [this.item.lecturerName],
      datePicker: [new Date(this.item.releaseTime)]
    });
    if (this.item.imgUrl == ''){
      this.fileList = [];
    } else {
      this.fileList = [
        {
          status: 'done',
          url: this.item.imgUrl
        }
      ]
    }

    if(this.item.trialId != null) {
      await this.freeTrialService$.getFreeTrialDetail(this.item.trialId)
        .subscribe(result => {
          this.detailContent = result.detail;
          this.selectedStatus = this.item.status;
        })
    }else{
      this.detailContent = '';
      this.selectedStatus = this.item.status;
    }
    await this.freeTrialService$.getCategories()
      .subscribe(categoryResult => {
        this.categories = categoryResult;
        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i].name == this.item.categoryName) {
            this.selectedType = i + 1;
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
    if (this.trialForm.value.name == '' || this.trialForm.value.branchNameControl == '' || this.trialForm.value.lecturerControl == '' || this.detailContent == '' || this.fileList.length == 0) {
      this.message.error("信息不能为空");
    }else {
      this.branches.forEach(item => {
        if (item.name == this.trialForm.value.branchNameControl){
          this.branchId = item.branchId;
        }
      });
      this.lecturers.forEach(item => {
        if (item.name == this.trialForm.value.lecturerControl) {
          this.lecturerId = item.lecturerId;
        }
      });
      this.result = {
        trialId: this.item.trialId,
        name: this.trialForm.value.name,
        detail: this.detailContent,
        imgUrl: this.fileList[0].url,
        categoryId: this.trialForm.value.type,
        branchId: this.branchId,
        lecturerId: this.lecturerId,
        releaseTime: this.trialForm.value.datePicker.getTime(),
        status: this.trialForm.value.status
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

  handleRemove = (file: UploadFile) => {
    this.fileList = this.fileList.filter(photo => photo.status == 'done');
  };

  handleChange(info: {file: UploadFile}) {
    if (info.file.status == 'done') {
      if (this.fileList.length > 1) {
        this.fileList[1] = {uid: info.file.uid, status: 'done', url: info.file.response.url, name: info.file.name};
        this.fileList.splice(0, 1);
        console.log(this.fileList);
      }
    }
  }

}
