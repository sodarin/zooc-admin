import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {NzMessageService, NzModalService, UploadFile} from 'ng-zorro-antd';
import {CommentModalComponent} from '../../modal/comment-modal/comment-modal.component';
import {MomentService} from '../../service/moment/moment.service';

@Component({
  selector: 'app-moment-list',
  templateUrl: './moment-list.component.html',
  styleUrls: ['./moment-list.component.css'],
})
export class MomentListComponent implements OnInit {

  @Input() moments;
  @Input() total;
  @Input() pageIndex;
  @Output() editContent = new EventEmitter<any>();
  @Output() pageEvent = new EventEmitter<number>();


  previewImage = '';
  previewVisible = false;

  constructor(private message: NzMessageService, private modalService: NzModalService, private momentsService$: MomentService) { }

  ngOnInit() {
    window.onresize = () => {
      this.placeListItem();
    };
  }



  placeListItem() {
    let listItems;
    // 获得<nz-list-item>标签的NodeList[]
    listItems = document.getElementsByTagName('nz-list-item');
    // 获取第一个朋友圈的位置及大小信息
    // 第一条朋友圈排列在左边
    let pos = listItems[0].getBoundingClientRect();
    let leftX = 0;
    let leftY = pos.height;
    let rightX = pos.width;
    let rightY = 0;
    for (let i = 0; i < listItems.length; i++) {
      // 根据第一个朋友圈的位置及大小，排列第二个朋友圈的位置
      // 第二个朋友圈排列在右边
      if (i == 1) {
        listItems[1].style.left = `${rightX+20}px`;
        listItems[1].style.top = `${rightY}px`;
        pos = listItems[1].getBoundingClientRect();
        rightY += pos.height;
      }
      // 根据左列每条朋友圈的大小累加，得到本条朋友圈的位置
      if (i != 0 && i % 2 == 0){
        listItems[i].style.left = `${leftX}px`;
        listItems[i].style.top = `${leftY+20}px`;
        pos = listItems[i].getBoundingClientRect();
        leftY = pos.height + 20 + leftY;
      }
      // 根据右列每条朋友圈的大小累加，得到本条朋友圈的位置
      if (i != 1 && i % 2 == 1){
        listItems[i].style.left = `${rightX+20}px`;
        listItems[i].style.top = `${rightY+20}px`;
        pos = listItems[i].getBoundingClientRect();
        rightY = pos.height + 20 + rightY;
      }
    }
    // 放置分页组件的位置
    let paginationItem;
    paginationItem = document.getElementsByClassName('ant-list-pagination');
    paginationItem[0].style.top = rightY > leftY ? `${rightY}px`: `${leftY}px`;
    paginationItem[0].style.right =  `20px`;
    //由于通过设置position: absolute来放置朋友圈的位置
    //朋友圈实际脱离了文档流，父元素高度变为0
    //为了清除浮动，给父元素加上高度
    //高度数值由左右两列朋友圈的高度决定
    let parentItem;
    parentItem = document.getElementsByTagName('nz-list');
    parentItem[0].style.height = rightY > leftY ? `${rightY + 50}px`: `${leftY + 50}px`;
    //同理为了消除浮动而设置高度
    let pageItem;
    pageItem = document.getElementsByClassName('content');
    pageItem[0].style.height = rightY > leftY ? `${rightY + 130}px`: `${leftY + 130}px`;
  }

  newPage() {
    this.pageEvent.emit(this.pageIndex);
  }

  checkMsg(item: any) {
    const modal = this.modalService.create({
      nzTitle: '查看评论',
      nzContent: CommentModalComponent,
      nzComponentParams: {
        item: item
      },
      nzFooter: null
    })
  }



  edit(item: any) {
    item.isEditing = !item.isEditing;
  }

  confirm(item: any) {
    if(item.content){
      this.editContent.emit(item);
      item.isEditing = false;
    }else {
      this.message.error('修改内容不能为空');
    }
  }

  cancel(item: any) {
    item.isEditing = false;
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  handleRemove = (file: UploadFile) => {
    console.log(file);
    let imgUrls = [];
    let index = null;
    this.moments.forEach((moment, j) => {
      for (let i = 0; i < moment.fileList.length; i++) {
       if (moment.fileList[i].uid == file.uid) {
         index = j;
         break;
       }
      }
    });
    this.moments[index].fileList = this.moments[index].fileList.filter(picture => picture.uid !== file.uid);
    this.moments[index].fileList.forEach((picture, i) => {
      imgUrls[i] = picture.url;
    });
    this.momentsService$.postPicture(imgUrls, this.moments[index]).subscribe(result => {
      this.message.success('图片删除成功');
    }, error2 => {
      this.message.error(error2.error);
    })
  };


  statusChange(info: {file: UploadFile}, item: any) {
    if (info.file.status == 'done') {
      item.fileList[item.fileList.length-1] = {uid: info.file.uid, name: info.file.name, url: info.file.response.url, status: 'done'};
      let imgUrls = [];
      item.fileList.forEach((picture, i) => {
        if (picture.status == 'done') {
          imgUrls[i] = picture.url;
        }
      });
      this.momentsService$.postPicture(imgUrls, item).subscribe(result => {
        this.message.success('图片上传成功')
      }, error2 => {
        this.message.error(error2.error)
      });
      console.log(info.file.response.url);
    }
  }

}
