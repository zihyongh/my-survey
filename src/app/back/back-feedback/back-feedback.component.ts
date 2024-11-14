import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-feedback',
  standalone: true,
  imports: [MatSlideToggleModule,MatSelectModule, MatFormFieldModule, MatTableModule, MatInputModule,
  MatDatepickerModule, MatNativeDateModule, MatPaginatorModule,MatTableModule, FormsModule,
  CommonModule, RouterLink],
  templateUrl: './back-feedback.component.html',
  styleUrl: './back-feedback.component.scss'
})

export class BackFeedbackComponent {

  displayedColumns: string[] = ['id', 'name', 'time', 'feedback'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router) { }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    // 以下是資料排列的code
    // 前面要寫 "this.dataSource.data =" 是因為要把原本的資料取代成已排序的樣子
    // 數字、英文接可以排序
    // 當希望順序相反，可以將1和-1對調，或者<和>對調
    // "function (a,b)" 跟 "(a,b) =>" 是一樣的，只是寫法不同，但兩個不能共用
    this.dataSource.data = this.dataSource.data.sort(function (a, b) {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    });

  }

}

export interface PeriodicElement {
  id: number;
  name: string;
  time: string;
  feedback: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id:1 , name: '阿貓' , time: '2024-11-13 20:55' , feedback: '前往'},
  { id:2 , name: '阿狗' , time: '2024-11-20 18:55' , feedback: '前往'},
  { id:3 , name: '阿豬' , time: '2024-11-20 18:55' , feedback: '前往'}
];
