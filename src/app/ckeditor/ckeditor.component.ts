import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css']
})
export class CkeditorComponent implements OnInit, OnChanges {

  @Input() ckeditorContent;

  @Output() detailEmit = new EventEmitter<string>();


  content;

  config = {
    toolbar:  [
      //加粗     斜体，     下划线      穿过线      下标字        上标字
      ['Bold','Italic','Underline','Strike','Subscript','Superscript'],
      //左对 齐             居中对齐          右对齐          两端对齐
      ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
      //超链接  取消超链接 锚点
      ['Link','Unlink','Anchor'],
      //图片    flash    表格       水平线            表情       特殊字符        分页符
      ['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],
      '/',
      // 样式       格式      字体    字体大小
      ['Styles','Format','Font','FontSize'],
      //文本颜色     背景颜色
      ['TextColor','BGColor'],
    ],
    height: 700
  };

  constructor() {

  }

  ngOnInit() {
    this.content = '';
  }

  ngOnChanges() {
    this.content = this.ckeditorContent;
  }

  changeContent() {
    // setTimeout( () => {
    //   this.detailEmit.emit(this.content);
    //   }, 500)
    this.detailEmit.emit(this.content);

    // if(this.content !== this.ckeditorContent){
    //   this.detailEmit.emit(this.content);
    // }
  }


}
