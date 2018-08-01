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
      }
      if (i != 0 && i % 2 == 0){
        listItems[i].style.left = `${leftX}px`;
        listItems[i].style.top = `${leftY+20}px`;
        pos = listItems[i].getBoundingClientRect();
        leftY = pos.height + 20 + leftY;
      }
      if (i != 1 && i % 2 == 1){
        listItems[i].style.left = `${rightX+20}px`;
        listItems[i].style.top = `${rightY+20}px`;
        pos = listItems[i].getBoundingClientRect();
        rightY = pos.height + 20 + rightY;
      }
    }
    let paginationItem;
    paginationItem = document.getElementsByClassName('ant-list-pagination');
    paginationItem[0].style.top = rightY > leftY ? `${rightY}px`: `${leftY}px`;
    paginationItem[0].style.right =  `20px`;
    let parentItem;
    parentItem = document.getElementsByTagName('nz-list');
    parentItem[0].style.height = rightY > leftY ? `${rightY + 50}px`: `${leftY + 50}px`;
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



  statusChange(info: {file: UploadFile}, item: any) {
    if (info.file.status == 'done') {
      let imgUrls = [];
      imgUrls[0] = info.file.response.url;
      this.momentsService$.postPicture(imgUrls, item).subscribe(result => {
        this.message.success('图片上传成功')
      }, error2 => {
        this.message.error(error2.error)
      });
      console.log(info.file.response.url);
    }
  }

}
