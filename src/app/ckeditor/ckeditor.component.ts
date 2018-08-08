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
    setTimeout( () => {
      this.detailEmit.emit(this.content);
      }, 500)


    // if(this.content !== this.ckeditorContent){
    //   this.detailEmit.emit(this.content);
    // }
  }


}
