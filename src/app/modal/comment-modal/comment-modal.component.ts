import {Component, Input, OnInit} from '@angular/core';
import {MomentComment, MomentService} from '../../service/moment/moment.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.less']
})
export class CommentModalComponent implements OnInit {

  @Input() item;
  total;
  pageIndex: number = 1;
  targetPage: number = 1;

  data: MomentComment[];

  constructor(private momentService$: MomentService, private message: NzMessageService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.momentService$.getCommentsByMomentId(this.item.momentId, this.targetPage).subscribe(result => {
      this.data = result.list;
      this.total = result.total;
    })
  }

  turnToNewPage() {
    this.targetPage = this.pageIndex;
    this.getData();
  }

  deleteComment(item) {
    this.momentService$.deleteCommentByCommentId(item.momentCommentId).subscribe( result => {
      this.getData();
      this.message.success('删除评论成功');
    }, error2 => {
      this.message.error(error2.error);
    })
  }

}
