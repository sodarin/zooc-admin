import { Component, OnInit } from '@angular/core';
import {PromotionStrategy, PromotionStrategyService} from '../../service/promotion/promotion-strategy.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {CourseDetail} from '../../service/course/elaborate-course/elaborate-course.service';
import {CouponModalComponent} from '../../modal/coupon-modal/coupon-modal/coupon-modal.component';

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
              private message: NzMessageService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.promotionStrategyService$.getPromotionStrategy(1).subscribe( result => {
      this.promotionStrategy = result;
      this.switchValue = this.promotionStrategy.useCoupons;
    });

    this.searchData(1);
  }

  searchData(pageIndex: number = this.pageIndex) {
    this.promotionStrategyService$.getCouponList(1, true, pageIndex, this.pageSize).subscribe( result => {
      this.loading = false;
      this.total = result.total;
      this.totalPage = Math.ceil(this.total / this.pageSize);
      this.displayData = result.list;
    })

  }

  clickSwitch() {
    let updateContent = {useCoupons: this.switchValue};
    this.promotionStrategyService$.updatePromotionStrategy(1, updateContent).subscribe( result => {
      this.message.success('修改成功');
    }, error2 => {
      this.message.error(error2.error);
      this.switchValue = true;
    });
  }

  createCoupon() {
    const modal = this.modalService.create({
      nzTitle: '新增优惠券',
      nzContent: CouponModalComponent,
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
        this.promotionStrategyService$.createCoupon(result, 1)
          .subscribe(next => {
            this.searchData(1);
            this.message.success('新增优惠券成功');
          }, error => {
            this.message.error(error.error);
          })
      }
    })
  }

}
