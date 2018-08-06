import { Component, OnInit } from '@angular/core';
import {PromotionStrategy, PromotionStrategyService} from '../../service/promotion/promotion-strategy.service';
import {NzMessageService} from 'ng-zorro-antd';
import {CourseDetail} from '../../service/course/elaborate-course/elaborate-course.service';

@Component({
  selector: 'app-coupon-manage',
  templateUrl: './coupon-manage.component.html',
  styleUrls: ['./coupon-manage.component.less']
})
export class CouponManageComponent implements OnInit {

  promotionStrategy: PromotionStrategy;
  switchValue: boolean = true;

  displayData: CourseDetail[];

  pageIndex = 1;
  pageSize = 5;
  total = 1;
  loading = true;
  totalPage = 1;



  constructor(private promotionStrategyService$: PromotionStrategyService,
              private message: NzMessageService) { }

  ngOnInit() {
    this.promotionStrategyService$.getPromotionStrategy(1).subscribe( result => {
      this.promotionStrategy = result;
      this.switchValue = this.promotionStrategy.useCoupons;
    });

    this.promotionStrategyService$.getCouponList(1, true, this.pageIndex, this.pageSize).subscribe( result => {
      this.displayData = result.list;
    })

  }

  clickSwitch() {
    let updateContent = {useCoupons: this.switchValue};
    this.promotionStrategyService$.updatePromotionStrategy(1, updateContent).subscribe( result => {
      this.message.success('修改成功');
    }, error2 => {
      this.message.error(error2.error);
    });
  }

}
