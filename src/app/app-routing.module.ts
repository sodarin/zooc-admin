import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EnterpriseBasicInfoComponent} from './enterprise/enterprise-basic-info/enterprise-basic-info.component';
import {EnterpriseBranchInfoComponent} from './enterprise/enterprise-branch-info/enterprise-branch-info.component';
import {EnterpriseLecturerInfoComponent} from './enterprise/enterprise-lecturer-info/enterprise-lecturer-info.component';
import {CourseComponent} from './course/course.component';
import {FreeTrailComponent} from './free-trail/free-trail.component';
import {OrderComponent} from './order/order.component';
import {ReservationComponent} from './reservation/reservation.component';
import {RefundComponent} from './refund/refund.component';
import {MomentComponent} from './moment/moment.component';
import {CouponManageComponent} from './promotion-strategy/coupon-manage/coupon-manage.component';
import {PointManageComponent} from './promotion-strategy/point-manage/point-manage.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, children: [
      {path: '', component: DashboardComponent},
      {path: 'enterprise-basic-info', component: EnterpriseBasicInfoComponent},
      {path: 'enterprise-branch-info', component: EnterpriseBranchInfoComponent},
      {path: 'enterprise-lecturer-info', component: EnterpriseLecturerInfoComponent},
      {path: 'course', component: CourseComponent},
      {path: 'free-trial', component: FreeTrailComponent},
      {path: 'order', component: OrderComponent},
      {path: 'reservation', component: ReservationComponent},
      {path: 'refund', component: RefundComponent},
      {path: 'moment', component: MomentComponent},
      {path: 'coupon', component: CouponManageComponent},
      {path: 'point', component: PointManageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
