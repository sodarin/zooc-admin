import {Component, Input, OnInit} from '@angular/core';
import {Moment} from '../../model/Moment.model';
import {NzMessageService, NzModalRef, UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'app-moment-modal',
  templateUrl: './moment-modal.component.html',
  styleUrls: ['./moment-modal.component.css']
})
export class MomentModalComponent implements OnInit {

  @Input() item: Moment;
  result: Moment;
  previewImage = '';
  previewVisible = false;

  fileList;

  content = '';
  constructor(private message: NzMessageService, private modal: NzModalRef) { }

  ngOnInit() {
    this.fileList = [];
  }

  submit() {
    if (this.content == ''){
      this.message.error('内容不能为空');
    }else{
      this.result = new Moment(1, 1, this.content, new Date().getTime());
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
