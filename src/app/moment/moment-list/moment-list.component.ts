import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'app-moment-list',
  templateUrl: './moment-list.component.html',
  styleUrls: ['./moment-list.component.css']
})
export class MomentListComponent implements OnInit {

  @Input() item;
  isEditing = false;

  fileList = [
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ];
  previewImage = '';
  previewVisible = false;

  constructor(private message: NzMessageService) { }

  ngOnInit() {
  }

  edit() {
    this.isEditing = !this.isEditing;
  }

  confirm(item: any) {
    if(item.content){
      this.message.success('修改成功');
      this.isEditing = false;
    }else {
      this.message.error('修改内容不能为空');
    }
  }

  cancel(item: any) {
    this.isEditing = false;
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

}
