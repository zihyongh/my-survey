import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js/auto'

@Component({
  selector: 'app-chart-demo',
  standalone: true,
  imports: [],
  templateUrl: './chart-demo.component.html',
  styleUrl: './chart-demo.component.scss'
})
export class ChartDemoComponent {

  @Input() dataId!: string;
  @Input() questData!: any;

  // 因為需要抓取頁面標籤所以需要使用ngAfterViewInit這個生命週期
  // 這個生命週期為當頁面渲染結束後才會觸發
  ngAfterViewInit(): void {
    this.showPie();
  }

  showPie() {
    // 獲取 canvas 元素
    // 使用題目ID當作canvas的id來分類(因為圖表有多筆，要用id去抓)
    // 否則ID重複程式會失敗
    let ctx = document.getElementById(this.dataId) as HTMLCanvasElement;

    // 設定數據
    let data = {
      // x軸文字
      labels: this.questData.labels,
      datasets: [
        {
          // 數據
          data: this.questData.data,
          // 線與邊框顏色
          backgroundColor: this.questData.color,
          // 設定hover的偏移量，滑鼠移上去表單會偏移，方便觀看選擇的項目
          hoverOffset: 10,
        },
      ],
    };

    if(ctx){
    // 創建圖表
      let chart = new Chart(ctx, {
        // pie是圓餅圖，doughnut是環狀圖
        type: 'pie',
        data: data,
      })
    }
  }
}
