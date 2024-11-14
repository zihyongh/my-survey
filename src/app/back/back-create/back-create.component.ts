import { DateService } from '../../../@services/date-service';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { BackService } from '../../../@services/back-serice';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-back-create',
  standalone: true,
  imports: [MatButtonModule, MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatCheckboxModule, CommonModule,
    MatIconModule, MatSnackBarModule],
  templateUrl: './back-create.component.html',
  styleUrl: './back-create.component.scss'
})



export class BackCreateComponent {

  @ViewChild('stepper') private stepper!: MatStepper;

  constructor(private dateService: DateService , private backService : BackService
  , private router : Router, private snackBar: MatSnackBar) { }


  // 必填設定
  basicFormGroup1 = new FormGroup({
    title: new FormControl('', Validators.required),       // 設置名稱欄必填
    describe: new FormControl('', Validators.required),   // 設置說明欄必填
    startDate: new FormControl('', Validators.required),  // 設置日期選擇器欄位為必填
    endDate: new FormControl('', Validators.required)     // 另一個日期選擇器欄位為必填
  });

  basicFormGroup2 = new FormGroup({
    questionTitle: new FormControl('', Validators.required),
    questionInput: new FormControl(''),
    questionType: new FormControl('', Validators.required),
    questionMust: new FormControl(false),
  });




  // 下面是問題內容加入
  // 初始化一個陣列來存儲已加入的問題
  questionData: any[] = [];           // 每一題是一個物件，確認題目數量之後把題目們(物件)放進大陣列裡
  questionId: number = 1;             // 自動生成Id
  // 下面是接收編輯模式時，正在編輯的問題的index
  editIndex: number | null = null;    // 用來儲存正在編輯項目的index


  // 問題新增
  saveAndNext2() {
    if (this.basicFormGroup2.valid) {
      const question = {
        questionId: this.questionId++,
        ...this.basicFormGroup2.value,
        questionContent:  [] as { code: string; optionName: string }[],           // 明確指定陣列型別
      }


      // questionInput(單選、多選)切割
      if (question.questionType == 's' || question.questionType == 'm') {
        question.questionContent = (question.questionInput || '').split(';', 5).map((optionText, index) => ({
          code: `${index + 1}`,                                   // 每個選項的唯一代碼
          optionName: optionText.trim()                           // 去除空白後的選項名稱
        }));
      }

      // 如果多選題選項小於三個，就會跳出提示框並停止操作
      if(question.questionType == 'm' && question.questionContent.length < 3){
        this.snackBar.open('多選題選項不得小於三個','關閉',{
          duration: 3000
        });
        return;
      }

      // 如果多選題選項小於兩個，就會跳出提示框並停止操作
      if(question.questionType == 's' && question.questionContent.length < 2){
        this.snackBar.open('單選題選項不得小於兩個','關閉',{
          duration: 3000
        });
        return;
      }

      // 如果是填充題，選項的length應該為0
      if(question.questionType == 't' && question.questionInput != ''){
        this.snackBar.open('填充題不須有選項','關閉',{
          duration: 3000
        });
        return;
      }


      // 判斷是否處於編輯模式
      if (this.editIndex != null) {
        this.questionData[this.editIndex] = question;         // 如果是編輯模式，更新該索引的資料
        this.editIndex = null;                                // 清除編輯模式
        } else {
        this.questionData.push(question);                     // 如果不是編輯模式，把問題加入大陣列
      }

      // console.log(question.questionContent);               // 確認有沒有分割成功
      // console.log(this.questions);                         // 確認數據是否成功添加
      // this.questionData.push(question);                    // 加入大陣列

      this.basicFormGroup2.reset();                           // 重置表單
    }
    console.log(this.questionData)
  }



  // 日期

  endDate!:string
  startMinDate!: string;
  endMinDate!: string;


  // 日期轉換
  ngOnInit() : void {

    // 設定選取日期最小值為當天
    this.startMinDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(), 2));
    // 設定選取日期最小值為當天+天
    this.endMinDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(), 7));
  }







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
    this.editIndex = index;     // 設定當前正在編輯的問題的index
  }

  // 確認頁測試
  test(){
    console.log(this.backService.BackAnswer)
  }





}
