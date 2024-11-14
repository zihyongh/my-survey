import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AnswerService {

 answerData: any = null;

 constructor(){};

 // 存入答案
 setAnswerData(data: any) {
    this.answerData = data;
  }

  // 獲取答案
  getAnswerData() {
    return this.answerData;
  }

  // 清除答案
  clearAnswerData() {
    this.answerData = null;
  }


}
