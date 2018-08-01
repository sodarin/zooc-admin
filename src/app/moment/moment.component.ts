import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Moment} from '../model/Moment.model';
import {MomentService} from '../service/moment/moment.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {MomentModalComponent} from '../modal/moment-modal/moment-modal.component';
import {MomentListComponent} from './moment-list/moment-list.component';
@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit, AfterViewChecked {


  moments: Moment[] = [];
  previewImage = '';
  previewVisible = false;
  uid: number = 1;
  pictureList = [];
  targetPage = 1;
  totalSize: number = 9;



  @ViewChild(MomentListComponent) momentList: MomentListComponent;

  constructor(private momentService$: MomentService, private modalService: NzModalService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.getMoments(1)
  }

  ngAfterViewChecked() {
    this.momentList.placeListItem();
  }




  getMoments(targetPage: number) {
    this.momentService$.getAllMoments(1, true, targetPage, 6).subscribe( result => {
      this.totalSize = result.total;
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
      data.momentId = result;
      if (data.fileList !== null && data.fileList.length > 0) {
        let imgUrls = [];
        data.fileList.forEach(file => {
          imgUrls.push(file.response.url)
        });
        this.momentService$.postPicture(imgUrls, data).subscribe( next => {
          console.log(next);
        }, error2 => {
          this.message.error(error2.error);
        });
      }
      this.getMoments(1);
      this.targetPage = 1;
      this.message.success('添加朋友圈成功');
    }, error2 => {
      this.message.error(error2.error);
    })
  }

  turnToNewPage(event) {
    this.getMoments(event);
    this.targetPage = event;
  }



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

  updateContent(event) {
    this.momentService$.updateMoment(event).subscribe(result => {
      this.message.success('修改内容成功');
    }, error2 => {
      this.message.error(error2.error);
    })
  }

}
