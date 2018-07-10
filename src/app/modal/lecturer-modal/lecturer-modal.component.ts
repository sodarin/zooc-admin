import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lecturer} from '../../model/Lecturer.model';
import {NzMessageService, NzModalRef, UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'app-lecturer-modal',
  templateUrl: './lecturer-modal.component.html',
  styleUrls: ['./lecturer-modal.component.css']
})
export class LecturerModalComponent implements OnInit {

  @Input() item: Lecturer;

  result: Lecturer;
  lecturerForm: FormGroup;

  fileList = [];

  previewImage = '';
  previewVisible = false;

  constructor(private fb: FormBuilder, private modal: NzModalRef, private message: NzMessageService) { }

  ngOnInit() {
    this.lecturerForm = this.fb.group({
      name: [this.item.name, [Validators.required]],
      introduction: [this.item.introduction, [Validators.required]]
    });

    this.fileList = [
      {
        status: 'done',
        url: this.item.photoUrl
      }
    ];
  }

  submit() {
    if (this.lecturerForm.value.name == ''|| this.lecturerForm.value.introduction == ''){
      console.log(this.lecturerForm.value);
      this.message.error('内容不能为空');
    }else{
      this.result = new Lecturer(this.item.lecturerId, this.item.enterpriseId, this.lecturerForm.value.name, this.item.photoUrl, this.lecturerForm.value.introduction);
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
