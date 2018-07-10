import { Component, OnInit } from '@angular/core';
import {Moment} from '../model/Moment.model';
import {MomentService} from '../service/moment/moment.service';
import {CourseModalComponent} from '../modal/course-modal/course-modal.component';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {MomentModalComponent} from '../modal/moment-modal/moment-modal.component';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {


  moments: Moment[];
  constructor(private momentService$: MomentService, private modalService: NzModalService, private message: NzMessageService) { }

  ngOnInit() {
    this.moments = this.momentService$.getMoments();
  }

  addNewMoment() {
    const item = new Moment(`${this.moments.length+1}`, '1', '', '',  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 0);
    const modal = this.modalService.create({
      nzTitle: '新增朋友圈',
      nzContent: MomentModalComponent,
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
        this.moments.push(result);
        this.message.success('添加朋友圈成功!');
      }
    });
  }

}
