import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-course-offering-input',
  templateUrl: './course-offering-input.component.html',
  styleUrls: ['./course-offering-input.component.css']
})
export class CourseOfferingInputComponent implements OnInit {

  @Input() courseOffering;
  @Input() branches;
  @Input() lecturers;

  @Output() deleteEmit = new EventEmitter<string>();
  @Output() branchEmit = new EventEmitter<any>();
  @Output() lecturerEmit = new EventEmitter<any>();

  branchNameControl: FormControl = new FormControl();
  lecturerControl: FormControl = new FormControl();



  constructor() { }

  ngOnInit() {
    this.branchNameControl.valueChanges.subscribe(value => {
      this.branchEmit.emit({'value': value, 'id': this.courseOffering.id})
    });
    this.lecturerControl.valueChanges.subscribe(value => {
      this.lecturerEmit.emit({'value': value, 'id': this.courseOffering.id})
    })
  }


  deleteInput(id: string) {
    this.deleteEmit.emit(id);
  }

}
