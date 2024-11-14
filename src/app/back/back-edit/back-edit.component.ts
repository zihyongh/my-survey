import { EditService } from './../../../@services/edit-service';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { DateService } from '../../../@services/date-service';
import { BackService } from '../../../@services/back-serice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-edit',
  standalone: true,
  imports: [MatButtonModule, MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatCheckboxModule, CommonModule,
    MatIconModule],
  templateUrl: './back-edit.component.html',
  styleUrl: './back-edit.component.scss'
})
export class BackEditComponent {
  @ViewChild('stepper') private stepper!: MatStepper;

  constructor(private dateService: DateService , private backService : BackService , private router : Router
    , private editService: EditService) { }




  // 必填設定
  basicFormGroup1 = new FormGroup({
    title: new FormControl('', Validators.required),        // 設置名稱欄必填
    describe: new FormControl('', Validators.required),     // 設置說明欄必填
    startDate: new FormControl('', Validators.required),    // 設置日期選擇器欄位為必填
    endDate: new FormControl('', Validators.required)       // 另一個日期選擇器欄位為必填
  });

  basicFormGroup2 = new FormGroup({
    questionTitle: new FormControl('', Validators.required),
    questionInput: new FormControl(''),
    questionType: new FormControl('', Validators.required),
    questionMust: new FormControl(false),
  });




  // 下面是問題內容加入
  // 初始化一個陣列來存儲已加入的問題
  questions: any  = {};               // 每一題是一個物件
  questionData: any[] = [];           // 物件放進大陣列裡
  questionId: number = 1;             // 自動生成Id



  // 問題新增
  saveAndNext2() {
    if (this.basicFormGroup2.valid) {
      const question = {
        questionId: this.questionId++,
        ...this.basicFormGroup2.value,
        questionContent:  [] as { code: string; optionName: string }[],           // 明確指定陣列型別
      }

      // questionInput切割
      if (question.questionType == 's' || question.questionType == 'm') {
        question.questionContent = (question.questionInput || '').split(';', 5).map((optionText, index) => ({
          code: `${index + 1}`,                                   // 每個選項的唯一代碼
          optionName: optionText.trim()                           // 去除空白後的選項名稱
        }));
      }

      // console.log(question.questionContent);                 // 確認有沒有分割成功

      this.questions = question;

      // console.log(this.questions);                           // 確認數據是否成功添加
      this.questionData.push(this.questions);                   // 加入大陣列

      this.basicFormGroup2.reset();                             // 重置表單
    }
    console.log(this.questionData)
  }



  // 日期

  endDate!:string
  startMinDate!: string;
  endMinDate!: string;



  ngOnInit() : void {
    // 設定選取日期最小值為當天
    this.startMinDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(), 2));
    // 設定選取日期最小值為當天+天
    this.endMinDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(), 7));

    // 取得選中問卷的資料
    const survey = this.editService.getSurvey();
    if(survey){
      this.loadSurveyData(survey);      // 若有資料就載入
    }

  }


  // 載入問卷資料並填入表單
  loadSurveyData(survey: any) {
    // 將基本問卷資料填入 basicFormGroup1
    this.basicFormGroup1.patchValue({
      title: survey.title,
      describe: survey.describe,
      startDate: survey.startDate,
      endDate: survey.endDate,
    });

    // 將問題資料填入 questionData 陣列
    this.questionData = survey.questionData.map((question: any) => ({
      questionId: question.questionId,
      questionTitle: question.questionTitle,
      questionType: question.questionType,
      questionMust: question.questionMust,
      questionInput: question.questionContent.map((option: { optionName: any }) => option.optionName).join(';'),
      questionContent: question.questionContent,
    }));

  }

  ngAfterViewInit() {
    // 確保 stepper 已初始化，然後將 selectedIndex 設置為 0
    this.stepper.selectedIndex = 0;
  }




  // 第一步驟把答案存到陣列裡面，再存入service

  // 接資料的總物件
  survey: any = {};

  save(){
    const CreateData = { ...this.basicFormGroup1.value , questionData: this.questionData}

    this.survey = CreateData;                                 // 把第一步驟和第二步驟的資料放進物件
    // console.log(this.addedCreate);                         // 確認資料是否成功添加
    this.backService.BackAnswer = this.survey;                // 存入service
  }





  // 刪除問題
  selectedIndexes: number[] = [];

  onCheckboxChange(event: any, index: number): void {
    if (event.checked) {
      // 當勾選時，將該索引加入選取清單
      this.selectedIndexes.push(index);
    } else {
      // 當取消勾選時，從選取清單移除該索引
      this.selectedIndexes = this.selectedIndexes.filter(i => i !== index);
    }
  }

  deleteSelectedQuestions(): void {
    // 根據選取的索引，從 questionData 中刪除
    this.selectedIndexes.sort((a, b) => b - a); // 倒序排列，避免索引變動錯誤
    this.selectedIndexes.forEach(index => {
      this.questionData.splice(index, 1);
    });

    // 清空選取清單
    this.selectedIndexes = [];
    this.save(); // 更新儲存的資料
  }



  // 編輯資料
  // 編輯指定的題目，將資料帶入表單
  editQuestion(index: number): void {
    const questionToEdit = this.questionData[index];
    this.basicFormGroup2.patchValue({
      questionTitle: questionToEdit.questionTitle,
      questionType: questionToEdit.questionType,
      questionMust: questionToEdit.questionMust,
      questionInput: questionToEdit.questionInput
    });
  }

  // 確認頁測試
  test(){
    console.log(this.backService.BackAnswer)
  }
}
