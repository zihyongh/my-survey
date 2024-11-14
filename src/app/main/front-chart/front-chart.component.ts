import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDemoComponent } from './chart-demo/chart-demo.component';


@Component({
  selector: 'app-front-chart',
  standalone: true,
  imports: [ChartDemoComponent],
  templateUrl: './front-chart.component.html',
  styleUrl: './front-chart.component.scss'
})
export class FrontChartComponent {

  survey = {
    title: '問卷調查',
    describe: '問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明問卷說明',
    startDate:'2024-11-01',
    endDate:'2024-12-25',
    questionData: [{
      questionId: '1',
      questionType: 's',
      questionTitle: '你最喜歡的明星?',
      labels:['blackpink','BTS','IU'],
      data:[3000,200,100],
      color:['#4679E8','#46E0E8','#763DEB']

      },
      {
      questionId: '2',
      questionType: 't',
      questionTitle: '最喜歡他的什麼特質?',
      labels:[],
      data:['很帥','會唱歌','行走的賀爾蒙'],
      color:['#4679E8','#46E0E8','#763DEB']
      },
      {
      questionId: '3',
      questionType: 'm',
      questionTitle: '他在做什麼?',
      labels:['唱歌','跳舞','出去玩'],
      data:[3000,2000,400],
      color:['#4679E8','#46E0E8','#763DEB']
      }
    ]
  }

  constructor(private router: Router){}



}

