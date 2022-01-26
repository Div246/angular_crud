import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'User Data';
  displayedColumns: string[] = ['userName', 'address', 'contactNo', 'gender0', 'dob', 'qualification', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,
    private api: ApiService) {

  }
  ngOnInit(): void {
    this.getAllData()
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
    });
  }

  getAllData() {
    this.api.getData()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          console.log(error);

        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  editData(row: any) {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: row
    })
    
  }

  deleteUserData(id: number) {
    this.api.deleteData(id)
      .subscribe({
        next: (res) => {
          alert('Data deleted successfully')
        },
        error: (err) => {
          alert('Error while deleting the data')
        }
      })
  }
}

