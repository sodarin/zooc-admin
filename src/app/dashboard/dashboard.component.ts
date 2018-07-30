import {AfterContentInit, Component, OnInit} from '@angular/core';
import {CourseCategory, CourseDetail, ElaborateCourseService} from '../service/course/elaborate-course/elaborate-course.service';
import {FreeTrialService, TrialDetail} from '../service/course/free-trial/free-trial.service';
import {FreeTrial} from '../model/FreeTrialModel';
import {OrderService} from '../service/order/order.service';
import {ReservationService} from '../service/reservation/reservation.service';
declare var echarts: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  date = new Date();

  courseChart: any;
  trialChart: any;
  totalCourse: number = 0;
  lastMonthTotalCourse: number = 5;
  totalOrder: number = 0;
  lastMonthTotalOrder: number = 5;
  totalReservation: number = 0;
  lastMonthTotalReservation: number = 5;
  categories: CourseCategory[];
  elaborateCourse: CourseDetail[];
  freeTrials: TrialDetail[];
  courseCategoryList = [];
  trialCategoryList = [];

  constructor(
    private elaborateCourseService$: ElaborateCourseService,
    private trialService$: FreeTrialService,
    private orderService$: OrderService,
    private reservationService$: ReservationService) { }

  ngOnInit() {
    this.elaborateCourseService$.getCategories().subscribe(result => {
      this.categories = result;
      this.elaborateCourseService$.getAllElaborateCourse(1).subscribe(result => {
        this.elaborateCourse = result.list;
        this.categories.forEach((item) => {
          let courses = this.elaborateCourse.filter(course => course.categoryId == item.categoryId);
          if (courses.length != 0) {
            this.courseCategoryList.push({value: courses.length, name: item.name});
          }
          this.totalCourse += courses.length;
        });
        this.courseChart = echarts.init(document.getElementById('courseChart'));
        const courseOptions = {
          title: {
            text: '课程类别比例',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.categories
          },
          series : [
            {
              name: '课程种类',
              type: 'pie',
              radius : '65%',
              center: ['50%', '60%'],
              data: this.courseCategoryList,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        this.courseChart.setOption(courseOptions);
      });
      this.trialService$.getAllFreeTrials(1).subscribe(result => {
        this.freeTrials = result.list;
        this.categories.forEach((item) => {
          let trial = this.freeTrials.filter(course => course.categoryId == item.categoryId);
          if (trial.length != 0) {
            this.trialCategoryList.push({value: trial.length, name: item.name});
          }
          this.totalCourse += trial.length;
        });
        this.trialChart = echarts.init(document.getElementById('trialChart'));
        const trialOptions = {
          title: {
            text: '试听课程比例',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.categories
          },
          series : [
            {
              name: '课程种类',
              type: 'pie',
              radius : '65%',
              center: ['50%', '60%'],
              data: this.trialCategoryList,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        this.trialChart.setOption(trialOptions);
      })
    });
    window.onresize = () => {
      this.courseChart.resize();
      this.trialChart.resize();
    };

    this.orderService$.getOrdersByStatus(1, 'AVAILABLE').subscribe( result => {
      this.totalOrder = result.list.length;
    });

    this.reservationService$.getReservationsByStatus(1, 'AVAILABLE').subscribe( result => {
      this.totalReservation = result.list.length;
    })

  }



  onValueChange(value: Date): void {
    this.date = value;
  }

}
