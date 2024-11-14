import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TestDataService {

private testSurvey = {
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

getTestSurvey(){
  return this.testSurvey;
}

}
