import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnswerService } from '../../../@services/answer-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-preview',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule,],
  templateUrl: './answer-preview.component.html',
  styleUrl: './answer-preview.component.scss'
})
export class AnswerPreviewComponent {

  confirmAns: any = {};

  constructor(private answerService:AnswerService,private router: Router){}

  ngOnInit():void{
    this.confirmAns = this.answerService.answerData;
    console.log(this.confirmAns);
  }

  backToSurvey() {
    this.router.navigate(['/surveyWrite']);             // 返回問卷填寫頁
  }

  saveToList(){
    this.answerService.clearAnswerData();               // 最後儲存時要把serice裡面的東西清掉
    this.router.navigate(['/surveyList']);              // 返回問卷列表
  }
}
