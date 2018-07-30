import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {Moment} from '../model/Moment.model';
import {MomentService} from '../service/moment/moment.service';
import {CourseModalComponent} from '../modal/course-modal/course-modal.component';
import {NzMessageService, NzModalService, UploadFile} from 'ng-zorro-antd';
import {MomentModalComponent} from '../modal/moment-modal/moment-modal.component';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {


  moments: Moment[];
  previewImage = '';
  previewVisible = false;
  uid: number = 1;
  pictureList = [];

  constructor(private momentService$: MomentService, private modalService: NzModalService, private message: NzMessageService) {
    window.onload = () => {
      this.placeListItem();
    }
  }

  ngOnInit() {
    this.getMoments();
    window.onresize = () => {
      this.placeListItem();
    };
  }

  placeListItem() {
    let listItems;
    listItems = document.getElementsByTagName('nz-list-item');
    let pos = listItems[0].getBoundingClientRect();
    let leftX = 0;
    let leftY = pos.height;
    let rightX = pos.width;
    let rightY = 0;
    for (let i = 0; i < listItems.length; i++) {
      if (i == 1) {
        listItems[1].style.left = `${rightX+20}px`;
        listItems[1].style.top = `${rightY}px`;
        pos = listItems[1].getBoundingClientRect();
        rightY += pos.height;
        console.log(rightY)
      }
      if (i != 0 && i % 2 == 0){
        listItems[i].style.left = `${leftX}px`;
        listItems[i].style.top = `${leftY+20}px`;
        pos = listItems[i].getBoundingClientRect();
        leftY = pos.height + 20 + leftY;
      }
      if (i != 1 && i % 2 == 1){
        listItems[i].style.left = `${rightX+20}px`;
        console.log(rightY);
        listItems[i].style.top = `${rightY+20}px`;
        pos = listItems[i].getBoundingClientRect();
        rightY = pos.height + 20 + rightY;
      }
    }
    let parentItem;
    parentItem = document.getElementsByTagName('nz-list');
    parentItem[0].style.height = rightY > leftY ? `${rightY + 20}px`: `${leftY + 20}px`;

  }

  getMoments() {
    this.momentService$.getAllMoments(1).subscribe( result => {
      this.moments = result.list;
      this.moments.forEach(moment => {
        moment.fileList = [];
        this.momentService$.getMomentImgsByMomentId(moment.momentId).subscribe(result => {
          moment.imgList = result;
          moment.imgList.forEach(img => {
            this.pictureList.push({uid: this.uid, name: `${this.uid++}.png`, status: 'done', url: img.imgUrl})
          });
          moment.fileList = [...this.pictureList];
          this.pictureList = [];
          console.log(moment.fileList)
        });
        this.momentService$.getTotalLikeAmountByMomentId(moment.momentId).subscribe( result => {
          moment.likeNum = result;
        })
      });
    });

  }

  createMoment(data: any) {
    this.momentService$.createMoment(data).subscribe(result => {
      this.getMoments();
      this.message.success('添加朋友圈成功');
    }, error2 => {
      this.message.error(error2.error);
    })
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  addNewMoment() {
    const modal = this.modalService.create({
      nzTitle: '新增朋友圈',
      nzContent: MomentModalComponent,
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
        this.createMoment(result);
      }
    });
  }

}
