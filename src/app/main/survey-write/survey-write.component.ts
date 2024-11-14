import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnswerService } from '../../../@services/answer-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-write',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './survey-write.component.html',
  styleUrl: './survey-write.component.scss'
})

export class SurveyWriteComponent {

  // 問卷假資料
  survey = {
    title: '問卷調查',
    describe: '問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明',
    startDate:'2024-11-01',
    endDate:'2024-12-25',
    questionData: [{
        questionId: 1,
        questionTitle: '你最喜歡的明星?',
        questionType: 's',
        questionMust: true,
        questionContent: [
          { optionName: 'BlackPink', code: 'A' },
          { optionName: 'BTS', code: 'B' },
          { optionName: 'IU', code: 'C' }
        ]
      },
      {
        questionId: 2,
        questionTitle: '最喜歡他的什麼特質?',
        questionType: 't',
        questionMust: true,
        questionContent: [],          // 這裡就算沒有值，也不能空著，不然程式會報錯
      },
      {
        questionId: 3,
        questionTitle: '他在做什麼?',
        questionType: 'm',
        questionMust: false,
        questionContent: [
          { optionName: '唱歌', code: 'A'},
          { optionName: '跳舞', code: 'B'},
          { optionName: '出去玩', code: 'C'}
        ]
      }
    ]
  }




  // form 表單控制
  basicFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl(''),
    age: new FormControl(''),
    questionS: new FormControl('', Validators.required),
    questionT: new FormControl('', Validators.required),
  });

  // 接填寫的資料
  addedAnswer: any = {};          // 建立空物件接答案


  // 多選題選項替換

  selectedOptions: any[] = [];                 // 用於多選題的 ngModel 綁定

  onCheckboxChange(code: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedOptions.push(code);         // 若勾選，則加入選項
    } else {
      this.selectedOptions = this.selectedOptions.filter(item => item !== code);         // 若取消勾選，則移除選項
    }
  }


  // 把答案存到陣列裡面，再存入service
  constructor(private answerService:AnswerService,private router: Router){}

  saveAndPreview() {
    const answerData = { ...this.basicFormGroup.value, questionM: this.selectedOptions };
    const surveyDone = {
      title: this.survey.title,
      describe: this.survey.describe,
      startDate:this.survey.startDate,
      endDate: this.survey.endDate,
      questionData: this.survey.questionData,
      answers: answerData,
    }
    this.addedAnswer = surveyDone;                         // 直接將資料賦值給物件
    // console.log(this.addedAnswer);                      // 確認資料是否成功添加
    this.answerService.setAnswerData(this.addedAnswer);    // 存入service
    this.router.navigate(['answerPreview']);               // 挑轉至預覽頁
  }



  // 回上頁資料回填

  ngOnInit() {
    // 檢查服務中的資料並回填
    const savedData = this.answerService.getAnswerData();
    if (savedData) {
      this.basicFormGroup.patchValue(savedData.answers);          // 回填表單資料
      this.selectedOptions = savedData.answers.questionM || [];   // 設定多選題的值
    }
  }

  // 回上頁
  backToList(){
    this.router.navigateByUrl('/surveyList');
  }





}








