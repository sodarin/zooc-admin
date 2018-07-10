import {Component, Input, OnInit} from '@angular/core';
import {Moment} from '../../model/Moment.model';
import {NzMessageService, NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-moment-modal',
  templateUrl: './moment-modal.component.html',
  styleUrls: ['./moment-modal.component.css']
})
export class MomentModalComponent implements OnInit {

  @Input() item: Moment;
  result: Moment;

  fileList;

  content = '';
  constructor(private message: NzMessageService, private modal: NzModalRef) { }

  ngOnInit() {
    this.fileList = [
      {
        status: 'done',
        url: this.item.imgUrl
      }
    ];
  }

  submit() {
    if (this.content == ''){
      this.message.error('内容不能为空');
    }else{
      this.result = new Moment(this.item.momentId, '1', this.content, '2018-7-12 11:12:20', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 0);
      this.modal.destroy(this.result);
    }
  }

  closeDialog() {
    this.modal.destroy(this.result);
  }

}
