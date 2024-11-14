import { Routes } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { SurveyListComponent } from './main/survey-list/survey-list.component';
import { BackListComponent } from './back/back-list/back-list.component';
import { SurveyWriteComponent } from './main/survey-write/survey-write.component';
import { AnswerPreviewComponent } from './main/answer-preview/answer-preview.component';
import { FrontChartComponent } from './main/front-chart/front-chart.component';
import { BackCreateComponent } from './back/back-create/back-create.component';
import { BackEditComponent } from './back/back-edit/back-edit.component';
import { BackFeedbackComponent } from './back/back-feedback/back-feedback.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'surveyList', component: SurveyListComponent },
  { path: 'surveyWrite', component: SurveyWriteComponent },
  { path: 'answerPreview', component: AnswerPreviewComponent},
  { path: 'chart', component: FrontChartComponent},
  { path: 'frontChart', component: FrontChartComponent},
  { path: 'backList', component: BackListComponent },
  { path: 'backEdit', component: BackEditComponent },
  { path: 'backCreate', component: BackCreateComponent },
  { path: 'backFeedback', component: BackFeedbackComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

