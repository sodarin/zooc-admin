import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, NzMessageService, zh_CN} from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginService} from './service/login/login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnterpriseBasicInfoComponent } from './enterprise/enterprise-basic-info/enterprise-basic-info.component';
import { EnterpriseBranchInfoComponent } from './enterprise/enterprise-branch-info/enterprise-branch-info.component';
import { EnterpriseLecturerInfoComponent } from './enterprise/enterprise-lecturer-info/enterprise-lecturer-info.component';
import { CkeditorComponent } from './ckeditor/ckeditor.component';
import {CKEditorModule} from 'ng2-ckeditor';
import {EnterpriseService} from './service/enterprise/enterprise.service';
import {BranchService} from './service/branch/branch.service';
import { BranchModalComponent } from './modal/branch-modal/branch-modal.component';
import {LecturerService} from './service/lecturer/lecturer.service';
import { LecturerModalComponent } from './modal/lecturer-modal/lecturer-modal.component';
import { CourseComponent } from './course/course.component';
import { FreeTrailComponent } from './free-trail/free-trail.component';
import {ElaborateCourseService} from './service/course/elaborate-course/elaborate-course.service';
import {FreeTrialService} from './service/course/free-trial/free-trial.service';
import { CourseModalComponent } from './modal/course-modal/course-modal.component';
import { OrderComponent } from './order/order.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RefundComponent } from './refund/refund.component';
import { MomentComponent } from './moment/moment.component';
import { MomentListComponent } from './moment/moment-list/moment-list.component';
import { MomentModalComponent } from './modal/moment-modal/moment-modal.component';
import {NgxAmapModule} from 'ngx-amap';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    EnterpriseBasicInfoComponent,
    EnterpriseBranchInfoComponent,
    EnterpriseLecturerInfoComponent,
    CkeditorComponent,
    BranchModalComponent,
    LecturerModalComponent,
    CourseComponent,
    FreeTrailComponent,
    CourseModalComponent,
    OrderComponent,
    ReservationComponent,
    RefundComponent,
    MomentComponent,
    MomentListComponent,
    MomentModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    NgxAmapModule.forRoot({
      apiKey: '5063258ea73f5e445d4e4203b4885fe0'
    })
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    LoginService,
    NzMessageService,
    EnterpriseService,
    BranchService,
    LecturerService,
    ElaborateCourseService,
    FreeTrialService
  ],
  entryComponents: [
    BranchModalComponent,
    LecturerModalComponent,
    CourseModalComponent,
    MomentModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
