import { Component, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DateService } from '../../../@services/date-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditService } from '../../../@services/edit-service';
import { TestDataService } from '../../../@services/test-data-service';

@Component({
  selector: 'app-back-list',
  standalone: true,
  imports: [ RouterLink, MatSlideToggleModule,
    MatSelectModule, MatFormFieldModule, MatTableModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule, MatPaginatorModule,
    MatTableModule, MatCheckboxModule, MatIconModule, CommonModule,FormsModule],
  templateUrl: './back-list.component.html',
  styleUrl: './back-list.component.scss'
})
export class BackListComponent {
  displayedColumns: string[] = ['check', 'id', 'name', 'status', 'start', 'end', 'result'];

  // 跟下方資料串聯
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dateService: DateService,private router: Router, private editService: EditService
  ,private testDataService: TestDataService) { }


  // 問卷假資料
  testSurvey: any = {};



  // 進入編輯
  onSelectSurvey(survey: any) {
    this.editService.setSurvey(survey);          // 將選中的問卷資料存入服務
  }




  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    // 以下是資料排列的code
    // 前面要寫 "this.dataSource.data =" 是因為要把原本的資料取代成已排序的樣子
    // 數字、英文接可以排序
    // 當希望順序相反，可以將1和-1對調，或者<和>對調
    // "function (a,b)" 跟 "(a,b) =>" 是一樣的，只是寫法不同，但兩個不能共用
    this.dataSource.data = this.dataSource.data.sort(function (a, b) {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });

  }




  // 以下是搜尋的code
  inputName!: string;
  inputStartDate!: string;
  inputEndDate!: string;
  minDate!: string;
  maxDate!: string;
  eMaxDate!: string;


  // 即時搜尋
  changeInput(event: Event) {

    // 試試看ngmodel有沒有成功收到資料
    console.log(this.inputName);
    console.log(this.inputStartDate);
    console.log(this.inputEndDate);

    let tidyData: PeriodicElement[] = [];
    for (let array of ELEMENT_DATA) {
      // 判斷array中的name欄位是否有index of 中帶入的判斷值(使用者輸入的內容)
      // 如果不符合就永遠會是-1 符合就會將該資料的位置顯示
      if (array.name.indexOf(this.inputName) != -1) {
        tidyData.push(array);
      }
      if (array.start.indexOf(this.inputStartDate) != -1) {
        tidyData.push(array);
      }
      if (array.end.indexOf(this.inputEndDate) != -1) {
        tidyData.push(array);
      }
    }
    // 修改資料畫面
    this.dataSource.data = tidyData;
  }





  // 下面是搜尋框輸入的條件、接假資料
  ngOnInit(): void {
    // 設定選取日期最小值為當天
    this.minDate = this.dateService.changeDateFormat(new Date(), '/');
    // 設定選取日期最大值為當天+30天
    this.maxDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(), 180));

    // 接service假資料
    this.testSurvey = this.testDataService.getTestSurvey();
    console.log(this.testSurvey);
  }




  // 隨開始日期變動，改變結束日期
  changeSDate() {
    this.eMaxDate = this.dateService.changeDateFormat(this.dateService.addDate(new Date(this.inputStartDate), 180));
  }

  searchBnt() {
    console.log(this.inputName);
    console.log(this.inputStartDate);
    console.log(this.inputEndDate);
  }





  // 刪除資料
  deleteSelected() {
    this.dataSource.data = this.dataSource.data.filter(element => !element.selected);
  }

}

export interface PeriodicElement {
  check: string;
  id: number;
  name: string;
  status: string;
  start: string;
  end: string;
  result: string;
  selected?:boolean;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { check: 'checked', id: 10, name: '明星調查', status: '未開始', start: '2024-11-01', end: '2024-11-20', result: '前往' },
  { check: 'checked', id: 2, name: '最喜歡的卡通', status: '進行中', start: '2024-12-01', end: '2024-12-30', result: '前往' },
  { check: 'checked', id: 7, name: '喜歡的韓劇', status: '已結束', start: '2024-10-01', end: '2025-10-01', result: '前往' },
  { check: 'checked', id: 4, name: '喜歡的電影', status: '未發布', start: '2024-09-01', end: '2025-09-01', result: '前往' },
  { check: 'checked', id: 5, name: '最喜歡的台灣景點', status: '未發布', start: '2024-08-30', end: '2025-08-30', result: '前往' },
  { check: 'checked', id: 6, name: '你家附近調查', status: '已結束', start: '2024-07-24', end: '2025-07-24', result: '前往' },
  { check: 'checked', id: 3, name: '縣市調查', status: '已結束', start: '2024-12-01', end: '2025-12-01', result: '前往' },
  { check: 'checked', id: 8, name: '候選人民調', status: '未開始', start: '2025-11-01', end: '2025-11-01', result: '前往' },
  { check: 'checked', id: 9, name: '壞習慣調查', status: '未開始', start: '2025-03-01', end: '2025-06-01', result: '前往' },
  { check: 'checked', id: 1, name: '你的寵物調查', status: '已結束', start: '2024-07-01', end: '2024-07-50', result: '前往' },
];

